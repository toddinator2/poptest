import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officesetup from '@/models/officesetup';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('ofcid');

	try {
		const setup = await Officesetup.findOne({ officeObjId: id });
		if (setup) {
			return NextResponse.json({ setup: setup, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Setup Progress Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
