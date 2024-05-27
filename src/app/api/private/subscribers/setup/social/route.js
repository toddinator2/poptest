import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Social from '@/models/social';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		alc,
		alccur,
		alcquit,
		coffee,
		tea,
		soda,
		tob,
		tobday,
		tobweek,
		tobquit,
		thc,
		thcday,
		thcweek,
		thcmonth,
		thcquit,
		hd,
		hdtypes,
		hdday,
		hdweek,
		hdmonth,
		hdquit,
		patientObjId,
	} = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('social');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('social');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to social table
	try {
		const newSoc = await new Social({
			alc,
			alccur,
			alcquit,
			coffee,
			tea,
			soda,
			tob,
			tobday,
			tobweek,
			tobquit,
			thc,
			thcday,
			thcweek,
			thcmonth,
			thcquit,
			hd,
			hdtypes,
			hdday,
			hdweek,
			hdmonth,
			hdquit,
			patientObjId,
		}).save();
		const newSocId = newSoc._id;
		if (newSocId) {
			return NextResponse.json({ msg: 'Social History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Social History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
