import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofclocation from '@/models/ofclocation';
import Ofcsetup from '@/models/ofcsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const {
		ofcid,
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
	} = body;

	try {
		await Ofclocation.findOneAndUpdate(
			{ ofcObjId: ofcid },
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
			},
			{ new: true }
		);
		await Ofcsetup.findOneAndUpdate({ ofcObjId: ofcid }, { location: true }, { new: true });

		return NextResponse.json({ msg: 'Location updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
