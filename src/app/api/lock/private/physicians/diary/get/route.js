import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Diary from '@/models/diary';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ptId = searchParams.get('ptid');
	const userId = searchParams.get('userid');

	try {
		const diary = await Diary.findOne({ officeuserObjId: userId, patientObjId: ptId });
		if (diary) {
			return NextResponse.json({ diary: diary, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Diary Notes Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
