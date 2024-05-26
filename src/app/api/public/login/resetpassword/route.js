import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsoruser from '@/models/sponsoruser';
import Officeuser from '@/models/officeuser';
import S3xuser from '@/models/s3xuser';

export const PUT = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { type, resetcode, password, token } = body;

	//Hash password
	const hashedPassword = await bcrypt.hash(password, 10);

	if (token === authToken) {
		try {
			if (type === 'patient') {
				const user = await Patient.findOne({ resetcode: resetcode });
				if (user) {
					await Patient.findOneAndUpdate({ resetcode: resetcode }, { resetcode: '', password: hashedPassword }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			} else if (type === 'sponsor') {
				const user = await Sponsoruser.findOne({ resetcode: resetcode });
				if (user) {
					await Sponsoruser.findOneAndUpdate({ resetcode: resetcode }, { resetcode: '', password: hashedPassword }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			} else if (type === 'physician') {
				const user = await Officeuser.findOne({ resetcode: resetcode });
				if (user) {
					await Officeuser.findOneAndUpdate({ resetcode: resetcode }, { resetcode: '', password: hashedPassword }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			} else if (type === 's3x') {
				const user = await S3xuser.findOne({ resetcode: resetcode });
				if (user) {
					await S3xuser.findOneAndUpdate({ resetcode: resetcode }, { resetcode: '', password: hashedPassword }, { new: true });
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
