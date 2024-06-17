import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');

	try {
		const sub = await Subscriber.findOne({ username: uname }).select('-username -password');
		if (sub) {
			return NextResponse.json({ subscriber: sub, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Subscriber Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
