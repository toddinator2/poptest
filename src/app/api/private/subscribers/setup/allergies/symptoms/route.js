import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Algsymptom from '@/models/algsymptom';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, cou, dbr, ecz, ein, eit, eyg, eyi, eyw, fre, hed, hiv, nit, nru, nst, sin, spr, spa, snz, whz, subObjId } = body;

	try {
		const newRec = await new Algsymptom({
			any,
			cou,
			dbr,
			ecz,
			ein,
			eit,
			eyg,
			eyi,
			eyw,
			fre,
			hed,
			hiv,
			nit,
			nru,
			nst,
			sin,
			spr,
			spa,
			snz,
			whz,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { algsymptoms: true }, { new: true });
			return NextResponse.json({ msg: 'Current Allergy Symptoms submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Current Allergy Symptoms Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
