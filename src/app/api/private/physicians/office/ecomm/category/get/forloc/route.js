import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Category from '@/models/category';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');

	try {
		const cats = await Category.find({ ofclocObjId: locid });
		if (cats) {
			return NextResponse.json({ cats: cats, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Categories Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
