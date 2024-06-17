import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Social from '@/models/social';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		alc,
		alccur,
		alcquit,
		coffee,
		tea,
		soda,
		tob,
		tobday,
		tobweek,
		tobquit,
		thc,
		thcday,
		thcweek,
		thcmonth,
		thcquit,
		hd,
		hdtypes,
		hdday,
		hdweek,
		hdmonth,
		hdquit,
		subObjId,
	} = body;

	try {
		const newSoc = await new Social({
			alc,
			alccur,
			alcquit,
			coffee,
			tea,
			soda,
			tob,
			tobday,
			tobweek,
			tobquit,
			thc,
			thcday,
			thcweek,
			thcmonth,
			thcquit,
			hd,
			hdtypes,
			hdday,
			hdweek,
			hdmonth,
			hdquit,
			subObjId,
		}).save();
		const newSocId = newSoc._id;

		if (newSocId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { social: true }, { new: true });
			return NextResponse.json({ msg: 'Social History submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Social History Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
