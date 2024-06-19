import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Sponsor from '@/models/sponsor';
import Spnuser from '@/models/spnuser';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const uname = searchParams.get('uname');
	let lwrUname = '';
	let sucomplete = false;

	if (uname) {
		lwrUname = uname.toLowerCase();
	}

	try {
		const spn = await Spnuser.findOne({ username: lwrUname }).select('-username -password');
		if (spn) {
			//check if setup is complete
			const chkSetup = await Sponsor.findById(spn.spnObjId);
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
