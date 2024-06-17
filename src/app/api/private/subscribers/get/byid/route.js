import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const sub = await Subscriber.findById(id).select('-username -password');
		if (sub) {
			return NextResponse.json({ user: sub, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Patient Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
