import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsetup from '@/models/subsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { subid, type } = body;

	//update setup progress for docform
	if (type === 'docform') {
		await Subsetup.findOneAndUpdate({ subObjId: subid }, { docform: true }, { new: true });
	} else {
		await Subsetup.findOneAndUpdate({ subObjId: subid }, { empform: true }, { new: true });
	}
	return NextResponse.json({ status: 200 });
};
