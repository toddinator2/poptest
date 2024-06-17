import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnuser from '@/models/spnuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('id');

	try {
		const user = await Spnuser.findById(_id).select('-username -password');
		if (user) {
			return NextResponse.json({ user: user, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
