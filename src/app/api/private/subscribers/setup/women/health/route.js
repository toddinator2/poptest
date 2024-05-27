import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Women from '@/models/women';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { bhc, dgp, fhr, hot, irr, lsx, nun, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('women');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('women');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to women table
	try {
		const newWomen = await new Women({
			bhc,
			dgp,
			fhr,
			hot,
			irr,
			lsx,
			nun,
			patientObjId,
		}).save();
		const newWomenId = newWomen._id;
		if (newWomenId) {
			return NextResponse.json({ msg: 'Womens Health submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Womens Health Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
