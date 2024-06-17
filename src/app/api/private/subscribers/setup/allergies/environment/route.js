import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Algenv from '@/models/algenv';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { any, dmwhen, dmtype, ivwhen, ivtype, lxwhen, lxtype, mdwhen, mdtype, pswhen, pstype, ptwhen, pttype, plwhen, pltype, oth, other, subObjId } = body;

	try {
		const newRec = await new Algenv({
			any,
			dmwhen,
			dmtype,
			ivwhen,
			ivtype,
			lxwhen,
			lxtype,
			mdwhen,
			mdtype,
			pswhen,
			pstype,
			ptwhen,
			pttype,
			plwhen,
			pltype,
			oth,
			other,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { algenv: true }, { new: true });
			return NextResponse.json({ msg: 'Environment Allergies submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Environment Allergies Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
