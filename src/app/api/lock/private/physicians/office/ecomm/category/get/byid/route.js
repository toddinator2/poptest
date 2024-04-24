import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Category from '@/models/category';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const cat = await Category.findById(id);
		if (cat) {
			return NextResponse.json({ cat: cat, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Category Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
