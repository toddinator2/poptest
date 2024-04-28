import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');

	try {
		const allData = await Officeuser.findOne({ username: uname });
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
				officeid: allData.officeid,
				locationObjId: allData.locationObjId,
				officeObjId: allData.officeObjId,
			};

			return NextResponse.json({ user: userObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
