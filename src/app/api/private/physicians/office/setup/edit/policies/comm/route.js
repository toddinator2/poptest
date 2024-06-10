import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Policyphy from '@/models/policyphy';
import Office from '@/models/office';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { accepted, today, inits, userid, ofcid } = body;

	try {
		await Policyphy.findOneAndUpdate({ officeuserObjId: userid, officeObjId: ofcid }, { comm: accepted, commdate: today, comminits: inits }, { new: true });
		await Officesetup.findOneAndUpdate({ officeObjId: ofcid }, { comm: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X Digital Communication Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
