import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('id');

	try {
		const phy = await Officeuser.findById(_id).select(
			'-username -password -resetcreds -resetcode -permission -role -verifycode -emailconfirmed -officeid -locationObjId -officeObjId'
		);
		if (phy) {
			return NextResponse.json({ phy: phy, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physician Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
