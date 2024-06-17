import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';
import Spnuser from '@/models/spnuser';
import Ofcuser from '@/models/ofcuser';
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
			if (type === 'subscriber') {
				const chkUname = await Subscriber.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await Subscriber.findOne({ resetcode: resetcode });
					if (user) {
						await Subscriber.findOneAndUpdate(
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
				const chkUname = await Spnuser.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await Spnuser.findOne({ resetcode: resetcode });
					if (user) {
						await Spnuser.findOneAndUpdate(
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
				const chkUname = await Ofcuser.findOne({ username: lwrUname });
				if (chkUname) {
					return NextResponse.json({ status: 400 });
				} else {
					const user = await Ofcuser.findOne({ resetcode: resetcode });
					if (user) {
						await Ofcuser.findOneAndUpdate(
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
