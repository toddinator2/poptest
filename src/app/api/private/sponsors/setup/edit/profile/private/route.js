import { NextResponse } from 'next/server';
import { CreateS3xId, CreateUsername, FixDob, FixPhone, RandomStringMake } from '@/components/global/functions/Functions';
import bcrypt from 'bcryptjs';
import connect from '@/utils/dbConnect';
import Sponsor from '@/models/sponsor';
import Subscriber from '@/models/subscriber';
import Subprereg from '@/models/subprereg';
import Spnsetup from '@/models/spnsetup';
import Relsubspn from '@/models/relsubspn';

export const PUT = async (req) => {
	await connect();
	const body = await req.json();
	const { legalname, fname, lname, email, phone, admFname, admLname, admEmail, admPhone, admDob, spnid, spnlocid } = body;
	let newEmail = '';
	let newAdmEmail = '';

	if (email) {
		newEmail = email.toLowerCase();
	}
	if (admEmail) {
		newAdmEmail = admEmail.toLowerCase();
	}

	try {
		await Sponsor.findByIdAndUpdate(
			spnid,
			{
				legalname,
				dba: legalname,
				fname,
				lname,
				email: newEmail,
				phone,
			},
			{ new: true }
		);

		//check if admin email already exists in subscriber
		let newSubObj;
		const chkSub = await Subscriber.findOne({ email: newAdmEmail });
		if (chkSub || chkSub !== null) {
			const subId = chkSub._id;
			await Subscriber.findOneAndUpdate({ email: newAdmEmail }, { role: 'admin' }, { new: true });
			await new Relsubspn({
				subObjId: subId,
				spnlocObjId: spnlocid,
				spnObjId: spnid,
			}).save();
			newSubObj = { isMember: true };
		} else {
			//need to create a new subscriber with just manager role
			let uname = '';
			let s3xid = '';
			//create username
			for (let i = 0; i <= 1000000; i++) {
				const newUname = CreateUsername(admFname, admLname);
				const unameExistsPrereg = await Subprereg.findOne({ username: newUname });
				const unameExistsSubscriber = await Subscriber.findOne({ username: newUname });
				if ((!unameExistsPrereg || unameExistsPrereg === null) && (!unameExistsSubscriber || unameExistsSubscriber === null)) {
					uname = newUname.toLowerCase();
					break;
				}
			}
			//Create a Supernova3x ID and check if already exists
			for (let i = 0; i <= 1000000; i++) {
				const newS3xId = CreateS3xId(9);
				const idExists = await Subscriber.findOne({ subs3xid: newS3xId.toLowerCase() });
				if (!idExists || idExists === null) {
					s3xid = newS3xId.toLowerCase();
					break;
				}
			}
			//create a new password
			const pword = RandomStringMake(10);
			const hashedPassword = await bcrypt.hash(pword, 10);
			//Create a reset creds code
			const resetcode = RandomStringMake(32);
			//Create the email verification code
			const verifycode = RandomStringMake(64);
			//fix dob to save
			const fxdDob = FixDob(admDob);
			//fix phone to save
			const fxdPhn = FixPhone(admPhone);

			const newSub = new Subscriber({
				fname: admFname,
				lname: admLname,
				dob: fxdDob,
				email: newAdmEmail,
				username: uname,
				password: hashedPassword,
				phone: fxdPhn,
				resetcreds: true,
				resetcode,
				permission: 'subscriber',
				role: 'manager',
				verifycode,
				emailconfirmed: false,
				subs3xid: s3xid,
			});
			const svdSub = newSub.save();
			const newSubId = svdSub._id;

			await new Relsubspn({
				subObjId: newSubId,
				spnlocObjId: spnlocid,
				spnObjId: spnid,
			}).save();

			newSubObj = {
				isMember: false,
				uname: uname,
				pword: pword,
				vcode: verifycode,
			};
		}

		await Spnsetup.findOneAndUpdate({ spnObjId: spnid }, { profile: true }, { new: true });
		return NextResponse.json({ msg: 'Personal Profiles updated successfully', newSub: newSubObj, status: 200 });
	} catch (err) {
		return NextResponse.json({ msg: 'Network Error: Please try again', status: 500 });
	}
};
