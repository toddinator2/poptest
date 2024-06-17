import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';
import Office from '@/models/office';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { s3xid, ofcid } = body;
	let lwrS3xid = '';

	if (s3xid) {
		lwrS3xid = s3xid.toLowerCase();
	}

	try {
		const curPt = await Subscriber.findOne({ subs3xid: lwrS3xid });
		const curOfc = await Office.findById(ofcid);
		let curOfcPts = curOfc.patients;
		let curPtOfcs = curPt.offices;

		//make sure patient doesn't already exist in this office
		for (let i = 0; i < curOfc.patients.length; i++) {
			const ptId = curOfc.patients[i];
			if (ptId.toString() === curPt._id.toString()) {
				return NextResponse.json({ msg: `${curPt.fname} is already a patient`, status: 400 });
			}
		}

		curOfcPts.push(curPt._id);
		curPtOfcs.push(curOfc._id);

		await Subscriber.findByIdAndUpdate(curPt._id, { offices: curPtOfcs }, { new: true });
		await Office.findByIdAndUpdate(ofcid, { patients: curOfcPts }, { new: true });

		return NextResponse.json({ msg: 'Patient Added Successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
