import { NextResponse } from 'next/server';
import { CreateUsername } from '@/components/global/functions/PageFunctions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';
import Officesetup from '@/models/officesetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		fname,
		lname,
		email,
		password,
		phone,
		photo,
		permission,
		role,
		supervisor,
		paid,
		title,
		license,
		npi,
		specialty,
		resetcreds,
		resetcode,
		emailconfirmed,
		officeid,
		locationObjId,
		officeObjId,
	} = body;
	let uname = '';

	//update office setup just in case not already done
	const setup = await Officesetup.findOne({ officeObjId: officeObjId });
	if (setup) {
		if (!setup.users) {
			await Officesetup.findByIdAndUpdate(setup._id, { users: true }, { new: true });
		}
		if (setup.basic && setup.locations && setup.calcols && !setup.complete) {
			await Officesetup.findByIdAndUpdate(setup._id, { complete: true }, { new: true });
		}
	} else {
		await new Officesetup({ users: true, officeObjId: officeObjId }).save();
	}

	//Create new username
	for (let i = 0; i <= 1000000; i++) {
		const newUname = CreateUsername(fname, lname);
		const nameExists = await Officeuser.findOne({ username: newUname });
		if (!nameExists || nameExists === null) {
			uname = newUname.toLowerCase();
			break;
		}
	}

	//Hash password for storage
	const hashPword = await bcrypt.hash(password, 10);

	try {
		await new Officeuser({
			fname,
			lname,
			email,
			username: uname,
			password: hashPword,
			phone,
			photo,
			permission,
			role,
			supervisor,
			paid,
			title,
			license,
			npi,
			specialty,
			resetcreds,
			resetcode,
			emailconfirmed,
			officeid,
			locationObjId,
			officeObjId,
		}).save();

		return NextResponse.json({ msg: 'User added successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
