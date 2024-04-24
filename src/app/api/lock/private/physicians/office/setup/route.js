import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officesetup from '@/models/officesetup';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcId = searchParams.get('ofcid');

	try {
		const setup = await Officesetup.findOne({ officeObjId: ofcId });
		if (setup) {
			const setupObj = {
				basic: setup.basic,
				locations: setup.locations,
				users: setup.users,
				calcols: setup.calcols,
				complete: setup.complete,
			};
			return NextResponse.json({ setup: setupObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No setup information found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ status: 500 });
	}
};
