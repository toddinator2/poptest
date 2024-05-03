import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsoruser from '@/models/sponsoruser';
import Officeuser from '@/models/officeuser';
import S3xuser from '@/models/s3xuser';

export const GET = async (request) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const { searchParams } = new URL(request.url);
	const type = searchParams.get('type');
	const email = searchParams.get('email');
	const token = searchParams.get('token');
	let lwrEmail = '';
	let uNames = [];

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	if (token === authToken) {
		try {
			if (type === 'patient') {
				const users = await Patient.find({ email: lwrEmail });
				users.forEach((user) => {
					uNames.push(user.username);
				});
				return NextResponse.json({ unames: uNames });
			} else if (type === 'sponsor') {
				const users = await Sponsoruser.find({ email: lwrEmail });
				users.forEach((user) => {
					uNames.push(user.username);
				});
				return NextResponse.json({ unames: uNames });
			} else if (type === 'physician') {
				const users = await Officeuser.find({ email: lwrEmail });
				users.forEach((user) => {
					uNames.push(user.username);
				});
				return NextResponse.json({ unames: uNames });
			} else if (type === 's3x') {
				const users = await S3xuser.find({ email: lwrEmail });
				users.forEach((user) => {
					uNames.push(user.username);
				});
				return NextResponse.json({ unames: uNames });
			}
		} catch (err) {
			return new NextResponse(err, { status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
