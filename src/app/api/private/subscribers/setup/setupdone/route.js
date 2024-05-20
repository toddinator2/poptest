import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { ptId } = body;

	try {
		await Patient.findByIdAndUpdate(ptId, { setupdone: true }, { new: true });
		return NextResponse.json({ msg: 'Account Setup completed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
