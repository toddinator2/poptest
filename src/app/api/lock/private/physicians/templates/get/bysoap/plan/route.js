import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Template from '@/models/template';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const userid = searchParams.get('userid');

	try {
		const temps = await Template.find({ officeuserObjId: userid, category: 'Plan' }).sort({ name: 1 });
		if (temps.length !== 0) {
			return NextResponse.json({ temps: temps, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Templates Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
