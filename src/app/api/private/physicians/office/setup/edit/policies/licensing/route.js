import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Policys3x from '@/models/policys3x';
import Ofcpolicy from '@/models/ofcpolicy';
import Ofcsetup from '@/models/ofcsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { polCmpName, accepted, today, inits, userid, ofcid } = body;
	let polId = '';

	//get policy id
	const pol = await Policys3x.findOne({ compname: polCmpName });
	if (pol) {
		polId = pol._id;
	}

	try {
		await Ofcpolicy.findOneAndUpdate(
			{ officeuserObjId: userid, officeObjId: ofcid },
			{ agreement: accepted, agreementdate: today, agreementsign: inits },
			{ new: true }
		);
		await Ofcsetup.findOneAndUpdate({ officeObjId: ofcid }, { licensing: accepted }, { new: true });
		return NextResponse.json({ msg: 'SN3X License Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
