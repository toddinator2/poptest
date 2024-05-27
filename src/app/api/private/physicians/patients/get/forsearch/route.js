import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Patient from '@/models/patient';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');
	let ptArr = [];
	let tmpArr = [];

	try {
		const office = await Office.findById(ofcid);
		if (office) {
			const ofcPtArr = office.patients;
			for (let i = 0; i < ofcPtArr.length; i++) {
				const pt = await Patient.findById(ofcPtArr[i]);
				const _id = pt._id;
				const fname = pt.fname;
				const lname = pt.lname;
				const dob = pt.dob;
				const phone = pt.mphone;
				const photo = pt.photo;
				tmpArr.push({ _id, fname, lname, dob, phone, photo });
			}
			ptArr = tmpArr;
		}
		if (ptArr.length !== 0) {
			return NextResponse.json({ ptArr: ptArr, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Patients Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
