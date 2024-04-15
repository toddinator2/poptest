import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Template from '@/models/template';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, name, category, tmpBody } = body;

	try {
		await Template.findByIdAndUpdate(_id, { name, category, body: tmpBody }, { new: true });
		return NextResponse.json({ msg: 'Template updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
