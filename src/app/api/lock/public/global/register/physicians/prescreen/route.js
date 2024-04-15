import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Preregphys from '@/models/preregphys';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { fname, lname, email, phone, license, state, npi, specialty, isphysician, verifycode, token } = body;
	let lwrEmail = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	if (token === authToken) {
		try {
			//Check if email already exists
			const userExists = await Preregphys.findOne({ email: lwrEmail });
			if (userExists) {
				const unconfirmed = await Preregphys.findOne({ email: lwrEmail, emailconfirmed: false });
				if (unconfirmed) {
					return NextResponse.json({ status: 400 });
				}
			}

			await new Preregphys({
				fname: fname,
				lname: lname,
				email: lwrEmail,
				phone: phone,
				license: license,
				state: state,
				npi: npi,
				specialty: specialty,
				isphysician: isphysician,
				verifycode: verifycode,
			}).save();

			return NextResponse.json({ status: 200 });
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
