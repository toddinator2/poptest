import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsetup from '@/models/subsetup';
import Contactemp from '@/models/contactemp';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { company, name, phone, email, address, address2, city, state, zip, subObjId } = body;

	//insert new employer form data
	try {
		const newEmp = await new Contactemp({
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
		const newEmpId = newEmp._id;

		if (newEmpId) {
			await Subsetup.findOneAndUpdate({ subObjId: subObjId }, { empform: true }, { new: true });
			return NextResponse.json({ msg: 'Employer Form submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Employer Form Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
