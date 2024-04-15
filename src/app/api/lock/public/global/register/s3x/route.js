import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import S3xuser from '@/models/s3xuser';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { fname, lname, email, phone, username, password, resetcode, verifycode, token } = body;
	let lwrEmail = '';
	let lwrUname = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}
	if (username) {
		lwrUname = username.toLowerCase();
	}

	if (token === authToken) {
		try {
			//Check if email already exists
			const emailExists = await S3xuser.findOne({ email: lwrEmail });
			if (emailExists) {
				return NextResponse.json({ status: 400 });
			}

			//Check if username already exists
			const userExists = await S3xuser.findOne({ username: username.toLowerCase() });
			if (userExists) {
				return NextResponse.json({ status: 401 });
			}

			const hashPword = await bcrypt.hash(password, 10);

			await new S3xuser({
				fname: fname,
				lname: lname,
				email: email,
				phone: phone,
				username: lwrUname,
				password: hashPword,
				resetcode,
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
