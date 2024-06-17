import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcuser from '@/models/ofcuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('id');

	try {
		const phy = await Ofcuser.findById(_id).select(
			'-username -password -resetcreds -resetcode -permission -role -verifycode -emailconfirmed -ofcs3xid -ofclocObjId -ofcObjId'
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
