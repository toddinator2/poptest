import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');

	try {
		const pt = await Patient.findOne({ username: uname }).select('-username -password');
		if (pt) {
			return NextResponse.json({ patient: pt, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Patient Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};