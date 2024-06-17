import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Wmnsexual from '@/models/wmnsexual';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { desire, lubrication, overall, discomfort, subObjId } = body;

	try {
		const newSex = await new Womensexual({
			desire,
			lubrication,
			overall,
			discomfort,
			subObjId,
		}).save();
		const newSexId = newSex._id;

		if (newSexId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { wmnsexual: true }, { new: true });
			return NextResponse.json({ msg: 'Sexual Function submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Sexual Function Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
