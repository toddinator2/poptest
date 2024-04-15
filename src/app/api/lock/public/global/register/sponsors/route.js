import { NextResponse } from 'next/server';
import { CreateSponsorId } from '@/components/global/functions/PageFunctions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Sponsor from '@/models/sponsor';
import Sponsoruser from '@/models/sponsoruser';
import Sponsorlocation from '@/models/sponsorlocation';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const {
		type,
		companyname,
		fname,
		lname,
		email,
		phone,
		phoneext,
		website,
		username,
		password,
		verifycode,
		legalname,
		eid,
		add1,
		add2,
		city,
		state,
		zip,
		industry,
		numemps,
		latitude,
		longitude,
		token,
	} = body;
	let newSpn;
	let lwrUname = '';

	if (username) {
		lwrUname = username.toLowerCase();
	}

	if (token === authToken) {
		//Check if username already exists
		const userExists = await Sponsoruser.findOne({ username: lwrUname });
		if (userExists) {
			return NextResponse.json({ status: 400 });
		}

		//Create a Sponsor ID and check if already exists
		let spnId = '';
		for (let i = 0; i <= 1000000; i++) {
			const newSpnId = CreateSponsorId(9);
			const idExists = await Sponsor.findOne({ sponsorid: newSpnId.toLowerCase() });
			if (!idExists || idExists === null) {
				spnId = newSpnId.toLowerCase();
				break;
			}
		}

		try {
			//Hash password for storage
			const hashedPassword = await bcrypt.hash(password, 10);

			if (type === 'private') {
				newSpn = new Sponsor({
					type,
					sponsorid: spnId,
					companyname: companyname,
					fname: fname,
					lname: lname,
					email: email,
					phone: phone,
				});
			} else {
				newSpn = new Sponsor({
					type,
					sponsorid: spnId,
					companyname: companyname,
					fname,
					lname,
					email,
					phone,
					phoneext,
					website,
					legalname,
					eid,
					industry,
					numemps,
				});
			}
			const spn = await newSpn.save();
			const newSpnObjId = spn._id;

			if (type === 'private') {
				await new Sponsoruser({
					fname,
					lname,
					email,
					username,
					password: hashedPassword,
					phone,
					verifycode,
					sponsorid: spnId,
					sponsorObjId: newSpnObjId,
				}).save();
			} else {
				const newSpnLoc = new Sponsorlocation({
					name: 'Headquarters',
					address: add1,
					address2: add2,
					city,
					state,
					zip,
					phone,
					latitude,
					longitude,
					sponsorObjId: newSpnObjId,
				});
				const loc = await newSpnLoc.save();
				const newLocId = loc._id;

				await new Sponsoruser({
					fname,
					lname,
					email,
					username,
					password: hashedPassword,
					phone,
					verifycode,
					sponsorid: spnId,
					sponsorlocationObjId: newLocId,
					sponsorObjId: newSpnObjId,
				}).save();
			}

			return NextResponse.json({ status: 200 });
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
