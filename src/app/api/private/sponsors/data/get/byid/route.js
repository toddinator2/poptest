import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Sponsor from '@/models/sponsor';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('id');

	try {
		const spn = await Sponsor.findById(_id);
		if (spn) {
			return NextResponse.json({ sponsor: spn, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Sponsor Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
