import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';
import Subsetup from '@/models/subsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { subid } = body;

	try {
		await Subscriber.findByIdAndUpdate(subid, { setupdone: true }, { new: true });
		await Subsetup.findOneAndDelete({ subObjId: subid });
		return NextResponse.json({ msg: 'Account Setup completed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
