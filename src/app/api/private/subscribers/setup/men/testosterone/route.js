import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Mentrt from '@/models/mentrt';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { nrt, wct, may, int, cur, learnmore, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('mentrt');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('mentrt');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to mentrt table
	try {
		const newRec = await new Mentrt({
			nrt,
			wct,
			may,
			int,
			cur,
			learnmore,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Testosterone Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Testosterone Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
