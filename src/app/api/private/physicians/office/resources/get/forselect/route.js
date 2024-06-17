import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcresource from '@/models/ofcresource';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');

	try {
		const allRscs = await Ofcresource.find({ ofclocObjId: locid }).sort({ name: 1 });
		if (allRscs) {
			let tmpArr = [];
			for (let i = 0; i < allRscs.length; i++) {
				const rsc = allRscs[i];
				const rscObj = {
					text: rsc.name,
					value: rsc._id,
				};
				tmpArr.push(rscObj);
			}

			return NextResponse.json({ rscs: tmpArr, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Resources Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
