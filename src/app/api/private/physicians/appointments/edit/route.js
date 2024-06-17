import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Appointment from '@/models/appointment';
import Ofcuser from '@/models/ofcuser';
import Resource from '@/models/ofcresource';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const {
		_id,
		date,
		description,
		start,
		end,
		color,
		comment,
		reason,
		unixstart,
		unixend,
		rscsSelected,
		categoryObjId,
		serviceObjId,
		locationObjId,
		officeObjId,
	} = body;

	let paId = null;
	let paName = '';
	let prId = null;
	let prName = '';

	//set people who need to sign visit
	//get all users for this location
	const allUsers = await Ofcuser.find({ officeObjId: officeObjId });
	let tmpUsers = [];
	if (allUsers) {
		for (let i = 0; i < allUsers.length; i++) {
			const user = allUsers[i];
			for (let l = 0; l < user.locationObjId.length; l++) {
				const locId = user.locationObjId[l];
				if (locId === locationObjId) {
					tmpUsers.push(user);
					break;
				}
			}
		}
	}
	const users = tmpUsers;

	//get all resources for this location
	const allRscs = await Resource.find({ locationObjId: locationObjId });
	let tmpRscs = [];
	if (allRscs) {
		for (let i = 0; i < allRscs.length; i++) {
			const rsc = allRscs[i];
			tmpRscs.push(rsc);
		}
	}
	const resources = tmpRscs;

	for (let i = 0; i < rscsSelected.length; i++) {
		const rsc = rscsSelected[i];
		for (let r = 0; r < resources.length; r++) {
			const resource = resources[r];
			if (resource._id.toString() === rsc) {
				for (let u = 0; u < users.length; u++) {
					const user = users[u];
					if (user._id.toString() === resource.officeuserObjId.toString()) {
						if (user.permission === 'provider') {
							prId = user._id;
							prName = user.fname + ' ' + user.lname;
						} else if (user.permission === 'pa') {
							paId = user._id;
							paName = user.fname + ' ' + user.lname;
							if (!prId) {
								prId = user.supervisor;
								for (let s = 0; s < users.length; s++) {
									const prv = users[s];
									if (prv._id === prId) {
										prName = prv.fname + ' ' + prv.lname;
									}
								}
							}
						} else {
							if (!prId && i === rscsSelected.length - 1) {
								prId = user.supervisor;
								for (let s = 0; s < users.length; s++) {
									const prv = users[s];
									if (prv._id === prId) {
										prName = prv.fname + ' ' + prv.lname;
									}
								}
							}
						}
						break;
					}
				}
				break;
			}
		}
	}

	try {
		await Appointment.findByIdAndUpdate(
			_id,
			{
				date,
				description,
				start,
				end,
				color,
				comment,
				reason,
				unixstart,
				unixend,
				pasignreqId: paId,
				pasignreqname: paName,
				prsignreqId: prId,
				prsignreqname: prName,
				resource: rscsSelected,
				categoryObjId,
				serviceObjId,
			},
			{ new: true }
		);

		return NextResponse.json({ msg: 'Appointment updated successfully', status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
