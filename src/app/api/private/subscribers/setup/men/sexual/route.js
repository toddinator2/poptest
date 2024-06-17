import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Mensexual from '@/models/mensexual';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { keep, hard, after, comp, satfy, subObjId } = body;

	try {
		const newRec = await new Mensexual({
			keep,
			hard,
			after,
			comp,
			satfy,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { mensexual: true }, { new: true });
			return NextResponse.json({ msg: 'Sexual Function submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Sexual Function Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
