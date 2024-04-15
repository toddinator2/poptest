import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const office = await Office.findById(id);
		if (office) {
			return NextResponse.json({ office: office, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Office not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ status: 500 });
	}
};
