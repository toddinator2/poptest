import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofclocation from '@/models/ofclocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');

	try {
		const allLocs = await Ofclocation.find({ ofcObjId: ofcid }).sort({ name: 1 });
		if (allLocs) {
			let tmpArr = [];
			for (let i = 0; i < allLocs.length; i++) {
				const loc = allLocs[i];
				const locObj = {
					label: loc.name,
					value: loc._id,
				};
				tmpArr.push(locObj);
			}

			return NextResponse.json({ locs: tmpArr, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Locations Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
