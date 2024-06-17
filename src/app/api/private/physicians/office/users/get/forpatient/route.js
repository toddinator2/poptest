import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Ofcuser from '@/models/ofcuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcObjId = searchParams.get('ofcid');
	const title = searchParams.get('title');
	let ofcName = '';

	try {
		const ofcData = await Office.findById(ofcObjId);
		if (ofcData) {
			ofcName = ofcData.name;
		}

		const allData = await Ofcuser.findOne({ ofcObjId: ofcObjId, title: title });
		if (allData) {
			const userObj = {
				fname: allData.fname,
				lname: allData.lname,
				photo: allData.photo,
				specialty: allData.specialty,
				ofcName: ofcName,
			};

			return NextResponse.json({ user: userObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physician Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
