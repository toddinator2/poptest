import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const name = searchParams.get('name');
	const catid = searchParams.get('catid');

	try {
		const svc = await Service.findOne({ name: name, catObjId: catid });
		if (svc) {
			return NextResponse.json({ svc: svc, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Service Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
