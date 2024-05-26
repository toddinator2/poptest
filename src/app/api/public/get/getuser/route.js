import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsoruser from '@/models/sponsoruser';
import Officeuser from '@/models/officeuser';
import S3xuser from '@/models/s3xuser';

export async function GET(request) {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const uname = searchParams.get('username');
	const token = searchParams.get('token');
	let lwrUname = '';

	if (uname) {
		lwrUname = uname.toLowerCase();
	}

	if (token === authToken) {
		try {
			if (type === 'patient') {
				const user = await Patient.findOne({ username: lwrUname }).select('-username -password');
				if (!user || user === null) {
					return NextResponse.json({ status: 400 });
				} else {
					return NextResponse.json({ user: user, status: 200 });
				}
			}
			if (type === 'sponsor') {
				const user = await Sponsoruser.findOne({ username: lwrUname });
				if (!user || user === null) {
					return NextResponse.json({ status: 400 });
				} else {
					return NextResponse.json({ user: user, status: 200 });
				}
			}
			if (type === 'physician') {
				const user = await Officeuser.findOne({ username: lwrUname });
				if (!user || user === null) {
					return NextResponse.json({ status: 400 });
				} else {
					return NextResponse.json({ user: user, status: 200 });
				}
			}
			if (type === 's3x') {
				const user = await S3xuser.findOne({ username: lwrUname });
				if (!user || user === null) {
					return NextResponse.json({ status: 400 });
				} else {
					return NextResponse.json({ user: user, status: 200 });
				}
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
}
