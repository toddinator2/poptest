import { NextResponse } from 'next/server';
import { CreateOfficeId, CreateS3xId, CreateSponsorId, RandomStringMake } from '@/components/global/functions/Functions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Preregpat from '@/models/preregpat';
import Patient from '@/models/patient';
import Preregspn from '@/models/preregspn';
import Sponsor from '@/models/sponsor';
import Spnlocation from '@/models/spnlocation';
import Sponsoruser from '@/models/sponsoruser';
import Sponsorsetup from '@/models/sponsorsetup';
import Sponsorbankinfo from '@/models/sponsorbankinfo';
import Policyspn from '@/models/policyspn';
import Preregphys from '@/models/preregphys';
import Office from '@/models/office';
import Officelocation from '@/models/officelocation';
import Officesetup from '@/models/officesetup';
import Officeuser from '@/models/officeuser';
import Owner from '@/models/owner';
import Policyphy from '@/models/policyphy';
import S3xuser from '@/models/s3xuser';

const createSponsor = async (props) => {
	let newSpn;
	let newSpnUser;
	let spnId = '';
	//Create a Sponsor ID and check if already exists
	for (let i = 0; i <= 1000000; i++) {
		const newSpnId = CreateSponsorId(9);
		const idExists = await Sponsor.findOne({ sponsorid: newSpnId.toLowerCase() });
		if (!idExists || idExists === null) {
			spnId = newSpnId.toLowerCase();
			break;
		}
	}

	//Hash password for storage
	const hashedPassword = await bcrypt.hash(props.pword, 10);

	newSpn = await new Sponsor({
		type: 'Private',
		sponsorid: spnId,
		company: props.fname + ' ' + props.lname,
		fname: props.fname,
		lname: props.lname,
		email: props.email,
		phone: props.phone,
	});
	await newSpn.save();
	const newSpnId = newSpn._id;

	newSpnUser = new Sponsoruser({
		fname: props.fname,
		lname: props.lname,
		email: props.email,
		username: props.uname,
		password: hashedPassword,
		phone: props.phone,
		resetcreds: true,
		emailconfirmed: true,
		sponsorid: spnId,
		sponsorObjId: newSpnId,
	});
	await newSpnUser.save();

	return newSpnId;
};

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { type, verifycode, token } = body;

	if (token === authToken) {
		try {
			if (type === 'newpatient') {
				//patient was added from an office or sponsor, so went directly into patient table
				//just need to update the data in both patient and sponsoruser
				await Sponsoruser.findOneAndUpdate({ verifycode: verifycode }, { emailconfirmed: true, verifycode: '' }, { new: true });
				await Patient.findOneAndUpdate({ verifycode: verifycode }, { emailconfirmed: true, verifycode: '' }, { new: true });
				return NextResponse.json({ status: 200 });
			}
			if (type === 'patient') {
				//move from pre-registration to patients
				const pt = await Preregpat.findOne({ verifycode: verifycode });
				if (pt) {
					let spnId = '';
					let s3xId = '';
					let tmpArr = [];

					//create the personal sponsor account
					const props = {
						fname: pt.fname,
						lname: pt.lname,
						email: pt.email,
						phone: pt.phone,
						uname: pt.username,
						pword: pt.password,
					};
					const newSpn = await createSponsor(props);
					spnId = newSpn;
					tmpArr.push(spnId);

					//Hash password for storage
					const hashedPassword = await bcrypt.hash(pt.password, 10);

					//Create a Supernova3x ID and check if already exists
					for (let i = 0; i <= 1000000; i++) {
						const newS3xId = CreateS3xId(9);
						const idExists = await Patient.findOne({ s3xid: newS3xId.toLowerCase() });
						if (!idExists || idExists === null) {
							s3xId = newS3xId.toLowerCase();
							break;
						}
					}

					//Create a reset creds code
					const resetcode = RandomStringMake(32);

					const newPt = new Patient({
						fname: pt.fname,
						lname: pt.lname,
						dob: pt.dob,
						email: pt.email,
						username: pt.username,
						password: hashedPassword,
						mphone: pt.phone,
						s3xid: s3xId,
						resetcreds: true,
						resetcode: resetcode,
						emailconfirmed: true,
						sponsorObjId: tmpArr,
					});
					const svdPt = await newPt.save();
					const newPtId = svdPt._id;

					if (newPtId) {
						await Preregpat.findOneAndDelete({ verifycode: verifycode });
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 400 });
					}
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 'sponsor') {
				//move from pre-registration to sponsors and sponsorusers
				const preSpn = await Preregspn.findOne({ verifycode: verifycode });
				if (preSpn) {
					//sponsors first
					let newSpn;
					let newSpnUser;
					let newSpnLoc;
					let spnId = '';

					//Create a Sponsor ID and check if already exists
					for (let i = 0; i <= 1000000; i++) {
						const newSpnId = CreateSponsorId(9);
						const idExists = await Sponsor.findOne({ sponsorid: newSpnId.toLowerCase() });
						if (!idExists || idExists === null) {
							spnId = newSpnId.toLowerCase();
							break;
						}
					}

					//Hash password for storage
					const hashedPassword = await bcrypt.hash(preSpn.password, 10);

					//Create a reset creds code
					const resetcode = RandomStringMake(32);

					newSpn = new Sponsor({
						type: preSpn.type.toLowerCase(),
						legalname: preSpn.company,
						dba: preSpn.company,
						fname: preSpn.fname,
						lname: preSpn.lname,
						email: preSpn.email.toLowerCase(),
						phone: preSpn.phone,
						phoneext: preSpn.phoneext,
						website: preSpn.website,
						sponsorid: spnId,
					});
					const svdSpn = await newSpn.save();
					const newSpnId = svdSpn._id;

					if (newSpnId) {
						//create the first location
						newSpnLoc = new Spnlocation({
							name: 'Headquarters',
							sponsorObjId: newSpnId,
						});
						const svdLoc = await newSpnLoc.save();
						const newLocId = svdLoc._id;

						//create the setup table
						await new Sponsorsetup({
							sponsorObjId: newSpnId,
						}).save();

						//create bank info table
						await new Sponsorbankinfo({
							sponsorObjId: newSpnId,
						}).save();

						//save to sponsorusers
						newSpnUser = new Sponsoruser({
							fname: preSpn.fname,
							lname: preSpn.lname,
							email: preSpn.email.toLowerCase(),
							username: preSpn.username.toLowerCase(),
							password: hashedPassword,
							phone: preSpn.phone,
							phoneext: preSpn.phoneext,
							permission: 'sponsor',
							role: 'sponsor',
							resetcreds: true,
							resetcode: resetcode,
							verifycode: '',
							emailconfirmed: true,
							sponsorid: spnId,
							spnlocationObjId: newLocId,
							sponsorObjId: newSpnId,
						});
						const svdUser = await newSpnUser.save();
						const newUserId = svdUser._id;

						if (newUserId) {
							//create policy accept table
							await new Policyspn({
								sponsoruserObjId: newUserId,
								sponsorObjId: newSpnId,
							}).save();

							await Preregspn.findOneAndDelete({ verifycode: verifycode });
							return NextResponse.json({ status: 200 });
						} else {
							return NextResponse.json({ status: 400 });
						}
					} else {
						return NextResponse.json({ status: 400 });
					}
				} else {
					return NextResponse.json({ status: 500 });
				}
			}
			if (type === 'physician') {
				//move from pre-registration to offices, officelocations, officeusers, and create officesetup
				const prePhy = await Preregphys.findOne({ verifycode: verifycode });
				if (prePhy) {
					let ofcId = '';

					//create office ID
					for (let i = 0; i <= 1000000; i++) {
						const newOfcId = CreateOfficeId(9);
						const idExists = await Office.findOne({ officeid: newOfcId.toLowerCase() });
						if (!idExists || idExists === null) {
							ofcId = newOfcId.toLowerCase();
							break;
						}
					}

					//create new office
					const newOfc = new Office({
						legalname: 'Headquarters',
						dba: 'HQ',
						email: prePhy.email,
						phone: prePhy.phone,
						officeid: ofcId,
					});
					const svdOfc = await newOfc.save();
					const newOfcObjId = svdOfc._id;

					//create the initial owner
					await new Owner({
						fname: prePhy.fname,
						lname: prePhy.lname,
						email: prePhy.email,
						phone: prePhy.phone,
						officeObjId: newOfcObjId,
					}).save();

					//create new office location
					const newLoc = new Officelocation({
						name: 'Headquarters',
						state: prePhy.state,
						phone: prePhy.phone,
						officeObjId: newOfcObjId,
					});
					const svdLoc = await newLoc.save();
					const newLocObjId = svdLoc._id;

					//create new office user
					const newPhy = new Officeuser({
						fname: prePhy.fname,
						lname: prePhy.lname,
						email: prePhy.email,
						username: prePhy.username,
						password: prePhy.password,
						phone: prePhy.phone,
						permission: 'physician',
						role: 'admin',
						paid: false,
						license: prePhy.license,
						licensestate: prePhy.licensestate,
						npi: prePhy.npi,
						specialty: prePhy.specialty,
						resetcreds: false,
						emailconfirmed: true,
						officeid: ofcId,
						locationObjId: newLocObjId,
						officeObjId: newOfcObjId,
					});
					const svdPhy = await newPhy.save();
					const newPhyId = svdPhy._id;

					//create new office setup
					await new Officesetup({
						officeObjId: newOfcObjId,
					}).save();

					//create new office policy agreements
					await new Policyphy({
						officeuserObjId: newPhyId,
						officeObjId: newOfcObjId,
					}).save();

					if (newPhyId) {
						await Preregphys.findOneAndDelete({ verifycode: verifycode });
						return NextResponse.json({ status: 200 });
					}
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
			if (type === 's3x') {
				const user = await S3xuser.findOne({ verifycode: verifycode });
				if (user) {
					await S3xuser.findOneAndUpdate({ verifycode: verifycode }, { verifycode: '', emailconfirmed: true }, { new: true });
					return NextResponse.json({ status: 200 });
				} else {
					return NextResponse.json({ status: 400 });
				}
			}
		} catch (err) {
			return NextResponse.json({ status: 500 });
		}
	} else {
		return NextResponse.json({ status: 501 });
	}
};
