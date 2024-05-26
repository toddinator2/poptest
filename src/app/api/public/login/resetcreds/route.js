import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsoruser from '@/models/sponsoruser';
import Officeuser from '@/models/officeuser';
import S3xuser from '@/models/s3xuser';

export const PUT = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { type, resetcode, username, password, token } = body;
	let lwrUname = '';

	if (username) {
		lwrUname = username.toLowerCase();
	}

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(password, 10);

	if (token === authToken) {
		try {
			if (type === 'patient') {
				const chkUname = await Patient.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await Patient.findOne({ resetcode: resetcode });
					if (user) {
						await Patient.findOneAndUpdate(
							{ resetcode: resetcode },
							{
								username: lwrUname,
								password: hashedPassword,
								resetcreds: false,
								resetcode: '',
							},
							{ new: true }
						);
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 401 });
					}
				}
			}
			if (type === 'sponsor') {
				const chkUname = await Sponsoruser.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await Sponsoruser.findOne({ resetcode: resetcode });
					if (user) {
						await Sponsoruser.findOneAndUpdate(
							{ resetcode: resetcode },
							{
								username: lwrUname,
								password: hashedPassword,
								resetcreds: false,
								resetcode: '',
							},
							{ new: true }
						);
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 401 });
					}
				}
			}
			if (type === 'physician') {
				const chkUname = await Officeuser.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await Officeuser.findOne({ resetcode: resetcode });
					if (user) {
						await Officeuser.findOneAndUpdate(
							{ resetcode: resetcode },
							{
								username: lwrUname,
								password: hashedPassword,
								resetcreds: false,
								resetcode: '',
							},
							{ new: true }
						);
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 401 });
					}
				}
			}
			if (type === 's3x') {
				const chkUname = await S3xuser.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await S3xuser.findOne({ resetcode: resetcode });
					if (user) {
						await S3xuser.findOneAndUpdate(
							{ resetcode: resetcode },
							{
								username: lwrUname,
								password: hashedPassword,
								resetcreds: false,
								resetcode: '',
							},
							{ new: true }
						);
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 401 });
					}
				}
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
