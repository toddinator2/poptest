import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Familyhistory from '@/models/familyhistory';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { alc, anx, bip, blc, cbr, cco, clu, cov, cpr, cst, cot, dem, dep, dia, hed, hbp, hch, htr, leu, lym, nun, str, thy, oth, other, patientObjId } =
		body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('family');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('family');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to familyhistory table
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
			patientObjId,
		}).save();
		const newFamId = newFam._id;
		if (newFamId) {
			return NextResponse.json({ msg: 'Family History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Family History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
