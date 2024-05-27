import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Menopause from '@/models/menopause';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { anx, bla, dep, dry, hot, hed, irr, joi, phy, sex, slp, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('wmnmen');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('wmnmen');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to menopause table
	try {
		const newRec = await new Menopause({
			anx,
			bla,
			dep,
			dry,
			hot,
			hed,
			irr,
			joi,
			phy,
			sex,
			slp,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Menopause submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Menopause Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
