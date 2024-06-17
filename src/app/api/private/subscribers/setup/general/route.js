import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';
import Subsumedhist from '@/models/subsumedhist';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, hearabout, referredby, marital, pcpname, pcpphone, employer, employerphone } = body;

	try {
		await Subscriber.findByIdAndUpdate(_id, { hearabout, referredby, marital, pcpname, pcpphone, employer, employerphone }, { new: true });
		await Subsumedhist.findOneAndUpdate({ subObjId: _id }, { general: true }, { new: true });
		return NextResponse.json({ msg: 'General Information updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
