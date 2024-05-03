import { NextResponse } from 'next/server';
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
	const { type, email, username, resetcode, token } = body;
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
			if (type === 'patient') {
				const user = await Patient.findOne({ email: lwrEmail, username: lwrUname });
				if (user) {
					await Patient.findOneAndUpdate({ email: lwrEmail, username: lwrUname }, { resetcode: resetcode }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			} else if (type === 'sponsor') {
				const user = await Sponsoruser.findOne({ email: lwrEmail, username: lwrUname });
				if (user) {
					await Sponsoruser.findOneAndUpdate({ email: lwrEmail, username: lwrUname }, { resetcode: resetcode }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			} else if (type === 'physician') {
				const user = await Officeuser.findOne({ email: lwrEmail, username: lwrUname });
				if (user) {
					await Officeuser.findOneAndUpdate({ email: lwrEmail, username: lwrUname }, { resetcode: resetcode }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			} else if (type === 's3x') {
				const user = await S3xuser.findOne({ email: lwrEmail, username: lwrUname });
				if (user) {
					await S3xuser.findOneAndUpdate({ email: lwrEmail, username: lwrUname }, { resetcode: resetcode }, { new: true });
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
