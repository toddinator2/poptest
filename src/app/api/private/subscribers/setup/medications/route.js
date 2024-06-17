import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Subsumedhist from '@/models/subsumedhist';
import Medication from '@/models/medication';

export const POST = async (req) => {
	await connect();
	const body = await req.json();
	const { meds, subObjId } = body;

	try {
		for (let i = 0; i < meds.length; i++) {
			const med = meds[i];
			if (med.type === 'pre') {
				await new Medication({
					type: med.type,
					name: med.name,
					dosage: med.dosage,
					frequency: med.frequency,
					subObjId,
				}).save();
			} else {
				await new Medication({
					type: med.type,
					name: med.name,
					reason: med.reason,
					subObjId,
				}).save();
			}
		}

		await Subsumedhist.findOneAndUpdate({ subObjId: subObjId }, { medications: true }, { new: true });
		return NextResponse.json({ msg: 'Medications submitted successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
