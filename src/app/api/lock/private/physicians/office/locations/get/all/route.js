import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officelocation from '@/models/officelocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');

	try {
		const locs = await Officelocation.find({ officeObjId: ofcid, deleteme: false }).sort({ name: 1 });
		if (locs.length !== 0) {
			return NextResponse.json({ locs: locs, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Locations Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
