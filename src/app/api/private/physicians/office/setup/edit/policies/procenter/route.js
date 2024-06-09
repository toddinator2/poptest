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
			{ procenter: accepted, procenterdate: today, procenterinits: inits },
			{ new: true }
		);
		await Officesetup.findOneAndUpdate({ officeObjId: ofcid }, { procenter: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X Pro-Center Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
