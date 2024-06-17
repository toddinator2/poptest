import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Wmnmenopause from '@/models/wmnmenopause';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { anx, bla, dep, dry, hot, hed, irr, joi, phy, sex, slp, subObjId } = body;

	try {
		const newRec = await new Wmnmenopause({
			anx,
			bla,
			dep,
			dry,
			hot,
			hed,
			irr,
			joi,
			phy,
			sex,
			slp,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { wmnmenopause: true }, { new: true });
			return NextResponse.json({ msg: 'Menopause submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Menopause Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
