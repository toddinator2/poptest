import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Wmnprevent from '@/models/wmnprevent';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { clg, clgdate, cls, clsdate, dex, dexdate, eye, eyedate, mam, mamdate, pap, papdate, subObjId } = body;

	try {
		const newWp = await new Wmnprevent({
			clg,
			clgdate,
			cls,
			clsdate,
			dex,
			dexdate,
			eye,
			eyedate,
			mam,
			mamdate,
			pap,
			papdate,
			subObjId,
		}).save();
		const newWpId = newWp._id;

		if (newWpId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { wmnprevent: true }, { new: true });
			return NextResponse.json({ msg: 'Preventative Care submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Preventative Care Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
