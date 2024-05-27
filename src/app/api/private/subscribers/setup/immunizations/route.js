import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Immunization from '@/models/immunization';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { cov, covdate, dtt, dttdate, flu, fludate, hpb, hpbdate, nun, pne, pnedate, pre, predate, shi, shidate, tdp, tdpdate, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('immune');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('immune');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to immunizations table
	try {
		const newImm = await new Immunization({
			cov,
			covdate,
			dtt,
			dttdate,
			flu,
			fludate,
			hpb,
			hpbdate,
			nun,
			pne,
			pnedate,
			pre,
			predate,
			shi,
			shidate,
			tdp,
			tdpdate,
			patientObjId,
		}).save();
		const newImmId = newImm._id;
		if (newImmId) {
			return NextResponse.json({ msg: 'Immunizations submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Immunizations Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
