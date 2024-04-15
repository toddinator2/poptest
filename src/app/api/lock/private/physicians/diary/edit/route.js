import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Diary from '@/models/diary';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, note } = body;

	try {
		await Diary.findByIdAndUpdate(_id, { note }, { new: true });
		return NextResponse.json({ msg: 'Diary updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
