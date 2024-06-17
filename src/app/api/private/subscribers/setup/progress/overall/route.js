import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsetup from '@/models/subsetup';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const subId = searchParams.get('subid');

	try {
		const setup = await Subsetup.findOne({ subObjId: subId });
		if (setup) {
			return NextResponse.json({ setup: setup, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Setup Progress Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
