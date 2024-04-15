import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { name, price, catObjId, locationObjId, officeObjId } = body;

	try {
		const exists = await Service.findOne({ name: name, catObjId: catObjId });
		if (exists) {
			return NextResponse.json({ msg: 'Name already exists in this category, please try another', status: 400 });
		}

		await new Service({
			name,
			price,
			catObjId,
			locationObjId,
			officeObjId,
		}).save();

		return NextResponse.json({ msg: 'Service added successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
