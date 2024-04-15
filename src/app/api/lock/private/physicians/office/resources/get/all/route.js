import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Resource from '@/models/resource';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');

	try {
		const rscs = await Resource.find({ officeObjId: ofcid }).sort({ name: 1 });
		if (rscs) {
			return NextResponse.json({ rscs: rscs, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Resources Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
