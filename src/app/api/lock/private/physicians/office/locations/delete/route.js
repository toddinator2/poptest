import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Officelocation from '@/models/officelocation';
import Appointment from '@/models/appointment';
import Officeuser from '@/models/officeuser';
import Resource from '@/models/resource';
import Chatuser from '@/models/chatuser';
import Taskcategory from '@/models/taskcategory';
import Taskitem from '@/models/taskitem';
import Taskdaily from '@/models/taskdaily';

export const DELETE = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const locid = searchParams.get('locid');
	const ofcid = searchParams.get('ofcid');

	try {
		//Delete Appointments
		await Appointment.deleteMany({ locationObjId: locid });

		//Delete Users
		const users = await Officeuser.find({ officeObjId: ofcid });
		if (users) {
			for (let i = 0; i < users.length; i++) {
				const user = users[i];
				let arrLocs = user.locationObjId;
				if (arrLocs.length <= 1) {
					if (arrLocs[0] === locid) {
						//Delete this user
						await Officeuser.findByIdAndDelete(user._id);
					}
				} else {
					//Just remove the location from user location array
					await arrLocs.filter((item) => item !== locid);
					await Officeuser.findByIdAndUpdate(user._id, { locationObjId: arrLocs }, { new: true });
				}
			}
		}

		//Delete Resources
		await Resource.deleteMany({ locationObjId: locid });

		//Delete Chat Users
		await Chatuser.deleteMany({ locationObjId: locid });

		//Delete Task Categories
		await Taskcategory.deleteMany({ locationObjId: locid });

		//Delete Task Items
		await Taskitem.deleteMany({ locationObjId: locid });

		//Delete Daily Tasks
		await Taskdaily.deleteMany({ locationObjId: locid });

		const loc = await Officelocation.findByIdAndDelete(locid);
		if (loc) {
			return NextResponse.json({ msg: 'Location deleted successfully', status: 200 });
		} else {
			return NextResponse.json({ msg: 'Location not found', status: 400 });
		}
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
