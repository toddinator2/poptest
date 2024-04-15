import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');

	try {
		const users = await Officeuser.find({ officeObjId: ofcid }).sort({ fname: 1 });
		if (users) {
			return NextResponse.json({ users: users, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Users Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
