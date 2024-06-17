import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Chiropractic from '@/models/chiropractic';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { not, nvr, iwc, may, ned, cur, learnmore, subObjId } = body;

	try {
		const newRec = await new Chiropractic({
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
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { chiropractic: true }, { new: true });
			return NextResponse.json({ msg: 'Chiropractic Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Chiropractic Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
