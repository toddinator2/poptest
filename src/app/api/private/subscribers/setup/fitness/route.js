import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Fitness from '@/models/fitness';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		days,
		time,
		where,
		when,
		bkg,
		bbg,
		car,
		cro,
		int,
		hit,
		hkg,
		pwr,
		run,
		spo,
		swm,
		wlk,
		goal,
		explan,
		alone,
		nuplan,
		tech,
		yoga,
		pil,
		learnmore,
		patientObjId,
	} = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('fitness');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('fitness');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to fitness table
	try {
		const newRec = await new Fitness({
			days,
			time,
			where,
			when,
			bkg,
			bbg,
			car,
			cro,
			int,
			hit,
			hkg,
			pwr,
			run,
			spo,
			swm,
			wlk,
			goal,
			explan,
			alone,
			nuplan,
			tech,
			yoga,
			pil,
			learnmore,
			patientObjId,
		}).save();
		const newRecId = newRec._id;
		if (newRecId) {
			return NextResponse.json({ msg: 'Physical Fitness submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physical Fitness Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
