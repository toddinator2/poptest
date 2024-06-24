import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Ofcuser from '@/models/ofcuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const _id = searchParams.get('phyid');
	let ofcName = '';

	try {
		const phy = await Ofcuser.findById(_id);
		if (phy) {
			//get office name
			const ofc = await Office.findById(phy.ofcObjId);
			if (ofc) {
				ofcName = ofc.dba;
			}

			const phyObj = {
				photo: phy.photo,
				title: phy.title,
				specialty: phy.specialty,
				ofcName: ofcName,
			};

			return NextResponse.json({ user: phyObj, status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physician Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
