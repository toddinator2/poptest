import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const {
		_id,
		date,
		description,
		start,
		end,
		color,
		comment,
		reason,
		unixstart,
		unixend,
		pasignreqId,
		pasignreqname,
		prsignreqId,
		prsignreqname,
		resource,
		categoryObjId,
		serviceObjId,
	} = body;

	try {
		await Appointment.findByIdAndUpdate(
			_id,
			{
				date,
				description,
				start,
				end,
				color,
				comment,
				reason,
				unixstart,
				unixend,
				pasignreqId,
				pasignreqname,
				prsignreqId,
				prsignreqname,
				resource,
				categoryObjId,
				serviceObjId,
			},
			{ new: true }
		);

		return NextResponse.json({ msg: 'Appointment updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
