import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Obgynhistory from '@/models/obgynhistory';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { pregnant, pregtest, ageperstart, ageperend, agefirstpreg, agelastpreg, agelastmenses, periods, numpregs, numkids, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('obgyn');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('obgyn');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to obgynhistory table
	try {
		const newObgyn = await new Obgynhistory({
			pregnant,
			pregtest,
			ageperstart,
			ageperend,
			agefirstpreg,
			agelastpreg,
			agelastmenses,
			periods,
			numpregs,
			numkids,
			patientObjId,
		}).save();
		const newObgynId = newObgyn._id;
		if (newObgynId) {
			return NextResponse.json({ msg: 'Gynecologic History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Gynecologic History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
