import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Sponsor from '@/models/sponsor';
import Sponsoruser from '@/models/sponsoruser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');
	let sucomplete = false;

	try {
		const spn = await Sponsoruser.findOne({ username: uname }).select('-username -password');
		if (spn) {
			//check if setup is complete
			const chkSetup = await Sponsor.findById(spn.sponsorObjId);
			if (chkSetup) {
				sucomplete = chkSetup.setupcomplete;
			}
			return NextResponse.json({ sponsor: spn, setupcomplete: sucomplete, status: 200 });
		} else {
			return NextResponse.json({ msg: 'User Not Found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
