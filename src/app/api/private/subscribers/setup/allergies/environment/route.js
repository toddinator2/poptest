import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Algenv from '@/models/algenv';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, dmwhen, dmtype, ivwhen, ivtype, lxwhen, lxtype, mdwhen, mdtype, pswhen, pstype, ptwhen, pttype, plwhen, pltype, oth, other, patientObjId } =
		body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('algenv');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('algenv');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into algenv
	try {
		const newRec = await new Algenv({
			any,
			dmwhen,
			dmtype,
			ivwhen,
			ivtype,
			lxwhen,
			lxtype,
			mdwhen,
			mdtype,
			pswhen,
			pstype,
			ptwhen,
			pttype,
			plwhen,
			pltype,
			oth,
			other,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Environment Allergies submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Environment Allergies Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
