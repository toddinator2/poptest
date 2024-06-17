import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Algcurmed from '@/models/algcurmed';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, ant, ast, eye, nas, orl, learnmore, subObjId } = body;

	try {
		const newRec = await new Algcurmed({
			any,
			ant,
			ast,
			eye,
			nas,
			orl,
			learnmore,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { algcurmeds: true }, { new: true });
			return NextResponse.json({ msg: 'Current Allergy Medications submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Current Allergy Medications Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
