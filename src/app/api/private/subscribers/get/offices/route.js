import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Relphysub from '@/models/relphysub';
import Ofclocation from '@/models/ofclocation';
import Office from '@/models/office';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const subId = searchParams.get('subid');
	let tmpArr = [];

	try {
		const ofc = await Relphysub.find({ subObjId: subId });
		if (ofc.length !== 0 && ofc !== null) {
			for (let i = 0; i < ofc.length; i++) {
				let locName = '';
				let ofcName = '';
				const data = ofc[i];
				const relId = data._id;
				const ofcId = data.ofcObjId;
				const locId = data.ofclocObjId;
				const phyId = data.ofcuserObjId;
				const loc = await Ofclocation.findById(locId);
				if (loc) {
					locName = loc.name;
				}
				const ofcInfo = await Office.findById(ofcId);
				if (ofcInfo) {
					ofcName = ofcInfo.dba;
				}
				const ofcObj = {
					relObjId: relId,
					ofcObjId: ofcId,
					locObjId: locId,
					phyObjId: phyId,
					locName: locName,
					ofcName: ofcName,
				};
				tmpArr.push(ofcObj);
			}

			return NextResponse.json({ ofcs: tmpArr, status: 200 });
		} else {
			return NextResponse.json({ status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
