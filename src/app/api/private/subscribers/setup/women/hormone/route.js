import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Womenhrt from '@/models/womenhrt';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { nrt, wct, may, int, cur, learnmore, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('wmnhrt');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('wmnhrt');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to womenhrt table
	try {
		const newRec = await new Womenhrt({
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
			return NextResponse.json({ msg: 'Hormone Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Hormone Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
