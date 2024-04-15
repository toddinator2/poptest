import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Template from '@/models/template';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { name, category, tmpBody, userId } = body;

	try {
		await new Template({
			name,
			category,
			body: tmpBody,
			officeuserObjId: userId,
		}).save();

		return NextResponse.json({ msg: 'Template Saved Successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
