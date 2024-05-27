import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officelocation from '@/models/officelocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');

	try {
		const loc = await Officelocation.findById(locid);
		if (loc) {
			return NextResponse.json({ loc: loc, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Location Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
