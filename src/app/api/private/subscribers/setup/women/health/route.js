import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Wmnhealth from '@/models/wmnhealth';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { bhc, dgp, fhr, hot, irr, lsx, nun, subObjId } = body;

	try {
		const newWomen = await new Wmnhealth({
			bhc,
			dgp,
			fhr,
			hot,
			irr,
			lsx,
			nun,
			subObjId,
		}).save();
		const newWomenId = newWomen._id;

		if (newWomenId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { wmnhealth: true }, { new: true });
			return NextResponse.json({ msg: 'Womens Health submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Womens Health Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
