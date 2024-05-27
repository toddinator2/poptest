import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Officeuser from '@/models/officeuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('id');
	let ofcName = '';

	try {
		const phy = await Officeuser.findById(_id);
		if (phy) {
			//get office name
			const ofc = await Office.findById(phy.officeObjId);
			if (ofc) {
				ofcName = ofc.name;
			}

			const phyObj = {
				photo: phy.photo,
				title: phy.title,
				specialty: phy.specialty,
				ofcName: ofcName,
			};

			return NextResponse.json({ phy: phyObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physician Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
