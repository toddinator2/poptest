import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Menhealth from '@/models/menhealth';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { erd, sex, mus, nun, tst, exc, subObjId } = body;

	try {
		const newRec = await new Menhealth({
			erd,
			sex,
			mus,
			nun,
			tst,
			exc,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { menhealth: true }, { new: true });
			return NextResponse.json({ msg: 'Mens Health submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Mens Health Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
