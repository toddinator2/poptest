import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';
import Patient from '@/models/patient';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');
	const offset = searchParams.get('offset');

	let today = new Date().toLocaleDateString();
	let tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const unixToday = parseInt((new Date(today).getTime() / 1000 + parseInt(offset)).toFixed(0));
	const unixTomorrow = parseInt((new Date(tomorrow).getTime() / 1000 + parseInt(offset)).toFixed(0));

	try {
		const allTodays = await Appointment.find({ locationObjId: locid, unixstart: { $gt: unixToday, $lt: unixTomorrow } }).sort({ unixdate: 1 });
		if (allTodays.length !== 0) {
			let tmpArr = [];
			for (let i = 0; i < allTodays.length; i++) {
				const appt = allTodays[i];
				const patient = await Patient.findById(appt.patientObjId);
				if (patient) {
					const ptObj = {
						_id: patient._id,
						fname: patient.fname,
						lname: patient.lname,
						photo: patient.photo,
					};
					tmpArr.push(ptObj);
				}
			}
			const todays = tmpArr;
			return NextResponse.json({ todays: todays, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Appointments Today', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
