import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const vc = searchParams.get('vc');

	try {
		const pt = await Patient.findOne({ verifycode: vc });
		if (pt) {
			return NextResponse.json({ patient: pt, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Patient not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ status: 500 });
	}
};
