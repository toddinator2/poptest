import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Spnbank from '@/models/spnbank';
import Sponsor from '@/models/sponsor';
import Spnsetup from '@/models/spnsetup';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { name, ccnum, ccexpmo, ccexpyr, cvv, cczip, spnid } = body;

	const bankObj = new Spnbank({
		name: name,
		ccnum: ccnum,
		ccexpmo: ccexpmo,
		ccexpyr: ccexpyr,
		cvv: cvv,
		cczip: cczip,
		spnObjId: spnid,
	});

	try {
		await bankObj.save();
		await Sponsor.findByIdAndUpdate(spnid, { setupcomplete: true }, { new: true });
		await Spnsetup.findOneAndDelete({ spnObjId: spnid });
		return NextResponse.json({ msg: 'Thank You: Account Setup is now complete!', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
