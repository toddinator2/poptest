import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Polsigned from '@/models/polsigned';
import Ofcsetup from '@/models/ofcsetup';
import Office from '@/models/office';
import Spnsetup from '@/models/spnsetup';
import Sponsor from '@/models/sponsor';
import Subsetup from '@/models/subsetup';
import Subscriber from '@/models/subscriber';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { agree, agreedate, agreesign, signertype, requesttype, signerObjId, requestObjId, policyObjId, setup, sufld, suObjId, sufin } = body;

	//set data to add to signed
	const dataObj = new Polsigned({
		agree,
		agreedate,
		agreesign,
		signertype,
		requesttype,
		signerObjId,
		requestObjId,
		policyObjId,
	});

	try {
		const signed = await dataObj.save();
		const signedId = signed._id;

		if (signedId) {
			//handle all setup functionality if for a setup
			if (setup === 'phy') {
				await Ofcsetup.findOneAndUpdate({ ofcObjId: suObjId }, { [sufld]: true }, { new: true });
				if (sufin) {
					await Office.findByIdAndUpdate(suObjId, { setupcomplete: true }, { new: true });
					return NextResponse.json({ msg: 'Thank You: Quick Start is now complete!', status: 200 });
				}
			}
			if (setup === 'spn') {
				await Spnsetup.findOneAndUpdate({ spnObjId: suObjId }, { [sufld]: true }, { new: true });
				if (sufin) {
					await Sponsor.findByIdAndUpdate(suObjId, { setupcomplete: true }, { new: true });
					return NextResponse.json({ msg: 'Thank You: Account Setup is now complete!', status: 200 });
				}
			}
			if (setup === 'sub') {
				await Subsetup.findOneAndUpdate({ subObjId: suObjId }, { [sufld]: true }, { new: true });
				if (sufin) {
					await Subscriber.findByIdAndUpdate(suObjId, { setupcomplete: true }, { new: true });
					return NextResponse.json({ msg: 'Thank You: Account Setup is now complete!', status: 200 });
				}
			}

			return NextResponse.json({ msg: 'Agreement signed successfully', status: 200 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
