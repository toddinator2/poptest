import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, legalname, dba, ein, email, phone, numphysicians, numnpps, numstaff, numnonmedstaff, currentehr } = body;

	try {
		await Office.findByIdAndUpdate(
			_id,
			{
				legalname,
				dba,
				ein,
				email,
				phone,
				numphysicians,
				numnpps,
				numstaff,
				numnonmedstaff,
				currentehr,
			},
			{ new: true }
		);
		await Officesetup.findOneAndUpdate({ officeObjId: _id }, { company: true }, { new: true });
		return NextResponse.json({ msg: 'Office Profile updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
