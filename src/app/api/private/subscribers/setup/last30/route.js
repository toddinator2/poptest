import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Last30day from '@/models/last30day';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		abd,
		acn,
		anx,
		bac,
		blo,
		che,
		col,
		con,
		cou,
		dep,
		dbl,
		dia,
		diz,
		esw,
		fai,
		fat,
		gas,
		hed,
		her,
		hei,
		ins,
		joi,
		luc,
		mem,
		moo,
		mua,
		nau,
		ner,
		nun,
		nur,
		pal,
		sob,
		skr,
		slu,
		sno,
		swa,
		urf,
		vom,
		subObjId,
	} = body;

	try {
		const newLast30 = await new Last30day({
			abd,
			acn,
			anx,
			bac,
			blo,
			che,
			col,
			con,
			cou,
			dep,
			dbl,
			dia,
			diz,
			esw,
			fai,
			fat,
			gas,
			hed,
			her,
			hei,
			ins,
			joi,
			luc,
			mem,
			moo,
			mua,
			nau,
			ner,
			nun,
			nur,
			pal,
			sob,
			skr,
			slu,
			sno,
			swa,
			urf,
			vom,
			subObjId,
		}).save();
		const newLastId = newLast30._id;

		if (newLastId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { last30: true }, { new: true });
			return NextResponse.json({ msg: 'Last 30 Days submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Last 30 Days Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
