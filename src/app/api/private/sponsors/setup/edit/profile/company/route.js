import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Sponsor from '@/models/sponsor';
import Spnsetup from '@/models/spnsetup';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { legalname, dba, ein, fname, lname, email, phone, phoneext, website, numlocs, numemps, nummgnt, curpayins, curselffund, spnid } = body;
	let newEmail = '';

	if (email) {
		newEmail = email.toLowerCase();
	}

	try {
		await Sponsor.findByIdAndUpdate(
			spnid,
			{
				legalname,
				dba,
				ein,
				fname,
				lname,
				email: newEmail,
				phone,
				phoneext,
				website,
				numlocs,
				numemps,
				nummgnt,
				curpayins,
				curselffund,
			},
			{ new: true }
		);
		await Spnsetup.findOneAndUpdate({ spnObjId: spnid }, { profile: true }, { new: true });
		return NextResponse.json({ msg: 'Company Profile updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
