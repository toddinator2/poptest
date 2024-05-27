import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Contactemp from '@/models/contactemp';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { company, name, phone, email, address, address2, city, state, zip, patientObjId } = body;

	//update setup progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('empform');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('empform');
		await Patient.findByIdAndUpdate(patientObjId, { setupprogress: tmpArr }, { new: true });
	}

	//insert new doctor form data
	try {
		const newEmp = await new Contactemp({
			company,
			name,
			phone,
			email,
			address,
			address2,
			city,
			state,
			zip,
			patientObjId,
		}).save();
		const newEmpId = newEmp._id;
		if (newEmpId) {
			return NextResponse.json({ msg: 'Employer Form submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Employer Form Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
