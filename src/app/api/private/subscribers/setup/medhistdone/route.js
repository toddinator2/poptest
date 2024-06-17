import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsetup from '@/models/subsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { subid } = body;

	try {
		await Subsetup.findByIdAndUpdate({ subObjId: subid }, { medhist: true }, { new: true });
		return NextResponse.json({ msg: 'Medical History completed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
