import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Ofcbank from '@/models/ofcbank';
import Office from '@/models/office';
import Ofcsetup from '@/models/ofcsetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { routingnum, accountnum, ofcid } = body;

	const achObj = new Ofcbank({
		routingnum: routingnum,
		accountnum: accountnum,
		ofcObjId: ofcid,
	});

	try {
		await achObj.save();
		await Office.findByIdAndUpdate(ofcid, { setupcomplete: true }, { new: true });
		await Ofcsetup.findOneAndDelete({ ofcObjId: ofcid });
		return NextResponse.json({ msg: 'Thank You: Quick Start is now complete!', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
