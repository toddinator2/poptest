import { NextResponse } from 'next/server';
import { CreateUsername } from '@/components/global/functions/Functions';
import connect from '@/utils/dbConnect';
import Spnprereg from '@/models/spnprereg';
import Spnuser from '@/models/spnuser';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { fname, lname, company, email, phone, phoneext, website, type, password, verifycode, token } = body;
	let uname = '';
	let newSpnId = '';
	let lwrEmail = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	if (token === authToken) {
		//Create username
		for (let i = 0; i <= 1000000; i++) {
			const newUname = CreateUsername(fname, lname);
			const unameExistsPrereg = await Spnprereg.findOne({ username: newUname });
			const unameExistsSponsor = await Spnuser.findOne({ username: newUname });
			if ((!unameExistsPrereg || unameExistsPrereg === null) && (!unameExistsSponsor || unameExistsSponsor === null)) {
				uname = newUname.toLowerCase();
				break;
			}
		}

		const newSpn = new Spnprereg({
			fname: fname,
			lname: lname,
			company: company,
			email: lwrEmail,
			phone: phone,
			phoneext: phoneext,
			website: website,
			type: type,
			username: uname,
			password: password,
			verifycode: verifycode,
		});

		try {
			const spn = await newSpn.save();
			newSpnId = spn._id;

			if (newSpnId) {
				return NextResponse.json({ status: 200 });
			} else {
				return NextResponse.json({ status: 400 });
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
