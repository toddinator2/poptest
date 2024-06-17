import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Familyhistory from '@/models/familyhistory';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { alc, anx, bip, blc, cbr, cco, clu, cov, cpr, cst, cot, dem, dep, dia, hed, hbp, hch, htr, leu, lym, nun, str, thy, oth, other, subObjId } = body;

	try {
		const newFam = await new Familyhistory({
			alc,
			anx,
			bip,
			blc,
			cbr,
			cco,
			clu,
			cov,
			cpr,
			cst,
			cot,
			dem,
			dep,
			dia,
			hed,
			hbp,
			hch,
			htr,
			leu,
			lym,
			nun,
			str,
			thy,
			oth,
			other,
			subObjId,
		}).save();
		const newFamId = newFam._id;

		if (newFamId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { familyhistory: true }, { new: true });
			return NextResponse.json({ msg: 'Family History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Family History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
