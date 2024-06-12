import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnlocation from '@/models/spnlocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('locid');

	try {
		const loc = await Spnlocation.findById(_id);
		if (loc) {
			return NextResponse.json({ location: loc, status: 200 });
		} else {
			return NextResponse.json({ status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
