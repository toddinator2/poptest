import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Fitness from '@/models/fitness';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const {
		days,
		time,
		where,
		when,
		bkg,
		bbg,
		car,
		cro,
		int,
		hit,
		hkg,
		pwr,
		run,
		spo,
		swm,
		wlk,
		goal,
		explan,
		alone,
		nuplan,
		tech,
		yoga,
		pil,
		learnmore,
		subObjId,
	} = body;

	try {
		const newRec = await new Fitness({
			days,
			time,
			where,
			when,
			bkg,
			bbg,
			car,
			cro,
			int,
			hit,
			hkg,
			pwr,
			run,
			spo,
			swm,
			wlk,
			goal,
			explan,
			alone,
			nuplan,
			tech,
			yoga,
			pil,
			learnmore,
			subObjId,
		}).save();
		const newRecId = newRec._id;

		if (newRecId) {
			await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { physicalfitness: true }, { new: true });
			return NextResponse.json({ msg: 'Physical Fitness submitted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Physical Fitness Error: Please try again', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
