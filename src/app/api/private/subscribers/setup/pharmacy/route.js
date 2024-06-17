import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Pharmacy from '@/models/pharmacy';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { lclpharm, lclpharmphone, lclpharmfax, lclpharmaddress, onlpharm, onlpharmphone, onlpharmfax, onlpharmaddress, subObjId } = body;

	try {
		const newPharm = await new Pharmacy({
			lclpharm,
			lclpharmphone,
			lclpharmfax,
			lclpharmaddress,
			onlpharm,
			onlpharmphone,
			onlpharmfax,
			onlpharmaddress,
			subObjId,
		}).save();
		const newPharmId = newPharm._id;

		if (newPharmId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { pharmacy: true }, { new: true });
			return NextResponse.json({ msg: 'Pharmacy submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Pharmacy Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
