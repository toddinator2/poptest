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
				basic: ofc.basic,
				owner: ofc.owner,
				loc: ofc.location,
				user: ofc.user,
			};
			return NextResponse.json({ setup: ofcObj, status: 200 });
		} else {
			return NextResponse.json({ status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
