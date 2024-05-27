import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Physicaltherapy from '@/models/physicaltherapy';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { not, nvr, iwc, may, ned, cur, learnmore, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('physicaltherapy');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('physicaltherapy');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert into physicaltherapies
	try {
		const newRec = await new Physicaltherapy({
			not,
			nvr,
			iwc,
			may,
			ned,
			cur,
			learnmore,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Physical Therapy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physical Therapy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
