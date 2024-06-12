import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnlocation from '@/models/spnlocation';
import Sponsorsetup from '@/models/sponsorsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, name, address, address2, city, state, zip, phone, latitude, longitude, spnid } = body;

	try {
		await Spnlocation.findByIdAndUpdate(
			_id,
			{
				name,
				address,
				address2,
				city,
				state,
				zip,
				phone,
				latitude,
				longitude,
			},
			{ new: true }
		);
		await Sponsorsetup.findOneAndUpdate({ sponsorObjId: spnid }, { location: true }, { new: true });

		return NextResponse.json({ msg: 'Location updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
