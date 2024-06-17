import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Wmnhrt from '@/models/wmnhrt';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { nrt, wct, may, int, cur, learnmore, subObjId } = body;

	try {
		const newRec = await new Wmnhrt({
			nrt,
			wct,
			may,
			int,
			cur,
			learnmore,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { wmnhormone: true }, { new: true });
			return NextResponse.json({ msg: 'Hormone Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Hormone Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
