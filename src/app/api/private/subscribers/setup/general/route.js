import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, hearabout, referredby, marital, pcpname, pcpphone, employer, employerphone } = body;

	//update history progress for profile
	const pt = await Patient.findById(_id);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('general');
		await Patient.findByIdAndUpdate(_id, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('general');
		await Patient.findByIdAndUpdate(_id, { historyprogress: tmpArr }, { new: true });
	}

	//update the rest of the fields
	try {
		await Patient.findByIdAndUpdate(_id, { hearabout, referredby, marital, pcpname, pcpphone, employer, employerphone }, { new: true });
		return NextResponse.json({ msg: 'General Information updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
