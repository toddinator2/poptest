import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Resource from '@/models/resource';
import Officeuser from '@/models/officeuser';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { rows, locid } = body;

	await Resource.deleteMany({ locationObjId: locid });

	for (let i = 0; i < rows.length; i++) {
		let description = '';
		const data = rows[i];
		const user = await Officeuser.findById(data.userId);
		if (user.permission === 'provider') {
			description = 'Physician';
		} else if (user.permission === 'pa') {
			description = 'Non-Physician Provider';
		} else {
			description = 'MA';
		}
		await new Resource({
			id: data.order,
			name: user.fname + ' ' + user.lname,
			order: data.order,
			description,
			photo: user.photo,
			officeuserObjId: data.userId,
			locationObjId: data.locId,
			officeObjId: data.ofcId,
		}).save();
	}
	return NextResponse.json({ msg: 'Calendar Columns saved successfully', status: 200 });
};
