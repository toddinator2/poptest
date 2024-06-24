import { NextResponse } from 'next/server';
import { geocode, RequestType } from 'react-geocode';
import connect from '@/utils/dbConnect';
import Subscriber from '@/models/subscriber';
import Subsetup from '@/models/subsetup';
import Sponsor from '@/models/sponsor';
import Spnlocation from '@/models/spnlocation';
import Relsubspn from '@/models/relsubspn';

export const PUT = async (req) => {
	const gglKey = process.env.MAPS_KEY;
	await connect();
	const body = await req.json();
	const { _id, address, address2, city, state, zip, sex, spns3xId, photo } = body;
	let latitude;
	let longitude;

	try {
		//Set latitude and longitude
		if (address && city && state && zip) {
			const convertAddress = `${address}, ${city}, ${state}, ${zip}`;
			await geocode(RequestType.ADDRESS, convertAddress, {
				key: gglKey,
				language: 'en',
				region: 'us',
			})
				.then((response) => {
					latitude = response.results[0].geometry.location.lat.toString();
					longitude = response.results[0].geometry.location.lng.toString();
				})
				.catch((err) => {
					console.log(err);
				});
		}

		//Get sponsor id and sponsor location id if spns3xID was given
		if (spns3xId) {
			//get sponsor id from sn3xid
			const spn = await Sponsor.findOne({ spns3xid: spns3xId });
			if (spn) {
				const spnId = spn._id;
				//check if sponsor/subscriber relation already exists
				const rel = await Relsubspn.findOne({ subObjId: _id, spnObjId: spnId });
				if (!rel || rel === null) {
					//check and see how many locations sponsor has. If only one, include it in the relation table
					const spnLocs = await Spnlocation.find({ spnObjId: spnId });
					if (spnLocs.length === 1) {
						const locId = spnLocs[0]._id;
						await new Relsubspn({
							subObjId: _id,
							spnObjId: spnId,
							spnlocObjId: locId,
						}).save();
					} else {
						await new Relsubspn({
							subObjId: _id,
							spnObjId: spnId,
						}).save();
					}
				}
			}
		}

		//update the subscriber
		await Subscriber.findByIdAndUpdate(_id, { photo, address, address2, city, state, zip, sex, latitude, longitude }, { new: true });

		//update setup progress for profile
		await Subsetup.findOneAndUpdate({ subObjId: _id }, { profile: true }, { new: true });
		return NextResponse.json({ msg: 'Profile updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
