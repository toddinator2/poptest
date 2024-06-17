import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const subId = searchParams.get('subid');

	try {
		const medhist = await Subsumedhist.findOne({ subObjId: subId });
		if (medhist) {
			return NextResponse.json({ medhist: medhist, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Medical History Progress Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
