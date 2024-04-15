import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, name, price } = body;

	try {
		await Service.findByIdAndUpdate(_id, { name, price }, { new: true });

		return NextResponse.json({ msg: 'Service updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
