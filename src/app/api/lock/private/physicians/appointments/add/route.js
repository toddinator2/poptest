import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		date,
		title,
		description,
		start,
		end,
		color,
		comment,
		reason,
		unixstart,
		unixend,
		pasignreqId,
		pasignreqname,
		prsignreqId,
		prsignreqname,
		resource,
		categoryObjId,
		serviceObjId,
		patientObjId,
		locationObjId,
		officeObjId,
	} = body;

	try {
		await new Appointment({
			date,
			title,
			description,
			start,
			end,
			color,
			comment,
			reason,
			unixstart,
			unixend,
			pasignreqId,
			pasignreqname,
			prsignreqId,
			prsignreqname,
			resource,
			categoryObjId,
			serviceObjId,
			patientObjId,
			locationObjId,
			officeObjId,
		}).save();

		return NextResponse.json({ msg: 'Appointment Created Successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
