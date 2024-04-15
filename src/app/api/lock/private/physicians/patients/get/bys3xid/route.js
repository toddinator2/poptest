import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const s3xid = searchParams.get('s3xid');
	let lwrS3xid = '';

	if (s3xid) {
		lwrS3xid = s3xid.toLowerCase();
	}

	try {
		const user = await Patient.findOne({ s3xid: lwrS3xid });
		return NextResponse.json({ user: user });
	} catch (err) {
		return NextResponse.json({ status: 500 });
	}
};
