import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Mentrt from '@/models/mentrt';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { nrt, wct, may, int, cur, learnmore, subObjId } = body;

	try {
		const newRec = await new Mentrt({
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
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { mentestosterone: true }, { new: true });
			return NextResponse.json({ msg: 'Testosterone Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Testosterone Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
