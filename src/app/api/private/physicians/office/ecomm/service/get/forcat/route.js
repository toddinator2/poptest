import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const catid = searchParams.get('catid');

	try {
		const svcs = await Service.find({ catObjId: catid });
		if (svcs) {
			return NextResponse.json({ svcs: svcs, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Services Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
