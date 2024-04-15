import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Category from '@/models/category';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, name, color } = body;

	try {
		await Category.findByIdAndUpdate(_id, { name, color }, { new: true });

		return NextResponse.json({ msg: 'Category updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
