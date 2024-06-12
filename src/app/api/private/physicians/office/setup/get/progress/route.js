import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officesetup from '@/models/officesetup';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcId = searchParams.get('ofcid');

	try {
		const ofc = await Officesetup.findOne({ officeObjId: ofcId });
		if (ofc) {
			const ofcObj = {
				profile: ofc.profile,
				company: ofc.company,
				location: ofc.location,
				licensing: ofc.licensing,
				payment: ofc.payment,
				sponsor: ofc.sponsor,
				directory: ofc.directory,
				procenter: ofc.procenter,
				agora: ofc.agora,
				merchant: ofc.merchant,
				terms: ofc.terms,
				privacy: ofc.privacy,
				comm: ofc.comm,
				bank: ofc.bank,
			};

			return NextResponse.json({ setup: ofcObj, status: 200 });
		} else {
			return NextResponse.json({ status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
