import { NextResponse } from 'next/server';
import { CreateS3xId, CreateSponsorId, CreateUsername } from '@/components/global/functions/PageFunctions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Office from '@/models/office';
import Sponsor from '@/models/sponsor';
import Sponsoruser from '@/models/sponsoruser';
import Contactdoc from '@/models/contactdoc';
import Contactemp from '@/models/contactemp';

const createSponsor = async (body, uname) => {
	let newSpn;
	let newSpnUser;
	let chkEmail = body.email;
	let lwrEmail = '';

	if (chkEmail) {
		lwrEmail = chkEmail.toLowerCase();
	}

	//Create a Sponsor ID and check if already exists
	let spnId = '';
	for (let i = 0; i <= 1000000; i++) {
		const newSpnId = CreateSponsorId(9);
		const idExists = await Sponsor.findOne({ sponsorid: newSpnId.toLowerCase() });
		if (!idExists || idExists === null) {
			spnId = newSpnId.toLowerCase();
			break;
		}
	}

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(body.password, 10);

	newSpn = new Sponsor({
		type: 'Private',
		sponsorid: spnId,
		companyname: body.fname + ' ' + body.lname,
		fname: body.fname,
		lname: body.lname,
		email: lwrEmail,
		phone: body.mphone,
	});
	await newSpn.save();
	const newSpnId = newSpn._id;

	newSpnUser = new Sponsoruser({
		fname: body.fname,
		lname: body.lname,
		email: lwrEmail,
		username: uname,
		password: hashedPassword,
		phone: body.mphone,
		resetcreds: body.resetcreds,
		verifycode: body.verifycode,
		sponsorid: spnId,
		sponsorObjId: newSpnId,
	});
	await newSpnUser.save();

	return newSpnId;
};

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const {
		fname,
		lname,
		dob,
		email,
		username,
		password,
		mphone,
		pcpname,
		pcpphone,
		employer,
		employerphone,
		resetcreds,
		resetcode,
		verifycode,
		docComp,
		docName,
		docPhone,
		docCity,
		docState,
		docZip,
		empComp,
		empName,
		empEmail,
		empPhone,
		empCity,
		empState,
		empZip,
		weightloss,
		offices,
		ofcObjId,
		token,
	} = body;
	let uname = '';
	let newPtId = '';
	let spnId = '';
	let s3xId = '';
	let lwrUname = '';
	let lwrEmail = '';

	if (username) {
		lwrUname = username.toLowerCase();
	}
	if (email) {
		lwrEmail = email.toLowerCase();
	}

	if (token === authToken) {
		//Check if username needs to be created (new patient from office or sponsor upload)
		if (!username) {
			for (let i = 0; i <= 1000000; i++) {
				const newUname = CreateUsername(fname, lname);
				const nameExists = await Patient.findOne({ username: newUname });
				if (!nameExists || nameExists === null) {
					uname = newUname.toLowerCase();
					break;
				}
			}
		} else {
			//Check if username is already taken
			const userExists = await Patient.findOne({ username: lwrUname });
			if (userExists) {
				return NextResponse.json({ status: 400 });
			} else {
				uname = lwrUname;
			}
		}

		//Check if SponsorId already exists and get it or create a sponsor
		const spn = await Sponsor.findOne({ email: lwrEmail });
		if (spn) {
			spnId = spn._id;
		} else {
			const newSpn = await createSponsor(body, lwrUname);
			spnId = newSpn;
		}

		//Create a Supernova3x ID and check if already exists
		for (let i = 0; i <= 1000000; i++) {
			const newS3xId = CreateS3xId(9);
			const idExists = await Patient.findOne({ s3xid: newS3xId.toLowerCase() });
			if (!idExists || idExists === null) {
				s3xId = newS3xId.toLowerCase();
				break;
			}
		}

		//Hash password for storage
		const hashedPassword = await bcrypt.hash(password, 10);

		const newPt = new Patient({
			fname: fname,
			lname: lname,
			dob: dob,
			email: email,
			username: uname,
			password: hashedPassword,
			mphone: mphone,
			pcpname: pcpname,
			pcpphone: pcpphone,
			employer: employer,
			employerphone: employerphone,
			s3xid: s3xId,
			resetcreds: resetcreds,
			resetcode: resetcode,
			verifycode: verifycode,
			weightloss: weightloss,
			offices: offices,
			sponsorObjId: spnId,
		});

		try {
			const pt = await newPt.save();
			newPtId = pt._id;

			//Add doctor to contact if provided
			if (docPhone) {
				await new Contactdoc({
					companyname: docComp,
					name: docName,
					phone: docPhone,
					city: docCity,
					state: docState,
					zip: docZip,
					patientObjId: newPtId,
				}).save();
			}
			//Add employer to contact if provided
			if (empPhone) {
				await new Contactemp({
					companyname: empComp,
					name: empName,
					email: empEmail,
					phone: empPhone,
					city: empCity,
					state: empState,
					zip: empZip,
					patientObjId: newPtId,
				}).save();
			}

			if (!username && ofcObjId) {
				//Add patient to office patients array
				const office = await Office.findById(ofcObjId);
				let arrPts = office.patients;
				arrPts.push(newPtId);
				await Office.findByIdAndUpdate(ofcObjId, { patients: arrPts }, { new: true });
			}

			return NextResponse.json({ status: 200 });
		} catch (err) {
			await Patient.findByIdAndDelete(newPtId);
			await Sponsor.findByIdAndDelete(spnId);
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
