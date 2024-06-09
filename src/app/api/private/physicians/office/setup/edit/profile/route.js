import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officeuser from '@/models/officeuser';
import Owner from '@/models/owner';
import Resource from '@/models/resource';
import Officesetup from '@/models/officesetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { _id, fname, lname, email, phone, photo, add, add2, city, state, zip, title, license, licensestate, npi, gnpi, specialty, ofcid } = body;

	try {
		await Officeuser.findByIdAndUpdate(
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
		const user = await Officeuser.findById(_id);
		if (user) {
			await new Resource({
				name: fname + ' ' + lname,
				order: 1,
				description: 'Physician',
				photo: photo,
				officeuserObjId: user._id,
				locationObjId: user.locationObjId[0],
				officeObjId: ofcid,
			}).save();
		}

		await Owner.findOneAndUpdate({ officeObjId: ofcid }, { fname, lname, email, phone }, { new: true });
		await Officesetup.findOneAndUpdate({ officeObjId: ofcid }, { profile: true }, { new: true });
		return NextResponse.json({ msg: 'Physician Profile updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
