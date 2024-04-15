import { NextResponse } from 'next/server';
import { CreateOfficeId } from '@/components/global/functions/PageFunctions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Preregphys from '@/models/preregphys';
import Office from '@/models/office';
import Officelocation from '@/models/officelocation';
import Officeuser from '@/models/officeuser';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { verifycode, username, password, token } = body;
	let lwrUname = '';
	let tmpLocArr = [];

	if (username) {
		lwrUname = username.toLowerCase();
	}

	if (token === authToken) {
		try {
			//Check if verify code exists
			const codeExists = await Preregphys.findOne({ verifycode: verifycode });
			if (!codeExists || codeExists === null) {
				return NextResponse.json({ status: 400 });
			}

			//Check if username already exists
			const userExists = await Officeuser.findOne({ username: lwrUname });
			if (userExists) {
				return NextResponse.json({ status: 401 });
			}

			//Hash password for storage
			const hashedPassword = await bcrypt.hash(password, 10);

			//Create office id to create office and move physician to users table
			let ofcId = '';
			for (let i = 0; i <= 1000000; i++) {
				const newOfcId = CreateOfficeId(6);
				const idExists = await Office.findOne({ officeid: newOfcId.toLowerCase() });
				if (!idExists || idExists === null) {
					ofcId = newOfcId.toLowerCase();
					break;
				}
			}

			const physician = await Preregphys.findOne({ verifycode: verifycode });

			//Create a new office
			const newOffice = new Office({
				officeid: ofcId,
			});
			const ofc = await newOffice.save();
			const newOfcId = ofc._id;

			//Create a new location
			const newLoc = new Officelocation({
				name: 'Change My Name',
				officeObjId: newOfcId,
			});
			const loc = await newLoc.save();
			const newLocId = loc._id;
			tmpLocArr.push(newLocId);

			//Move physician from pre-registration to users
			await new Officeuser({
				fname: physician.fname,
				lname: physician.lname,
				email: physician.email,
				username: lwrUname,
				password: hashedPassword,
				phone: physician.phone,
				permission: 'provider',
				role: 'admin',
				license: physician.license,
				npi: physician.npi,
				specialty: physician.specialty,
				emailconfirmed: physician.emailconfirmed,
				officeid: ofcId,
				locationObjId: tmpLocArr,
				officeObjId: newOfcId,
			}).save();

			await Preregphys.findOneAndDelete({ verifycode: verifycode });

			return NextResponse.json({ status: 200 });
		} catch (error) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
