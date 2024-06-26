import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcresource from '@/models/ofcresource';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');

	try {
		const rscs = await Ofcresource.find({ ofclocObjId: locid }).sort({ order: 1 });
		if (rscs) {
			return NextResponse.json({ rscs: rscs, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Resources Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
