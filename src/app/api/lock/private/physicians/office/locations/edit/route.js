import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officelocation from '@/models/officelocation';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const {
		_id,
		name,
		address,
		address2,
		city,
		state,
		zip,
		phone,
		startday,
		endday,
		sametimes,
		starttime0,
		endtime0,
		startlunch0,
		endlunch0,
		starttime1,
		endtime1,
		startlunch1,
		endlunch1,
		starttime2,
		endtime2,
		startlunch2,
		endlunch2,
		starttime3,
		endtime3,
		startlunch3,
		endlunch3,
		starttime4,
		endtime4,
		startlunch4,
		endlunch4,
		starttime5,
		endtime5,
		startlunch5,
		endlunch5,
		starttime6,
		endtime6,
		startlunch6,
		endlunch6,
		latitude,
		longitude,
		deleteme,
		officeObjId,
	} = body;

	try {
		//update office setup just in case not already done
		const setup = await Officesetup.findOne({ officeObjId: officeObjId });
		if (setup) {
			if (!setup.locations) {
				await Officesetup.findByIdAndUpdate(setup._id, { locations: true }, { new: true });
			} else {
				if (setup.basic && setup.locations && setup.users && setup.calcols && !setup.complete) {
					await Officesetup.findByIdAndUpdate(setup._id, { complete: true }, { new: true });
				}
			}
		} else {
			await new Officesetup({ locations: true, officeObjId: officeObjId }).save();
		}

		await Officelocation.findByIdAndUpdate(
			_id,
			{
				name,
				address,
				address2,
				city,
				state,
				zip,
				phone,
				startday,
				endday,
				sametimes,
				starttime0,
				endtime0,
				startlunch0,
				endlunch0,
				starttime1,
				endtime1,
				startlunch1,
				endlunch1,
				starttime2,
				endtime2,
				startlunch2,
				endlunch2,
				starttime3,
				endtime3,
				startlunch3,
				endlunch3,
				starttime4,
				endtime4,
				startlunch4,
				endlunch4,
				starttime5,
				endtime5,
				startlunch5,
				endlunch5,
				starttime6,
				endtime6,
				startlunch6,
				endlunch6,
				latitude,
				longitude,
				deleteme,
			},
			{ new: true }
		);

		return NextResponse.json({ msg: 'Location updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
