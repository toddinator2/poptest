import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Category from '@/models/category';
import Service from '@/models/service';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');
	let tmpArr = [];

	try {
		//get category id for location and memberships
		const cat = await Category.findOne({ locationObjId: locid, name: 'Memberships' });
		if (cat) {
			const catId = cat._id;
			const svcs = await Service.find({ catObjId: catId, locationObjId: locid });
			if (svcs) {
				for (let i = 0; i < svcs.length; i++) {
					const svc = svcs[i];
					const dataObj = {
						_id: svc._id,
						name: svc.name,
						desc: svc.description,
						price: svc.price,
					};
					tmpArr.push(dataObj);
				}
				return NextResponse.json({ mems: tmpArr, status: 200 });
			} else {
				return NextResponse.json({ status: 400 });
			}
		} else {
			return NextResponse.json({ status: 401 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
