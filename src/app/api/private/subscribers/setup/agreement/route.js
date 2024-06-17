import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subpolicy from '@/models/subpolicy';
import Subsetup from '@/models/subsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { agreement, agreementdate, agreementsign, subObjId } = body;

	try {
		await Subpolicy.findOneAndUpdate({ subObjId: subObjId }, { agreement, agreementdate, agreementsign }, { new: true });
		await Subsetup.findOneAndUpdate({ subObjId: subObjId }, { agreement: agreement }, { new: true });
		return NextResponse.json({ msg: 'Subscriber Agreement successfully signed', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
