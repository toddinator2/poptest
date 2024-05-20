import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Algsymptom from '@/models/algsymptom';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, cou, dbr, ecz, ein, eit, eyg, eyi, eyw, fre, hed, hiv, nit, nru, nst, sin, spr, spa, snz, whz, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('algsym');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('algsym');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into algsymptoms
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
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Current Allergy Symptoms submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Current Allergy Symptoms Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
