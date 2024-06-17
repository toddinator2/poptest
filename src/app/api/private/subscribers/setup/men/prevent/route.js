import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Menprevent from '@/models/menprevent';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { clg, clgdate, cls, clsdate, eye, eyedate, psa, psadate, subObjId } = body;

	try {
		const newRec = await new Menprevent({
			clg,
			clgdate,
			cls,
			clsdate,
			eye,
			eyedate,
			psa,
			psadate,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { menprevent: true }, { new: true });
			return NextResponse.json({ msg: 'Preventative Care submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Preventative Care Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
