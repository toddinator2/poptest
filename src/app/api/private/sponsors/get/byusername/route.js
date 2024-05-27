import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Sponsoruser from '@/models/sponsoruser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');

	try {
		const spn = await Sponsoruser.findOne({ username: uname }).select('-username -password');
		if (spn) {
			return NextResponse.json({ sponsor: spn, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
