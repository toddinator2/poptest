import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officelocation from '@/models/officelocation';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		name,
		address,
		address2,
		city,
		state,
		zip,
		phone,
		startday,
		endday,
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
		officeObjId,
	} = body;

	try {
		await new Officelocation({
			name,
			address,
			address2,
			city,
			state,
			zip,
			phone,
			startday,
			endday,
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
			officeObjId,
		}).save();

		return NextResponse.json({ msg: 'Location added successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
