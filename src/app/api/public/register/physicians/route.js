import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Ofcprereg from '@/models/ofcprereg';
import Ofcuser from '@/models/ofcuser';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { fname, lname, email, phone, username, password, license, licensestate, npi, specialty, isphysician, verifycode, token } = body;
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

	//Check if email already exists in preReg or officeusers
	const preUserExists = await Ofcprereg.findOne({ email: lwrEmail });
	if (preUserExists) {
		return NextResponse.json({ status: 400 });
	}
	const userExists = await Ofcuser.findOne({ email: lwrEmail });
	if (userExists) {
		return NextResponse.json({ status: 400 });
	}

	//Check if username already exists in preReg or officeusers
	const preUsernameExists = await Ofcprereg.findOne({ username: lwrUname });
	if (preUsernameExists) {
		return NextResponse.json({ status: 401 });
	}
	const usernameExists = await Ofcuser.findOne({ username: lwrUname });
	if (usernameExists) {
		return NextResponse.json({ status: 401 });
	}

	const phyObj = new Ofcprereg({
		fname,
		lname,
		email: lwrEmail,
		phone,
		username: lwrUname,
		password: hashedPassword,
		license,
		licensestate,
		npi,
		specialty,
		isphysician,
		verifycode,
	});

	if (token === authToken) {
		try {
			const svdPhy = await phyObj.save();
			if (svdPhy) {
				return NextResponse.json({ status: 200 });
			} else {
				return NextResponse.json({ status: 500 });
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
