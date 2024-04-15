import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const DELETE = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const svcid = searchParams.get('svcid');

	try {
		const svc = await Service.findByIdAndDelete(svcid);
		if (svc) {
			return NextResponse.json({ msg: 'Service deleted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Service not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
