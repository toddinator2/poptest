import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, locationObjId, officeObjId } = body;

	try {
		//update office setup just in case not already done
		const setup = await Officesetup.findOne({ officeObjId: officeObjId });
		if (setup) {
			if (!setup.users) {
				await Officesetup.findByIdAndUpdate(setup._id, { users: true }, { new: true });
			} else {
				if (setup.basic && setup.locations && setup.users && setup.calcols && !setup.complete) {
					await Officesetup.findByIdAndUpdate(setup._id, { complete: true }, { new: true });
				}
			}
		} else {
			await new Officesetup({ users: true, officeObjId: officeObjId }).save();
		}

		await Officeuser.findByIdAndUpdate(_id, { locationObjId }, { new: true });
		return NextResponse.json({ msg: 'User updated successfully', status: 200 });
	} catch (err) {
		//return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
		return NextResponse.json({ msg: err, status: 500 });
	}
};
