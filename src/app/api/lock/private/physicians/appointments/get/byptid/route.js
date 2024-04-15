import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ptid = searchParams.get('ptid');

	try {
		const appts = await Appointment.find({ patientObjId: ptid }).sort({ unixstart: -1 });
		if (appts) {
			return NextResponse.json({ appts: appts, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Appointments Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
