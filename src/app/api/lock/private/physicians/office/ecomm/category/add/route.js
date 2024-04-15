import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Category from '@/models/category';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { name, color, locationObjId, officeObjId } = body;

	try {
		//make sure name does not already exist at this location
		const exists = await Category.findOne({ name: name, locationObjId: locationObjId });
		if (exists) {
			return NextResponse.json({ msg: 'Name already exists for this location, please try another', status: 400 });
		}

		await new Category({
			name,
			color,
			locationObjId,
			officeObjId,
		}).save();

		return NextResponse.json({ msg: 'Category added successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
