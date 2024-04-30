import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');
	const ptid = searchParams.get('ptid');

	try {
		const allPtAppts = await Appointment.find({ locationObjId: locid, patientObjId: ptid }).sort({ unixdate: 1 });
		if (allPtAppts.length !== 0) {
			let arrList = [];
			for (let i = 0; i < allPtAppts.length; i++) {
				const appt = allPtAppts[i];
				const listObj = {
					_id: appt._id,
					date: appt.date,
					description: appt.description,
				};
				arrList.push(listObj);
			}
			return NextResponse.json({ appts: arrList, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Appointments Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
