import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Procedure from '@/models/procedure';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { app, csn, cor, gal, hes, her, hip, hys, kne, nun, sps, ste, ton, wls, oth, other, subObjId } = body;

	//add to procedures table
	try {
		const newProc = await new Procedure({
			app,
			csn,
			cor,
			gal,
			hes,
			her,
			hip,
			hys,
			kne,
			nun,
			sps,
			ste,
			ton,
			wls,
			oth,
			other,
			subObjId,
		}).save();
		const newProcId = newProc._id;

		if (newProcId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { procedures: true }, { new: true });
			return NextResponse.json({ msg: 'Past Procedures submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Past Procedures Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
