import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Menurinary from '@/models/menurinary';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { empty, again, stop, hold, weak, push, nite, life, subObjId } = body;

	try {
		const newRec = await new Menurinary({
			empty,
			again,
			stop,
			hold,
			weak,
			push,
			nite,
			life,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { menurinary: true }, { new: true });
			return NextResponse.json({ msg: 'Urinary Function submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Urinary Function Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
