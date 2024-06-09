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
			{ agora: accepted, agoradate: today, agorainits: inits },
			{ new: true }
		);
		await Officesetup.findOneAndUpdate({ officeObjId: ofcid }, { agora: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X Agora Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
