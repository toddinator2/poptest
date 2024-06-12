import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Policyphy from '@/models/policyphy';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { accepted, today, inits, userid, ofcid } = body;

	try {
		await Policyphy.findOneAndUpdate(
			{ officeuserObjId: userid, officeObjId: ofcid },
			{ payment: accepted, paymentdate: today, paymentinits: inits },
			{ new: true }
		);
		await Officesetup.findOneAndUpdate({ officeObjId: ofcid }, { payment: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X Payment Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};