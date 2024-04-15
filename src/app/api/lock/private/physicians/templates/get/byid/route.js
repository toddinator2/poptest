import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Template from '@/models/template';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const temp = await Template.findOne({ _id: id });
		if (temp) {
			return NextResponse.json({ temp: temp, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Template Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
