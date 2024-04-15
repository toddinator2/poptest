import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Diary from '@/models/diary';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { note, userid, ptid } = body;

	try {
		await new Diary({
			note,
			officeuserObjId: userid,
			patientObjId: ptid,
		}).save();

		return NextResponse.json({ msg: 'Notes Saved Successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
