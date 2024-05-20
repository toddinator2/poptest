import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Algfood from '@/models/algfood';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, dai, egg, fsh, glu, pea, shl, soy, trn, whe, oth, other, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('algfood');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('algfood');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into algfood
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
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Food Allergies submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Food Allergies Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
