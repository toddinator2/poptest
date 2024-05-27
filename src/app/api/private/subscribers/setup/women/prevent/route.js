import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Womenprevent from '@/models/womenprevent';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { clg, clgdate, cls, clsdate, dex, dexdate, eye, eyedate, mam, mamdate, pap, papdate, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('wmnprevent');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('wmnprevent');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to womenprevent table
	try {
		const newWp = await new Womenprevent({
			clg,
			clgdate,
			cls,
			clsdate,
			dex,
			dexdate,
			eye,
			eyedate,
			mam,
			mamdate,
			pap,
			papdate,
			patientObjId,
		}).save();
		const newWpId = newWp._id;
		if (newWpId) {
			return NextResponse.json({ msg: 'Preventative Care submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Preventative Care Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
