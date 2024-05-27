import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Important from '@/models/important';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { time, cost, opts, appt, tech, services, foods, exercise, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('important');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('important');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into importants
	try {
		const newRec = await new Important({
			time,
			cost,
			opts,
			appt,
			tech,
			services,
			foods,
			exercise,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Most Importants submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Most Importants Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
