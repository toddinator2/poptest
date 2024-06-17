import { NextResponse } from 'next/server';
import { CreateUsername } from '@/components/global/functions/Functions';
import connect from '@/utils/dbConnect';
import Subprereg from '@/models/subprereg';
import Subscriber from '@/models/subscriber';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { fname, lname, dob, email, phone, password, verifycode, token } = body;
	let uname = '';
	let newPtId = '';
	let lwrEmail = '';

	if (email) {
		lwrEmail = email.toLowerCase();
	}

	if (token === authToken) {
		//Create username
		for (let i = 0; i <= 1000000; i++) {
			const newUname = CreateUsername(fname, lname);
			const unameExistsPrereg = await Subprereg.findOne({ username: newUname });
			const unameExistsPatient = await Subscriber.findOne({ username: newUname });
			if ((!unameExistsPrereg || unameExistsPrereg === null) && (!unameExistsPatient || unameExistsPatient === null)) {
				uname = newUname.toLowerCase();
				break;
			}
		}

		const newPt = new Subprereg({
			fname: fname,
			lname: lname,
			dob: dob,
			email: lwrEmail,
			phone: phone,
			username: uname,
			password: password,
			verifycode: verifycode,
		});

		try {
			const pt = await newPt.save();
			newPtId = pt._id;

			if (newPtId) {
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
