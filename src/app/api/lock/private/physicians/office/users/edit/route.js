import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, fname, lname, email, phone, photo, permission, role, supervisor, title, license, npi, specialty, locationObjId, officeObjId } = body;

	try {
		//update office setup just in case not already done
		const setup = await Officesetup.findOne({ officeObjId: officeObjId });
		if (setup) {
			if (!setup.users) {
				await Officesetup.findByIdAndUpdate(setup._id, { users: true }, { new: true });
			}
			if (setup.basic && setup.locations && setup.calcols && !setup.complete) {
				await Officesetup.findByIdAndUpdate(setup._id, { complete: true }, { new: true });
			}
		} else {
			await new Officesetup({ users: true, officeObjId: officeObjId }).save();
		}

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
