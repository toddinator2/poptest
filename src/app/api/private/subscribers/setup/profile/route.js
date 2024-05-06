import { NextResponse } from 'next/server';
import { geocode, RequestType } from 'react-geocode';
import connect from '@/utils/dbConnect';
import Patient from '@/models/patient';
import Sponsor from '@/models/sponsor';

export const PUT = async (req) => {
	const gglKey = process.env.MAPS_KEY;
	await connect();
	const body = await req.json();
	const { _id, address, address2, city, state, zip, dob, sex, s3xId, photo } = body;
	let latitude;
	let longitude;

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
			.catch((error) => {
				console.error(error);
			});
	}

	//Get sponsor id if s3xID was given
	if (s3xId) {
		//set tmpArr to current patient sponsor array
		const pt = await Patient.findById(_id);
		if (pt) {
			let tmpArr = pt.sponsorObjId;
			const spn = await Sponsor.findOne({ sponsorid: s3xId });
			if (spn) {
				const spnId = spn._id;
				tmpArr.push(spnId);
			}
			await Patient.findByIdAndUpdate(_id, { sponsorObjId: tmpArr }, { new: true });
		}
	}

	//update setup progress for profile
	const pt = await Patient.findById(_id);
	if (pt.setupprogress !== undefined) {
		let tmpArr = pt.setupprogress;
		tmpArr.push('profile');
		await Patient.findByIdAndUpdate(_id, { setupprogress: tmpArr }, { new: true });
	} else {
		let tmpArr = [];
		tmpArr.push('profile');
		await Patient.findByIdAndUpdate(_id, { setupprogress: tmpArr }, { new: true });
	}

	//update the rest of the fields
	try {
		await Patient.findByIdAndUpdate(_id, { dob, photo, address, address2, city, state, zip, sex, latitude, longitude }, { new: true });
		return NextResponse.json({ msg: 'Profile updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
