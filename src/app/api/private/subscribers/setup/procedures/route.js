import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Procedure from '@/models/procedure';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { app, csn, cor, gal, hes, her, hip, hys, kne, nun, sps, ste, ton, wls, oth, other, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('procedures');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('procedures');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to procedures table
	try {
		const newProc = await new Procedure({
			app,
			csn,
			cor,
			gal,
			hes,
			her,
			hip,
			hys,
			kne,
			nun,
			sps,
			ste,
			ton,
			wls,
			oth,
			other,
			patientObjId,
		}).save();
		const newProcId = newProc._id;
		if (newProcId) {
			return NextResponse.json({ msg: 'Past Procedures submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Past Procedures Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
