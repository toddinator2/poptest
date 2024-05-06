import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Pharmacy from '@/models/pharmacy';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { lclpharm, lclpharmphone, lclpharmfax, lclpharmaddress, onlpharm, onlpharmphone, onlpharmfax, onlpharmaddress, patientObjId } = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('pharmacy');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('pharmacy');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to pharmacy table
	try {
		const newPharm = await new Pharmacy({
			lclpharm,
			lclpharmphone,
			lclpharmfax,
			lclpharmaddress,
			onlpharm,
			onlpharmphone,
			onlpharmfax,
			onlpharmaddress,
			patientObjId,
		}).save();
		const newPharmId = newPharm._id;
		if (newPharmId) {
			return NextResponse.json({ msg: 'Pharmacy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Pharmacy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
