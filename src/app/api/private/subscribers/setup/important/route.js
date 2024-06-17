import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Important from '@/models/important';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { time, cost, opts, appt, tech, services, foods, exercise, subObjId } = body;

	try {
		const newRec = await new Important({
			time,
			cost,
			opts,
			appt,
			tech,
			services,
			foods,
			exercise,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { important: true }, { new: true });
			return NextResponse.json({ msg: 'Most Importants submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Most Importants Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
