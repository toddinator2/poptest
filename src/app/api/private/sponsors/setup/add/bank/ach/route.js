import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Sponsorbankinfo from '@/models/sponsorbankinfo';
import Sponsor from '@/models/sponsor';
import Sponsorsetup from '@/models/sponsorsetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { routingnum, accountnum, spnid } = body;

	const achObj = new Sponsorbankinfo({
		routingnum: routingnum,
		accountnum: accountnum,
		sponsorObjId: spnid,
	});

	try {
		await achObj.save();
		await Sponsor.findByIdAndUpdate(spnid, { setupcomplete: true }, { new: true });
		await Sponsorsetup.findOneAndDelete({ sponsorObjId: spnid });
		return NextResponse.json({ msg: 'Thank You: Account Setup is now complete!', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
