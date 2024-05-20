import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Menurinary from '@/models/menurinary';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { empty, again, stop, hold, weak, push, nite, life, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('menurinary');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('menurinary');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to menurinary table
	try {
		const newRec = await new Menurinary({
			empty,
			again,
			stop,
			hold,
			weak,
			push,
			nite,
			life,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Urinary Function submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Urinary Function Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
