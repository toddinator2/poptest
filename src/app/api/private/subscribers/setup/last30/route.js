import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
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
		patientObjId,
	} = body;

	//update history progress for profile
	const pt = await Patient.findById(patientObjId);
	if (pt.historyprogress !== undefined) {
		let tmpArr = pt.historyprogress;
		tmpArr.push('last30');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('last30');
		await Patient.findByIdAndUpdate(patientObjId, { historyprogress: tmpArr }, { new: true });
	}

	//add to last30days table
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
			patientObjId,
		}).save();
		const newLastId = newLast30._id;
		if (newLastId) {
			return NextResponse.json({ msg: 'Last 30 Days submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Last 30 Days Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
