import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Algfood from '@/models/algfood';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, dai, egg, fsh, glu, pea, shl, soy, trn, whe, oth, other, subObjId } = body;

	try {
		const newRec = await new Algfood({
			any,
			dai,
			egg,
			fsh,
			glu,
			pea,
			shl,
			soy,
			trn,
			whe,
			oth,
			other,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { algfoods: true }, { new: true });
			return NextResponse.json({ msg: 'Food Allergies submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Food Allergies Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
