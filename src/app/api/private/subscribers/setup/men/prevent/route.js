import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Menprevent from '@/models/menprevent';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { clg, clgdate, cls, clsdate, eye, eyedate, psa, psadate, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('menprevent');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('menprevent');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to menprevent table
	try {
		const newRec = await new Menprevent({
			clg,
			clgdate,
			cls,
			clsdate,
			eye,
			eyedate,
			psa,
			psadate,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Preventative Care submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Preventative Care Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
