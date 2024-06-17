import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Contactdoc from '@/models/contactdoc';
import Subsetup from '@/models/subsetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { company, name, phone, email, address, address2, city, state, zip, subObjId } = body;

	//insert new doctor form data
	try {
		const newDoc = await new Contactdoc({
			company,
			name,
			phone,
			email,
			address,
			address2,
			city,
			state,
			zip,
			subObjId,
		}).save();
		const newDocId = newDoc._id;

		if (newDocId) {
			await Subsetup.findOneAndUpdate({ subObjId: subObjId }, { docform: true }, { new: true });
			return NextResponse.json({ msg: 'Doctor Form submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Doctor Form Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
