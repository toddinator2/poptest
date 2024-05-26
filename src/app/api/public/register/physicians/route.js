import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Preregphys from '@/models/preregphys';
import Officeuser from '@/models/officeuser';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { fname, lname, email, phone, username, password, license, state, npi, specialty, isphysician, verifycode, token } = body;
	let lwrEmail = '';
	let lwrUname = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	if (username) {
		lwrUname = username.toLowerCase();
	}

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(password, 10);

	if (token === authToken) {
		try {
			//Check if email already exists in preReg or officeusers
			const preUserExists = await Preregphys.findOne({ email: lwrEmail });
			if (preUserExists) {
				return NextResponse.json(400);
			}
			const userExists = await Officeuser.findOne({ email: lwrEmail });
			if (userExists) {
				return NextResponse.json({ status: 400 });
			}

			//Check if username already exists in preReg or officeusers
			const preUsernameExists = await Preregphys.findOne({ username: lwrUname });
			if (preUsernameExists) {
				return NextResponse.json({ status: 401 });
			}
			const usernameExists = await Officeuser.findOne({ username: lwrUname });
			if (usernameExists) {
				return NextResponse.json({ status: 401 });
			}

			await new Preregphys({
				fname,
				lname,
				email: lwrEmail,
				phone,
				username: lwrUname,
				password: hashedPassword,
				license,
				state,
				npi,
				specialty,
				isphysician,
				verifycode,
			}).save();
			return NextResponse.json({ status: 200 });
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
