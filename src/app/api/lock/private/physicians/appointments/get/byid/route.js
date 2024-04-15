import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const appt = await Appointment.findOne({ _id: id });
		if (appt) {
			return NextResponse.json({ appt: appt, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Appointment Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
