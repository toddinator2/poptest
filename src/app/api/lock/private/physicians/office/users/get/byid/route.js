import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const id = searchParams.get('id');

	try {
		const allUser = await Officeuser.findById(id);
		if (allUser) {
			const user = {
				_id: allUser._id,
				fname: allUser.fname,
				lname: allUser.lname,
				email: allUser.email,
				phone: allUser.phone,
				photo: allUser.photo,
				permission: allUser.permission,
				role: allUser.role,
				supervisor: allUser.supervisor,
				paid: allUser.paid,
				title: allUser.title,
				license: allUser.license,
				npi: allUser.npi,
				specialty: allUser.specialty,
				officeid: allUser.officeid,
				locationObjId: allUser.locationObjId,
				officeObjId: allUser.officeObjId,
			};

			return NextResponse.json({ user: user, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
