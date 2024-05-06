import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Medication from '@/models/medication';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { meds, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('medications');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('medications');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to medications table
	try {
		for (let i = 0; i < meds.length; i++) {
			const med = meds[i];
			if (med.type === 'pre') {
				await new Medication({
					type: med.type,
					name: med.name,
					dosage: med.dosage,
					frequency: med.frequency,
					patientObjId,
				}).save();
			} else {
				await new Medication({
					type: med.type,
					name: med.name,
					reason: med.reason,
					patientObjId,
				}).save();
			}
		}
		return NextResponse.json({ msg: 'Medications submitted successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
