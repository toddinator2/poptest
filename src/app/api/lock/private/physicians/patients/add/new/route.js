import { NextResponse } from 'next/server';
import { CreateS3xId, CreateSponsorId, CreateUsername } from '@/components/global/functions/PageFunctions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsor from '@/models/sponsor';
import Sponsoruser from '@/models/sponsoruser';
import Office from '@/models/office';

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

	await new Sponsoruser({
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
	}).save();

	return newSpnId;
};

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { fname, lname, dob, email, mphone, password, resetcreds, resetcode, verifycode, weightloss, offices, ofcObjId } = body;
	let lwrEmail = '';
	let uname = '';
	let s3xid = '';
	let spnId = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	//Create new username
	for (let i = 0; i <= 1000000; i++) {
		const newUname = CreateUsername(fname, lname);
		const nameExists = await Patient.findOne({ username: newUname });
		if (!nameExists || nameExists === null) {
			uname = newUname.toLowerCase();
			break;
		}
	}

	//Create a Supernova3x ID and check if already exists
	for (let i = 0; i <= 1000000; i++) {
		const newS3xId = CreateS3xId(9);
		const idExists = await Patient.findOne({ s3xid: newS3xId.toLowerCase() });
		if (!idExists || idExists === null) {
			s3xid = newS3xId.toLowerCase();
			break;
		}
	}

	//Create new Sponsor
	const newSpn = await createSponsor(body, uname);
	spnId = newSpn;

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newPt = await new Patient({
			fname,
			lname,
			dob,
			email: lwrEmail,
			username: uname,
			password: hashedPassword,
			mphone,
			s3xid,
			resetcreds,
			resetcode,
			verifycode,
			weightloss,
			offices,
			sponsorObjId: spnId,
		}).save();
		const newPtId = newPt._id;

		//Update office patient list with new patient
		const office = await Office.findById(ofcObjId);
		let ptArr = office.patients;
		ptArr.push(newPtId);
		await Office.findByIdAndUpdate(ofcObjId, { patients: ptArr }, { new: true });

		return NextResponse.json({ msg: 'Patient Registration Successful', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
