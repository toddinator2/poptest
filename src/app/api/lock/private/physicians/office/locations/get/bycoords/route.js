import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officelocation from '@/models/officelocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const lat = searchParams.get('lat');
	const lng = searchParams.get('lng');
	const ofcid = searchParams.get('ofcid');

	try {
		const loc = await Officelocation.findOne({ latitude: lat, longitude: lng, officeObjId: ofcid });
		if (loc) {
			return NextResponse.json({ loc: loc, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Location Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
