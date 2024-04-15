import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const vc = searchParams.get('vc');

	try {
		const user = await Patient.findOne({ verifycode: vc });
		if (!user) {
			return NextResponse.json({ msg: 'User not found', user: user });
		}
		return NextResponse.json({ user: user });
	} catch (err) {
		return NextResponse.json({ status: 500 });
	}
};
