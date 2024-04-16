import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, name, phone } = body;

	try {
		//update office setup just in case not already done
		const setup = await Officesetup.findOne({ officeObjId: _id });
		if (setup) {
			if (!setup.basic) {
				await Officesetup.findByIdAndUpdate(setup._id, { basic: true }, { new: true });
			}
			if (setup.locations && setup.users && setup.calcols && !setup.complete) {
				await Officesetup.findByIdAndUpdate(setup._id, { complete: true }, { new: true });
			}
		} else {
			await new Officesetup({ basic: true, officeObjId: _id }).save();
		}

		//update data
		await Office.findByIdAndUpdate(_id, { name, mainphone: phone }, { new: true });
		return NextResponse.json({ msg: 'Office updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
