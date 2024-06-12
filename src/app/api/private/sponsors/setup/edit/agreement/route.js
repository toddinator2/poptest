import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Policyspn from '@/models/policyspn';
import Sponsorsetup from '@/models/sponsorsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { agreement, agreementdate, agreementsign, userid, spnid } = body;

	try {
		await Policyspn.findOneAndUpdate({ sponsoruserObjId: userid, sponsorObjId: spnid }, { agreement, agreementdate, agreementsign }, { new: true });
		await Sponsorsetup.findOneAndUpdate({ sponsorObjId: spnid }, { agreement: agreement }, { new: true });
		return NextResponse.json({ msg: 'Sponsor Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
