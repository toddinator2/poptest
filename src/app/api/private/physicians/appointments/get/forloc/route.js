import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');
	const offset = searchParams.get('offset');

	let today = new Date().toLocaleDateString();
	const unixToday = parseInt((new Date(today).getTime() / 1000 + parseInt(offset)).toFixed(0));

	try {
		const appts = await Appointment.find({ locationObjId: locid, unixstart: { $gte: unixToday - 604800 } }).sort({ unixdate: 1 });
		if (appts) {
			return NextResponse.json({ appts: appts, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Appointments Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
