import { NextResponse } from 'next/server';
import { RandomStringMake, cosineDistanceBetweenPoints } from '@/components/global/functions/Functions';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Office from '@/models/office';
import Officeuser from '@/models/officeuser';
import Officelocation from '@/models/officelocation';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const specialty = searchParams.get('spc');
	const miles = searchParams.get('mls');
	const userId = searchParams.get('userId');
	let ptLat = null;
	let ptLng = null;
	let locLat = null;
	let locLng = null;
	let ofcName = '';
	let tmpArr = [];

	try {
		//get user coordinates
		const pt = await Patient.findById(userId);
		if (pt) {
			ptLat = parseFloat(pt.latitude);
			ptLng = parseFloat(pt.longitude);
		}

		const physBySpc = await Officeuser.find({ specialty: specialty }).sort({ title: 1 });
		if (physBySpc) {
			for (let i = 0; i < physBySpc.length; i++) {
				const phy = physBySpc[i];
				const locArr = phy.locationObjId;
				for (let l = 0; l < locArr.length; l++) {
					const locId = locArr[l];
					const loc = await Officelocation.findById(locId);
					if (loc) {
						locLat = parseFloat(loc.latitude);
						locLng = parseFloat(loc.longitude);

						const distance = cosineDistanceBetweenPoints(ptLat, ptLng, locLat, locLng);
						if (distance <= parseInt(miles)) {
							//get office name
							const ofc = await Office.findById(loc.officeObjId);
							if (ofc) {
								ofcName = ofc.name;
							}

							//create a unique key for mapping
							const key = RandomStringMake(24);

							const dataObj = {
								key: key,
								photo: phy.photo,
								title: phy.title,
								locName: loc.name,
								ofcName: ofcName,
								phyId: phy._id,
								locId: locId,
							};
							tmpArr.push(dataObj);
						}
					}
				}
			}

			return NextResponse.json({ phys: tmpArr, status: 200 });
		} else {
			return NextResponse.json({ msg: 'No Physicians Found: Please change distance and try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
