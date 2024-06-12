import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officebankinfo from '@/models/officebankinfo';
import Office from '@/models/office';
import Officesetup from '@/models/officesetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { routingnum, accountnum, ofcid } = body;

	const achObj = new Officebankinfo({
		routingnum: routingnum,
		accountnum: accountnum,
		officeObjId: ofcid,
	});

	try {
		await achObj.save();
		await Office.findByIdAndUpdate(ofcid, { setupcomplete: true }, { new: true });
		await Officesetup.findOneAndDelete({ officeObjId: ofcid });
		return NextResponse.json({ msg: 'Thank You: Quick Start is now complete!', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
