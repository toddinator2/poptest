import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const svc = await Service.findById(id);
		if (svc) {
			return NextResponse.json({ svc: svc, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Service Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
