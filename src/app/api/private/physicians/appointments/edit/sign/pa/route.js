import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, pasigned, pasignedby, pasignedbyId, pasigneddate } = body;

	try {
		await Appointment.findByIdAndUpdate(_id, { pasigned, pasignedby, pasignedbyId, pasigneddate }, { new: true });
		return NextResponse.json({ msg: 'Appointment signed successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
