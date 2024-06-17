import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Immunization from '@/models/immunization';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { cov, covdate, dtt, dttdate, flu, fludate, hpb, hpbdate, nun, pne, pnedate, pre, predate, shi, shidate, tdp, tdpdate, subObjId } = body;

	try {
		const newImm = await new Immunization({
			cov,
			covdate,
			dtt,
			dttdate,
			flu,
			fludate,
			hpb,
			hpbdate,
			nun,
			pne,
			pnedate,
			pre,
			predate,
			shi,
			shidate,
			tdp,
			tdpdate,
			subObjId,
		}).save();
		const newImmId = newImm._id;

		if (newImmId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { immunizations: true }, { new: true });
			return NextResponse.json({ msg: 'Immunizations submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Immunizations Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
