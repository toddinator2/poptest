import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnpolicy from '@/models/spnpolicy';
import Spnsetup from '@/models/spnsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { agreement, agreementdate, agreementsign, userid, spnid } = body;

	try {
		await Spnpolicy.findOneAndUpdate({ spnuserObjId: userid, spnObjId: spnid }, { agreement, agreementdate, agreementsign }, { new: true });
		await Spnsetup.findOneAndUpdate({ spnObjId: spnid }, { agreement: agreement }, { new: true });
		return NextResponse.json({ msg: 'Sponsor Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
