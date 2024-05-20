import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Algmed from '@/models/algmed';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, bio, con, asp, bpm, che, pen, udd, oth, other, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('algmeds');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('algmeds');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into algmeds
	try {
		const newRec = await new Algmed({
			any,
			bio,
			con,
			asp,
			bpm,
			che,
			pen,
			udd,
			oth,
			other,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Medication Allergies submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Medication Allergies Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};