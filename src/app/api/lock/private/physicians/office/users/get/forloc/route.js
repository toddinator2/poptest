import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');
	const locid = searchParams.get('locid');

	try {
		const allUsers = await Officeuser.find({ officeObjId: ofcid }).sort({ fname: 1 });
		if (allUsers) {
			let tmpArr = [];
			for (let i = 0; i < allUsers.length; i++) {
				const user = allUsers[i];
				for (let l = 0; l < user.locationObjId.length; l++) {
					const loc = user.locationObjId[l];
					if (loc === locid) {
						let photo = '';
						let title = '';
						let license = '';
						let npi = '';
						let specialty = '';
						if (user.photo) {
							photo = user.photo;
						}
						if (user.title) {
							title = user.title;
						}
						if (user.license) {
							license = user.license;
						}
						if (user.npi) {
							npi = user.npi;
						}
						if (user.specialty) {
							specialty = user.specialty;
						}
						const userObj = {
							_id: user._id,
							fname: user.fname,
							lname: user.lname,
							email: user.email,
							phone: user.phone,
							photo: photo,
							permission: user.permission,
							role: user.role,
							supervisor: user.supervisor,
							paid: user.paid,
							title: title,
							license: license,
							npi: npi,
							specialty: specialty,
							officeid: user.officeid,
							locationObjId: user.locationObjId,
							officeObjId: user.officeObjId,
						};
						tmpArr.push(userObj);
						break;
					}
				}
			}
			return NextResponse.json({ users: tmpArr, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Users Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
