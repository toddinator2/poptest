import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { ptid, type } = body;

	//update setup progress for docform
	const pt = await Patient.findById(ptid);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push(type);
		await Patient.findByIdAndUpdate(ptid, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push(type);
		await Patient.findByIdAndUpdate(ptid, { setupprogress: tmpArr }, { new: true });
	}
	return NextResponse.json({ status: 200 });
};
