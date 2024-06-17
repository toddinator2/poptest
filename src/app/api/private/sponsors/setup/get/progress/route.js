import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnsetup from '@/models/spnsetup';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const spnId = searchParams.get('spnid');

	try {
		const spn = await Spnsetup.findOne({ spnObjId: spnId });
		if (spn) {
			const spnObj = {
				type: spn.type,
				profile: spn.profile,
				location: spn.location,
				agreement: spn.agreement,
				bank: spn.bank,
			};

			return NextResponse.json({ setup: spnObj, status: 200 });
		} else {
			return NextResponse.json({ status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
