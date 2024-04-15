import { NextResponse } from 'next/server';
import connect from '@/utils/dbConnect';
import Office from '@/models/office';
import Patient from '@/models/patient';
import Officelocation from '@/models/officelocation';
import Officeuser from '@/models/officeuser';
import Resource from '@/models/resource';
import Category from '@/models/category';
import Service from '@/models/service';
import Appointment from '@/models/appointment';

export const GET = async (request) => {
	await connect();
	const { searchParams } = new URL(request.url);
	const ofcid = searchParams.get('ofcid');
	const offset = searchParams.get('offset');

	let arrPtSch = [];
	let arrLocs = [];
	let arrLocOpts = [];
	let arrUsers = [];
	let arrRscOpts = [];
	let arrRscs = [];
	let arrCats = [];
	let arrSvcs = [];
	let arrAppts = [];
	let arrApptsTdy = [];

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PATIENT SEARCH
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const office = await Office.findById(ofcid);
	if (office) {
		let arrTmpSch = [];
		const ofcPtArr = office.patients;
		for (let i = 0; i < ofcPtArr.length; i++) {
			const pt = await Patient.findById(ofcPtArr[i]);
			if (pt) {
				const _id = pt._id;
				const fname = pt.fname;
				const lname = pt.lname;
				const dob = pt.dob;
				const phone = pt.mphone;
				const photo = pt.photo;
				arrTmpSch.push({ _id, fname, lname, dob, phone, photo });
			}
		}

		if (arrTmpSch.length !== 0) {
			arrPtSch = arrTmpSch;
		}
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// OFFICE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//locations
	const locs = await Officelocation.find({ officeObjId: ofcid, deleteme: false }).sort({ name: 1 });
	if (locs.length !== 0) {
		//set locations array to all locations
		arrLocs = locs;

		//set location options array for search elements
		let tmpArr = [];
		for (let i = 0; i < locs.length; i++) {
			const loc = locs[i];
			if (loc) {
				tmpArr.push({ label: loc.name, value: loc._id });
			}
		}
		arrLocOpts = tmpArr;
	}
	//users and resource options
	const users = await Officeuser.find({ officeObjId: ofcid, active: true, paid: true }).sort({ fname: 1 });
	if (users.length !== 0) {
		//set office users array with all user data
		arrUsers = users;

		//set resource options array for search elements
		let tmpArr = [];
		for (let i = 0; i < users.length; i++) {
			const user = users[i];
			if (user) {
				tmpArr.push({ label: user.fname + ' ' + user.lname, value: user._id });
			}
		}
		arrRscOpts = tmpArr;
	}
	//resources
	const rscs = await Resource.find({ officeObjId: ofcid }).sort({ name: 1 });
	if (rscs.length !== 0) {
		arrRscs = rscs;
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// ECOMMERCE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//categories
	const cats = await Category.find({ officeObjId: ofcid }).sort({ name: 1 });
	if (cats.length !== 0) {
		arrCats = cats;
	}
	//services
	const svcs = await Service.find({ officeObjId: ofcid }).sort({ catObjId: 1, name: 1 });
	if (svcs.length !== 0) {
		arrSvcs = svcs;
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// APPOINTMENTS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	let today = new Date().toLocaleDateString();
	let tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);
	const unixToday = parseInt((new Date(today).getTime() / 1000 + parseInt(offset)).toFixed(0));
	const unixTomorrow = parseInt((new Date(tomorrow).getTime() / 1000 + parseInt(offset)).toFixed(0));
	//all
	const appts = await Appointment.find({ officeObjId: ofcid, unixstart: { $gte: unixToday - 604800 } }).sort({ unixdate: 1 });
	if (appts.length !== 0) {
		arrAppts = appts;
	}
	//today's
	const todays = await Appointment.find({ officeObjId: ofcid, unixstart: { $gt: unixToday, $lt: unixTomorrow } }).sort({ unixdate: 1 });
	if (todays.length !== 0) {
		arrApptsTdy = todays;
	}

	return NextResponse.json({
		arrPtSch: arrPtSch,
		arrLocs: arrLocs,
		arrLocOpts: arrLocOpts,
		arrUsers: arrUsers,
		arrRscs: arrRscs,
		arrRscOpts: arrRscOpts,
		arrCats: arrCats,
		arrSvcs: arrSvcs,
		arrAppts: arrAppts,
		arrApptsTdy: arrApptsTdy,
		status: 200,
	});
};
