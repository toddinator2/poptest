import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Service from '@/models/service';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, name, price, catObjId } = body;

	try {
		//make sure name does not already exist for this category
		const exists = await Service.findOne({ name: name, catObjId: catObjId });
		if (exists) {
			return NextResponse.json({ msg: 'Name already exists for this category, please try another', status: 400 });
		}

		await Service.findByIdAndUpdate(_id, { name, price }, { new: true });
		return NextResponse.json({ msg: 'Service updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
