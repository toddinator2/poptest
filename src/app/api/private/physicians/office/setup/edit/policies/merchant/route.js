import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcpolicy from '@/models/ofcpolicy';
import Ofcsetup from '@/models/ofcsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { accepted, today, inits, userid, ofcid } = body;

	try {
		await Ofcpolicy.findOneAndUpdate(
			{ officeuserObjId: userid, officeObjId: ofcid },
			{ merchant: accepted, merchantdate: today, merchantinits: inits },
			{ new: true }
		);
		await Ofcsetup.findOneAndUpdate({ officeObjId: ofcid }, { merchant: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X Merchant Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
