import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('id');

	try {
		const ofc = await Office.findById(_id);
		if (ofc) {
			return NextResponse.json({ complete: ofc.setupcomplete, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Office not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
