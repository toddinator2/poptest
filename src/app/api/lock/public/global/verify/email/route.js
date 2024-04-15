import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsoruser from '@/models/sponsoruser';
import Preregphys from '@/models/preregphys';
import Officeuser from '@/models/officeuser';
import S3xuser from '@/models/s3xuser';

export const PUT = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { type, verifycode, token } = body;

	if (token === authToken) {
		try {
			if (type === 'patient') {
				//Check if sponsor was created and update
				const sponsor = await Sponsoruser.findOne({ verifycode: verifycode });
				if (sponsor) {
					await Sponsoruser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
				}

				//Update patient
				const patient = await Patient.findOne({ verifycode: verifycode });
				if (patient) {
					await Patient.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 'sponsor') {
				const user = await Sponsoruser.findOne({ verifycode: verifycode });
				if (user) {
					await Sponsoruser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 'physicianprereg') {
				const physician = await Preregphys.findOne({ verifycode: verifycode });
				if (physician) {
					await Preregphys.findOneAndUpdate({ verifycode: verifycode }, { emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				}
			}
			if (type === 'physician') {
				const user = await Officeuser.findOne({ verifycode: verifycode });
				if (user) {
					await Officeuser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 's3x') {
				const user = await S3xuser.findOne({ verifycode: verifycode });
				if (user) {
					await S3xuser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
