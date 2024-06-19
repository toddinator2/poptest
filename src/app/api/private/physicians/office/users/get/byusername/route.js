import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcuser from '@/models/ofcuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');
	let lwrUname = '';

	if (uname) {
		lwrUname = uname.toLowerCase();
	}

	try {
		const allData = await Ofcuser.findOne({ username: lwrUname });
		if (allData) {
			const userObj = {
				_id: allData._id,
				fname: allData.fname,
				lname: allData.lname,
				email: allData.email,
				phone: allData.phone,
				photo: allData.photo,
				permission: allData.permission,
				role: allData.role,
				supervisor: allData.supervisor,
				paid: allData.paid,
				title: allData.title,
				license: allData.license,
				npi: allData.npi,
				specialty: allData.specialty,
				ofcs3xid: allData.ofcs3xid,
				ofclocObjId: allData.ofclocObjId,
				ofcObjId: allData.ofcObjId,
			};

			return NextResponse.json({ user: userObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
