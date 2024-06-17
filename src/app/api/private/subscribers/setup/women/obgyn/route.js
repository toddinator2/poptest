import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Wmnobgyn from '@/models/wmnobgyn';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { pregnant, pregtest, ageperstart, ageperend, agefirstpreg, agelastpreg, agelastmenses, periods, numpregs, numkids, subObjId } = body;

	try {
		const newObgyn = await new Wmnobgyn({
			pregnant,
			pregtest,
			ageperstart,
			ageperend,
			agefirstpreg,
			agelastpreg,
			agelastmenses,
			periods,
			numpregs,
			numkids,
			subObjId,
		}).save();
		const newObgynId = newObgyn._id;

		if (newObgynId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { wmnobgyn: true }, { new: true });
			return NextResponse.json({ msg: 'Gynecologic History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Gynecologic History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
