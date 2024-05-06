import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
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
		patientObjId,
	} = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('medical');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('medical');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to immunizations table
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
			patientObjId,
		}).save();
		const newHistId = newHist._id;
		if (newHistId) {
			return NextResponse.json({ msg: 'Medical History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Medical History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
