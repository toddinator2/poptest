import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Location from '@/models/officelocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcId = searchParams.get('ofcid');

	try {
		const loc = await Location.findOne({ officeObjId: ofcId });
		if (loc) {
			return NextResponse.json({ loc: loc, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Office Location not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
