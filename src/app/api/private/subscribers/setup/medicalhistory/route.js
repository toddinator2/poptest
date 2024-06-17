import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Medicalhistory from '@/models/medicalhistory';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		acr,
		alc,
		ane,
		anx,
		aui,
		bid,
		blc,
		cbr,
		cco,
		cle,
		clu,
		cly,
		cov,
		cpr,
		cst,
		cth,
		cel,
		chf,
		dep,
		dia,
		drg,
		eat,
		gal,
		gou,
		hat,
		hbp,
		hch,
		htr,
		ind,
		irr,
		kid,
		lte,
		nun,
		ost,
		pan,
		sap,
		str,
		thy,
		oth,
		other,
		subObjId,
	} = body;

	try {
		const newHist = await new Medicalhistory({
			acr,
			alc,
			ane,
			anx,
			aui,
			bid,
			blc,
			cbr,
			cco,
			cle,
			clu,
			cly,
			cov,
			cpr,
			cst,
			cth,
			cel,
			chf,
			dep,
			dia,
			drg,
			eat,
			gal,
			gou,
			hat,
			hbp,
			hch,
			htr,
			ind,
			irr,
			kid,
			lte,
			nun,
			ost,
			pan,
			sap,
			str,
			thy,
			oth,
			other,
			subObjId,
		}).save();
		const newHistId = newHist._id;

		if (newHistId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { medicalhistory: true }, { new: true });
			return NextResponse.json({ msg: 'Medical History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Medical History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
