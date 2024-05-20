import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Womensexual from '@/models/womensexual';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { desire, lubrication, overall, discomfort, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('wmnsex');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('wmnsex');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to womensexual table
	try {
		const newSex = await new Womensexual({
			desire,
			lubrication,
			overall,
			discomfort,
			patientObjId,
		}).save();
		const newSexId = newSex._id;
		if (newSexId) {
			return NextResponse.json({ msg: 'Sexual Function submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Sexual Function Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
