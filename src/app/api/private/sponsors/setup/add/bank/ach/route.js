import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnbank from '@/models/spnbank';
import Sponsor from '@/models/sponsor';
import Spnsetup from '@/models/spnsetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { routingnum, accountnum, spnid } = body;

	const achObj = new Spnbank({
		routingnum: routingnum,
		accountnum: accountnum,
		spnObjId: spnid,
	});

	try {
		await achObj.save();
		await Sponsor.findByIdAndUpdate(spnid, { setupcomplete: true }, { new: true });
		await Spnsetup.findOneAndDelete({ spnObjId: spnid });
		return NextResponse.json({ msg: 'Thank You: Account Setup is now complete!', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
