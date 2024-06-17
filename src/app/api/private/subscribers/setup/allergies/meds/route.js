import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Algmed from '@/models/algmed';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, bio, con, asp, bpm, che, pen, udd, oth, other, subObjId } = body;

	try {
		const newRec = await new Algmed({
			any,
			bio,
			con,
			asp,
			bpm,
			che,
			pen,
			udd,
			oth,
			other,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { algmeds: true }, { new: true });
			return NextResponse.json({ msg: 'Medication Allergies submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Medication Allergies Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
