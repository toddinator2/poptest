import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');
	const offset = searchParams.get('offset');
	const ptid = searchParams.get('ptid');

	let today = new Date().toLocaleDateString();
	let tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const unixTomorrow = parseInt((new Date(tomorrow).getTime() / 1000 + parseInt(offset)).toFixed(0));

	try {
		const allPtAppts = await Appointment.find({ locationObjId: locid, patientObjId: ptid }).sort({ unixdate: 1 });
		if (allPtAppts.length !== 0) {
			let latest = {};
			let curUnixStart = 0;
			for (let i = 0; i < allPtAppts.length; i++) {
				const appt = allPtAppts[i];
				if (appt.unixstart <= unixTomorrow && appt.unixstart > curUnixStart) {
					curUnixStart = appt.unixstart;
					latest = appt;
				}
			}
			return NextResponse.json({ appt: latest, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Appointments Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
