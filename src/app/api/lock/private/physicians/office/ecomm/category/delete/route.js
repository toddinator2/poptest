import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Category from '@/models/category';
import Service from '@/models/service';

export const DELETE = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const catid = searchParams.get('catid');

	try {
		//delete services
		await Service.deleteMany({ catObjId: catid });

		//delete category
		const cat = await Category.findByIdAndDelete(catid);
		if (cat) {
			return NextResponse.json({ msg: 'Category deleted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Category not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
