import { NextResponse } from 'next/server';
import { CreateS3xId, CreateSponsorId, RandomStringMake } from '@/components/global/functions/Functions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Preregpat from '@/models/preregpat';
import Patient from '@/models/patient';
import Preregspn from '@/models/preregspn';
import Sponsor from '@/models/sponsor';
import Sponsoruser from '@/models/sponsoruser';
import Preregphys from '@/models/preregphys';
import Officeuser from '@/models/officeuser';
import S3xuser from '@/models/s3xuser';

const createSponsor = async (props) => {
	let newSpn;
	let newSpnUser;
	let spnId = '';
	//Create a Sponsor ID and check if already exists
	for (let i = 0; i <= 1000000; i++) {
		const newSpnId = CreateSponsorId(9);
		const idExists = await Sponsor.findOne({ sponsorid: newSpnId.toLowerCase() });
		if (!idExists || idExists === null) {
			spnId = newSpnId.toLowerCase();
			break;
		}
	}

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(props.pword, 10);

	newSpn = await new Sponsor({
		type: 'Private',
		sponsorid: spnId,
		company: props.fname + ' ' + props.lname,
		fname: props.fname,
		lname: props.lname,
		email: props.email,
		phone: props.phone,
	});
	await newSpn.save();
	const newSpnId = newSpn._id;

	newSpnUser = new Sponsoruser({
		fname: props.fname,
		lname: props.lname,
		email: props.email,
		username: props.uname,
		password: hashedPassword,
		phone: props.phone,
		resetcreds: true,
		emailconfirmed: true,
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
	const { type, verifycode, token } = body;

	if (token === authToken) {
		try {
			if (type === 'patient') {
				//move from pre-registration to patients
				const pt = await Preregpat.findOne({ verifycode: verifycode });
				if (pt) {
					let spnId = '';
					let s3xId = '';
					let tmpArr = [];

					//create the personal sponsor account
					const props = {
						fname: pt.fname,
						lname: pt.lname,
						email: pt.email,
						phone: pt.phone,
						uname: pt.username,
						pword: pt.password,
					};
					const newSpn = await createSponsor(props);
					spnId = newSpn;
					tmpArr.push(spnId);

					//Hash password for storage
					const hashedPassword = await bcrypt.hash(pt.password, 10);

					//Create a Supernova3x ID and check if already exists
					for (let i = 0; i <= 1000000; i++) {
						const newS3xId = CreateS3xId(9);
						const idExists = await Patient.findOne({ s3xid: newS3xId.toLowerCase() });
						if (!idExists || idExists === null) {
							s3xId = newS3xId.toLowerCase();
							break;
						}
					}

					//Create a reset creds code
					const resetcode = RandomStringMake(32);

					const newPt = new Patient({
						fname: pt.fname,
						lname: pt.lname,
						email: pt.email,
						username: pt.username,
						password: hashedPassword,
						mphone: pt.phone,
						s3xid: s3xId,
						resetcreds: true,
						resetcode: resetcode,
						emailconfirmed: true,
						sponsorObjId: tmpArr,
					});
					const svdPt = await newPt.save();
					const newPtId = svdPt._id;

					if (newPtId) {
						await Preregpat.findOneAndDelete({ verifycode: verifycode });
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 400 });
					}
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 'sponsor') {
				//move from pre-registration to sponsors and sponsorusers
				const preSpn = await Preregspn.findOne({ verifycode: verifycode });
				if (preSpn) {
					//sponsors first
					let newSpn;
					let newSpnUser;
					let spnId = '';

					//Create a Sponsor ID and check if already exists
					for (let i = 0; i <= 1000000; i++) {
						const newSpnId = CreateSponsorId(9);
						const idExists = await Sponsor.findOne({ sponsorid: newSpnId.toLowerCase() });
						if (!idExists || idExists === null) {
							spnId = newSpnId.toLowerCase();
							break;
						}
					}

					//Hash password for storage
					const hashedPassword = await bcrypt.hash(preSpn.password, 10);

					//Create a reset creds code
					const resetcode = RandomStringMake(32);

					newSpn = new Sponsor({
						type: preSpn.type.toLowerCase(),
						sponsorid: spnId,
						company: preSpn.company,
						fname: preSpn.fname,
						lname: preSpn.lname,
						email: preSpn.email.toLowerCase(),
						phone: preSpn.phone,
						phoneext: preSpn.phoneext,
						active: true,
						website: preSpn.website,
					});
					const svdSpn = await newSpn.save();
					const newSpnId = svdSpn._id;

					if (newSpnId) {
						//save to sponsorusers
						newSpnUser = new Sponsoruser({
							fname: preSpn.fname,
							lname: preSpn.lname,
							email: preSpn.email.toLowerCase(),
							username: preSpn.username.toLowerCase(),
							password: hashedPassword,
							phone: preSpn.phone,
							phoneext: preSpn.phoneext,
							permission: 'sponsor',
							role: 'sponsor',
							resetcreds: true,
							resetcode: resetcode,
							verifycode: '',
							emailconfirmed: true,
							sponsorid: spnId,
							sponsorObjId: newSpnId,
						});
						const svdUser = await newSpnUser.save();
						const newUserId = svdUser._id;

						if (newUserId) {
							await Preregspn.findOneAndDelete({ verifycode: verifycode });
							return NextResponse.json({ status: 200 });
						} else {
							return NextResponse.json({ status: 400 });
						}
					} else {
						return NextResponse.json({ status: 400 });
					}
				} else {
					return NextResponse.json({ status: 500 });
				}
			}
			if (type === 'physicianprereg') {
				const physician = await Preregphys.findOne({ verifycode: verifycode });
				if (physician) {
					await Preregphys.findOneAndUpdate({ verifycode: verifycode }, { emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				}
			}
			if (type === 'physician') {
				const user = await Officeuser.findOne({ verifycode: verifycode });
				if (user) {
					await Officeuser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 's3x') {
				const user = await S3xuser.findOne({ verifycode: verifycode });
				if (user) {
					await S3xuser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
