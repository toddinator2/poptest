import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Preregpat from '@/models/preregpat';

export const GET = async (request) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const { searchParams } = new URL(request.url);
	const vcode = searchParams.get('verifycode');
	const token = searchParams.get('token');

	if (token === authToken) {
		try {
			const pt = await Preregpat.findOne({ verifycode: vcode });
			if (pt) {
				return NextResponse.json({ uname: pt.username, status: 200 });
			} else {
				return NextResponse.json({ msg: 'Registration Error: Please try again', status: 400 });
			}
		} catch (err) {
			return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
		}
	} else {
		return NextResponse.json({ msg: 'Invalid Data: Please try again', status: 501 });
	}
};
