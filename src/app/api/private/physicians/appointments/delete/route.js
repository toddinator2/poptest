import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const DELETE = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		//Delete Appointment
		const del = await Appointment.findByIdAndDelete(id);
		if (del) {
			return NextResponse.json({ msg: 'Appointment deleted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Error deleting appointment, please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
