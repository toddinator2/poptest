import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');

	try {
		const allUsers = await Officeuser.find({ officeObjId: ofcid }).sort({ fname: 1 });
		if (allUsers) {
			let tmpArr = [];
			for (let i = 0; i < allUsers.length; i++) {
				const user = allUsers[i];
				const userObj = {
					_id: user._id,
					fname: user.fname,
					lname: user.lname,
					email: user.email,
					phone: user.phone,
					photo: user.photo,
					permission: user.permission,
					role: user.role,
					supervisor: user.supervisor,
					paid: user.paid,
					title: user.title,
					license: user.license,
					npi: user.npi,
					specialty: user.specialty,
					officeid: user.officeid,
					locationObjId: user.locationObjId,
					officeObjId: user.officeObjId,
				};
				tmpArr.push(userObj);
			}
			return NextResponse.json({ users: tmpArr, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Users Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
