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
			{ privacy: accepted, privacydate: today, privacyinits: inits },
			{ new: true }
		);
		await Ofcsetup.findOneAndUpdate({ officeObjId: ofcid }, { privacy: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X Privacy & Security successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
