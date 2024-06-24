import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Policy from '@/models/policy';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const cname = searchParams.get('cname');

	try {
		const pol = await Policy.findOne({ compname: cname });
		if (pol) {
			return NextResponse.json({ pol: pol, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Policy Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
