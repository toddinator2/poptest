import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const allData = await Office.findById(id);
		if (allData) {
			const ofcObj = {
				_id: allData._id,
				name: allData.name,
				phone: allData.mainphone,
			};
			return NextResponse.json({ office: ofcObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Office not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ status: 500 });
	}
};
