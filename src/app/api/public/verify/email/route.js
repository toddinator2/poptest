import { NextResponse } from 'next/server';
import { CreateLocationId, CreateOfficeId, CreateS3xId, CreateSponsorId, RandomStringMake } from '@/components/global/functions/Functions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
/*** Subscriber ***/
import Subscriber from '@/models/subscriber';
import Subprereg from '@/models/subprereg';
import Subsetup from '@/models/subsetup';
import Subsumedhist from '@/models/subsumedhist';
/*** Sponsor ***/
import Sponsor from '@/models/sponsor';
import Spnprereg from '@/models/spnprereg';
import Spnlocation from '@/models/spnlocation';
import Spnuser from '@/models/spnuser';
import Spnsetup from '@/models/spnsetup';
/*** Office ***/
import Ofcprereg from '@/models/ofcprereg';
import Office from '@/models/office';
import Ofclocation from '@/models/ofclocation';
import Ofcsetup from '@/models/ofcsetup';
import Ofcuser from '@/models/ofcuser';
import Ofcowner from '@/models/ofcowner';
/*** S3X ***/
import S3xuser from '@/models/s3xuser';

export const POST = async (req) => {
	await connect();
	const authToken = process.env.AUTH_TOKEN;
	const reqData = await req.json();
	const body = reqData.data;
	const { type, verifycode, token } = body;

	if (token === authToken) {
		try {
			if (type === 'newsubscriber') {
				//patient was added from an office or sponsor, so went directly into patient table
				//just need to update the data
				await Subscriber.findOneAndUpdate({ verifycode: verifycode }, { emailconfirmed: true, verifycode: '' }, { new: true });
				return NextResponse.json({ status: 200 });
			}
			if (type === 'subscriber') {
				//move from pre-registration to patients
				const pt = await Subprereg.findOne({ verifycode: verifycode });
				if (pt) {
					let s3xId = '';

					//Hash password for storage
					const hashedPassword = await bcrypt.hash(pt.password, 10);

					//Create a Supernova3x ID and check if already exists
					for (let i = 0; i <= 1000000; i++) {
						const newS3xId = CreateS3xId(9);
						const idExists = await Subscriber.findOne({ subs3xid: newS3xId.toLowerCase() });
						if (!idExists || idExists === null) {
							s3xId = newS3xId.toLowerCase();
							break;
						}
					}

					//Create a reset creds code
					const resetcode = RandomStringMake(32);

					const newPt = new Subscriber({
						fname: pt.fname,
						lname: pt.lname,
						dob: pt.dob,
						email: pt.email,
						username: pt.username,
						password: hashedPassword,
						phone: pt.phone,
						resetcreds: true,
						resetcode: resetcode,
						emailconfirmed: true,
						subs3xid: s3xId,
					});
					const svdPt = await newPt.save();
					const newPtId = svdPt._id;

					if (newPtId) {
						//create setup
						await new Subsetup({ subObjId: newPtId }).save();
						//create setup medical history
						await new Subsumedhist({ subObjId: newPtId }).save();
						//delete the pre-registration data
						await Subprereg.findOneAndDelete({ verifycode: verifycode });
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
				const preSpn = await Spnprereg.findOne({ verifycode: verifycode });
				if (preSpn) {
					//sponsors first
					let newSpn;
					let newSpnUser;
					let newSpnLoc;
					let spnId = '';

					//Create a Sponsor ID and check if already exists
					for (let i = 0; i <= 1000000; i++) {
						const newSpnId = CreateSponsorId(9);
						const idExists = await Sponsor.findOne({ spns3xid: newSpnId.toLowerCase() });
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
						spns3xid: spnId,
					});
					const svdSpn = await newSpn.save();
					const newSpnId = svdSpn._id;

					if (newSpnId) {
						//create the initial location
						if (preSpn.type.toLowerCase() === 'private') {
							newSpnLoc = new Spnlocation({
								name: preSpn.company,
								phone: preSpn.phone,
								spnObjId: newSpnId,
							});
						} else {
							newSpnLoc = new Spnlocation({
								name: 'Headquarters',
								phone: preSpn.phone,
								spnObjId: newSpnId,
							});
						}
						const svdLoc = await newSpnLoc.save();
						const newLocId = svdLoc._id;

						//create the setup table
						await new Spnsetup({
							type: preSpn.type.toLowerCase(),
							spnObjId: newSpnId,
						}).save();

						//save to sponsor users
						if (preSpn.type.toLowerCase() === 'private') {
							await new Spnuser({
								fname: preSpn.fname,
								lname: preSpn.lname,
								email: preSpn.email.toLowerCase(),
								username: preSpn.username.toLowerCase(),
								password: hashedPassword,
								phone: preSpn.phone,
								permission: 'sponsor',
								role: 'financial',
								resetcreds: true,
								resetcode: resetcode,
								verifycode: '',
								emailconfirmed: true,
								spns3xid: spnId,
								spnlocObjId: newLocId,
								spnObjId: newSpnId,
							}).save();
						} else {
							await new Spnuser({
								fname: preSpn.fname,
								lname: preSpn.lname,
								email: preSpn.email.toLowerCase(),
								username: preSpn.username.toLowerCase(),
								password: hashedPassword,
								phone: preSpn.phone,
								phoneext: preSpn.phoneext,
								permission: 'sponsor',
								role: 'admin',
								resetcreds: true,
								resetcode: resetcode,
								verifycode: '',
								emailconfirmed: true,
								spns3xid: spnId,
								spnlocObjId: newLocId,
								spnObjId: newSpnId,
							}).save();
						}

						await Spnprereg.findOneAndDelete({ verifycode: verifycode });
						return NextResponse.json({ status: 200 });
					} else {
						return NextResponse.json({ status: 400 });
					}
				} else {
					return NextResponse.json({ status: 500 });
				}
			}
			if (type === 'physician') {
				//move from pre-registration to offices, officelocations, officeusers, and create officesetup
				const prePhy = await Ofcprereg.findOne({ verifycode: verifycode });
				if (prePhy) {
					let ofcId = '';
					let locId = '';

					//create office ID
					for (let i = 0; i <= 1000000; i++) {
						const newOfcId = CreateOfficeId(9);
						const idExists = await Office.findOne({ ofcs3xid: newOfcId.toLowerCase() });
						if (!idExists || idExists === null) {
							ofcId = newOfcId.toLowerCase();
							break;
						}
					}

					//create location ID
					for (let i = 0; i <= 1000000; i++) {
						const newLocId = CreateLocationId(9);
						const idExists = await Ofclocation.findOne({ locs3xid: newLocId.toLowerCase() });
						if (!idExists || idExists === null) {
							locId = newLocId.toLowerCase();
							break;
						}
					}

					//create new office
					const newOfc = new Office({
						legalname: 'Headquarters',
						dba: 'HQ',
						email: prePhy.email,
						phone: prePhy.phone,
						ofcs3xid: ofcId,
					});
					const svdOfc = await newOfc.save();
					const newOfcObjId = svdOfc._id;

					//create the initial owner
					await new Ofcowner({
						fname: prePhy.fname,
						lname: prePhy.lname,
						email: prePhy.email,
						phone: prePhy.phone,
						ofcObjId: newOfcObjId,
					}).save();

					//create new office location
					const newLoc = new Ofclocation({
						name: 'Headquarters',
						state: prePhy.state,
						phone: prePhy.phone,
						locs3xid: locId,
						ofcObjId: newOfcObjId,
					});
					const svdLoc = await newLoc.save();
					const newLocObjId = svdLoc._id;

					//create new office user
					const newPhy = new Ofcuser({
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
						ofcs3xid: ofcId,
						ofclocObjId: newLocObjId,
						ofcObjId: newOfcObjId,
					});
					const svdPhy = await newPhy.save();
					const newPhyId = svdPhy._id;

					//create new office setup
					await new Ofcsetup({
						ofcObjId: newOfcObjId,
					}).save();

					if (newPhyId) {
						await Ofcprereg.findOneAndDelete({ verifycode: verifycode });
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
