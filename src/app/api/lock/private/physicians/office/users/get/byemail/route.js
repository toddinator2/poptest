import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const email = searchParams.get('email');
	let lwrEmail = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	try {
		const user = await Officeuser.findOne({ email: lwrEmail });
		if (user) {
			return NextResponse.json({ user: user, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
