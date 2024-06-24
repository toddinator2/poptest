import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Message from '@/models/message';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const subId = searchParams.get('subid');

	try {
		const msgs = await Message.find({ subObjId: subId, subcanview: true }).sort({ unixtimesent: 1 });
		if (!msgs || msgs === undefined) {
			return NextResponse.json({ status: 400 });
		} else {
			return NextResponse.json({ msgs: msgs, status: 200 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
