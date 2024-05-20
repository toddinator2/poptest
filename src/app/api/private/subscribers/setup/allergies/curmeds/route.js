import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Algcurmed from '@/models/algcurmed';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, ant, ast, eye, nas, orl, learnmore, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('algcurmed');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('algcurmed');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into algcurmeds
	try {
		const newRec = await new Algcurmed({
			any,
			ant,
			ast,
			eye,
			nas,
			orl,
			learnmore,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Current Allergy Medications submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Current Allergy Medications Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
