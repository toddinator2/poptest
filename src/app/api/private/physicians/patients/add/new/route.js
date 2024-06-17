import { NextResponse } from 'next/server';
import { CreateS3xId, CreateSponsorId, CreateUsername } from '@/components/global/functions/Functions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';
import Office from '@/models/office';

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
		const nameExists = await Subscriber.findOne({ username: newUname });
		if (!nameExists || nameExists === null) {
			uname = newUname.toLowerCase();
			break;
		}
	}

	//Create a Supernova3x ID and check if already exists
	for (let i = 0; i <= 1000000; i++) {
		const newS3xId = CreateS3xId(9);
		const idExists = await Subscriber.findOne({ subs3xid: newS3xId.toLowerCase() });
		if (!idExists || idExists === null) {
			s3xid = newS3xId.toLowerCase();
			break;
		}
	}

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const newPt = await new Subscriber({
			fname,
			lname,
			dob,
			email: lwrEmail,
			username: uname,
			password: hashedPassword,
			mphone,
			subs3xid: s3xid,
			resetcreds,
			resetcode,
			verifycode,
			weightloss,
			offices,
		}).save();
		const newPtId = newPt._id;

		//Update office patient list with new patient
		const office = await Office.findById(ofcObjId);
		let ptArr = office.patients;
		ptArr.push(newPtId);
		await Office.findByIdAndUpdate(ofcObjId, { patients: ptArr }, { new: true });

		return NextResponse.json({ msg: 'Subscriber Registration Successful', uname: uname, ofcname: office.name, status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
