import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, fname, lname, email, phone, photo, permission, role, supervisor, title, license, npi, specialty, locationObjId } = body;

	try {
		await Officeuser.findByIdAndUpdate(
			_id,
			{
				fname,
				lname,
				email,
				phone,
				photo,
				permission,
				role,
				supervisor,
				title,
				license,
				npi,
				specialty,
				locationObjId,
			},
			{ new: true }
		);

		return NextResponse.json({ msg: 'User updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
