import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Massage from '@/models/massage';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { not, nvr, iwc, may, ned, cur, learnmore, subObjId } = body;

	try {
		const newRec = await new Massage({
			not,
			nvr,
			iwc,
			may,
			ned,
			cur,
			learnmore,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { massage: true }, { new: true });
			return NextResponse.json({ msg: 'Massage Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Massage Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
