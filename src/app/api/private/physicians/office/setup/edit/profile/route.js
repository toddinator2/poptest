import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcuser from '@/models/ofcuser';
import Ofcowner from '@/models/ofcowner';
import Ofcresource from '@/models/ofcresource';
import Ofcsetup from '@/models/ofcsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, fname, lname, email, phone, photo, add, add2, city, state, zip, title, license, licensestate, npi, gnpi, specialty, ofcid } = body;

	try {
		await Ofcuser.findByIdAndUpdate(
			_id,
			{
				fname,
				lname,
				email,
				phone,
				photo,
				address: add,
				address2: add2,
				city,
				state,
				zip,
				title,
				license,
				licensestate,
				npi,
				gnpi,
				specialty,
			},
			{ new: true }
		);

		//create a resource calendar column
		const user = await Ofcresource.findById(_id);
		if (user) {
			await new Resource({
				name: fname + ' ' + lname,
				order: 1,
				description: 'Physician',
				photo: photo,
				ofcuserObjId: user._id,
				ofclocObjId: user.ofclocObjId[0],
				ofcObjId: ofcid,
			}).save();
		}

		await Ofcowner.findOneAndUpdate({ ofcObjId: ofcid }, { fname, lname, email, phone }, { new: true });
		await Ofcsetup.findOneAndUpdate({ ofcObjId: ofcid }, { profile: true }, { new: true });
		return NextResponse.json({ msg: 'Physician Profile updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
