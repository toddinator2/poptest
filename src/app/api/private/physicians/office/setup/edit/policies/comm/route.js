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
		await Office.findByIdAndUpdate(ofcid, { setupcomplete: true }, { new: true });
		await Officesetup.findOneAndDelete({ officeObjId: ofcid });
		return NextResponse.json({ msg: 'You have successfully completed the Quick Start', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
