import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FormatDob, FormatPhoneNumber, IsNumber, IsValidEmail } from '@/components/global/functions/Functions';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';

export default function Profile({ type }) {
	const lsUserData = process.env.DATA_SPN;
	const [auth, setAuth] = useContext(AuthContext);
	const [legalname, setLegalName] = useState('');
	const [dba, setDba] = useState('');
	const [ein, setEin] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [admFname, setAdmFname] = useState('');
	const [admLname, setAdmLname] = useState('');
	const [admEmail, setAdmEmail] = useState('');
	const [admPhone, setAdmPhone] = useState('');
	const [admDob, setAdmDob] = useState('');
	const [phoneext, setPhoneExt] = useState('');
	const [website, setWebsite] = useState('');
	const [numlocs, setNumLocs] = useState('');
	const [numemps, setNumEmps] = useState('');
	const [nummgnt, setNumMgnt] = useState('');
	const [curpay, setCurPay] = useState('');
	const [curpayins, setCurPayIns] = useState(false);
	const [curself, setCurSelf] = useState('');
	const [curselffund, setCurSelfFund] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadSponsor = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/data/get/byid?id=${auth.user.spnObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLegalName(data.sponsor.legalname);
				setDba(data.sponsor.legalname);
				setFname(data.sponsor.fname);
				setLname(data.sponsor.lname);
				setEmail(data.sponsor.email);
				setPhone(data.sponsor.phone);
				setPhoneExt(data.sponsor.phoneext);
				setWebsite(data.sponsor.website);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadSponsor();
	}, [loadSponsor]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleCorpSubmit = async (e) => {
		e.preventDefault();

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/setup/edit/profile/company`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					legalname,
					dba,
					ein,
					fname,
					lname,
					email,
					phone,
					phoneext,
					website,
					numlocs,
					numemps,
					nummgnt,
					curpayins,
					curselffund,
					spnid: auth.user.spnObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};
	const handlePvtSubmit = async (e) => {
		e.preventDefault();

		//Check emails
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			setLoading(false);
			return;
		}
		if (!IsValidEmail(admEmail)) {
			toast.error('Please enter a valid administrative email');
			document.getElementById('admEmail').focus();
			setLoading(false);
			return;
		}

		//set legal name
		const lglName = fname + ' ' + lname;

		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/setup/edit/profile/private`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					legalname: lglName,
					fname,
					lname,
					email,
					phone,
					admFname,
					admLname,
					admEmail,
					admPhone,
					admDob,
					spnid: auth.user.spnObjId,
					spnlocid: auth.user.locObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				if (Object.keys(data.newSub).length !== 0) {
					const isMember = data.newSub.isMember;
					const uname = data.newSub.uname;
					const pword = data.newSub.pword;
					const vcode = data.newSub.vcode;
					let template = '';
					//send email to subscriber
					const url = process.env.NEXTAUTH_URL;
					const domain = process.env.DOMAIN;
					const emlService = process.env.EMAILJS_SERVICE;
					const emlUser = process.env.EMAILJS_USER;
					if (isMember) {
						template = 'subPvtSpnVerify';
					} else {
						template = 'nonSubPvtSpnVerify';
					}
					let verifyLink = `${url}/subscribers/verify/email/${vcode}`;
					let contactLink = `${url}/contact`;

					const emlData = {
						domain: domain,
						toEmail: admEmail.toLowerCase(),
						toFname: admFname,
						spnFname: fname,
						spnLname: lname,
						verifyLink: verifyLink,
						uname: uname,
						pword: pword,
						contactLink: contactLink,
					};

					//Send email
					emailjs.send(emlService, template, emlData, emlUser);
				}

				//reset auth context and local storage in case anything changed
				const userObj = {
					_id: auth.user._id,
					fname: fname,
					lname: lname,
					email: email,
					phone: phone,
					phoneext: auth.user.phoneext,
					permission: auth.user.permission,
					role: auth.user.role,
					spnid: auth.user.spnid,
					locObjId: auth.user.locObjId,
					spnObjId: auth.user.spnObjId,
				};
				setAuth({ user: userObj });
				saveInLocalStorage(lsUserData, userObj);

				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handlePhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	};
	const handleAdmPhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setAdmPhone(formattedPhoneNumber);
	};
	const handleAdmDob = (e) => {
		const value = e.target.value;
		const chkDob = FormatDob(value);
		setAdmDob(chkDob);
	};
	const handleNumLocs = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumLocs(num);
	};
	const handleNumEmps = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumEmps(num);
	};
	const handleNumMgnt = (e) => {
		const value = e.target.value;
		const num = IsNumber(value);
		setNumMgnt(num);
	};
	const handleCurPayIns = (e) => {
		const value = e.target.value;
		setCurPay(value);
		if (value === 'y') {
			setCurPayIns(true);
		} else {
			setCurPayIns(false);
		}
	};
	const handleCurSelfFund = (e) => {
		const value = e.target.value;
		setCurSelf(value);
		if (value === 'y') {
			setCurSelfFund(true);
		} else {
			setCurSelfFund(false);
		}
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				{type === 'private' ? (
					<>
						<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>PERSONAL PROFILES</div>
						<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
							<form onSubmit={handlePvtSubmit}>
								<div className='w-full flex flex-col'>
									<div className='w-full mb-3 p-3 border-2 border-txtbox rounded-xl'>
										<div className='mb-3 text-lg font-semibold text-center'>Responsible Party</div>
										<label className='frmLabel'>First Name</label>
										<Input type='text' required={true} value={fname} setValue={setFname} />
										<label className='frmLabel'>Last Name</label>
										<Input type='text' required={true} value={lname} setValue={setLname} />
										<label className='frmLabel'>Email</label>
										<Input type='email' id='email' required={true} value={email} setValue={setEmail} />
										<label className='frmLabel'>Phone</label>
										<Input type='tel' required={true} value={phone} funcCall={handlePhone} />
									</div>
									<div className='w-full p-3 border-2 border-txtbox rounded-xl'>
										<div className='mb-4 text-lg font-semibold text-center'>Administrative Party</div>
										<label className='frmLabel'>First Name</label>
										<Input type='text' required={true} value={admFname} setValue={setAdmFname} />
										<label className='frmLabel'>Last Name</label>
										<Input type='text' required={true} value={admLname} setValue={setAdmLname} />
										<label className='frmLabel'>Email</label>
										<Input type='email' id='admEmail' required={true} value={admEmail} setValue={setAdmEmail} />
										<label className='frmLabel'>Phone</label>
										<Input type='tel' required={true} value={admPhone} funcCall={handleAdmPhone} />
										<label className='frmLabel'>DOB (mmddyyyy)</label>
										<Input type='text' value={admDob} funcCall={handleAdmDob} />
									</div>
									<div className='mt-5 flex justify-center'>
										<Button
											type='submit'
											disabled={!fname || !lname || !email || !phone || !admFname || !admLname || !admEmail || !admPhone || !admDob}
										>
											Save Changes
										</Button>
									</div>
								</div>
							</form>
						</div>
					</>
				) : (
					<>
						<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>COMPANY PROFILE</div>
						<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
							<form onSubmit={handleCorpSubmit}>
								<label className='frmLabel'>Type</label>
								<div className='text-sm'>{type.charAt(0).toUpperCase() + type.slice(1)}</div>
								<label className='frmLabel'>Legal Name</label>
								<Input type='text' required={true} value={legalname} setValue={setLegalName} />
								<label className='frmLabel'>DBA</label>
								<Input type='text' required={true} value={dba} setValue={setDba} />
								<label className='frmLabel'>EIN</label>
								<Input type='text' required={true} value={ein} setValue={setEin} />
								<label className='frmLabel'>Contact First Name</label>
								<Input type='text' required={true} value={fname} setValue={setFname} />
								<label className='frmLabel'>Contact Last Name</label>
								<Input type='text' required={true} value={lname} setValue={setLname} />
								<label className='frmLabel'>Email</label>
								<Input type='email' id='email' required={true} value={email} setValue={setEmail} />
								<label className='frmLabel'>Phone</label>
								<Input type='tel' required={true} value={phone} funcCall={handlePhone} />
								<label className='frmLabel'>Phone Ext.</label>
								<Input type='text' value={phoneext} setValue={setPhoneExt} />
								<label className='frmLabel'>Website</label>
								<Input type='text' value={website} setValue={setWebsite} />
								<label className='frmLabel'># of Locations</label>
								<Input type='text' required={true} value={numlocs} funcCall={handleNumLocs} />
								<label className='frmLabel'># of Eligible Employees</label>
								<Input type='text' required={true} value={numemps} funcCall={handleNumEmps} />
								<label className='frmLabel'># of Owners & Executives</label>
								<Input type='text' required={true} value={nummgnt} funcCall={handleNumMgnt} />
								<label className='frmLabel'>Currently paying for insurance</label>
								<div className='mb-2'>
									<select className='inpBorder form-control' required={true} value={curpay} onChange={(e) => handleCurPayIns(e)}>
										<option value=''>Select One...</option>
										<option value='y'>Yes</option>
										<option value='n'>No</option>
									</select>
								</div>
								<label className='frmLabel'>Currently or transitioning to Self-Funding</label>
								<div className='mb-2'>
									<select className='inpBorder form-control' required={true} value={curself} onChange={(e) => handleCurSelfFund(e)}>
										<option value=''>Select One...</option>
										<option value='y'>Yes</option>
										<option value='n'>No</option>
									</select>
								</div>
								<div className='mt-5 flex justify-center'>
									<Button
										type='submit'
										disabled={
											!legalname ||
											!dba ||
											!ein ||
											!fname ||
											!lname ||
											!email ||
											!phone ||
											!numlocs ||
											!numemps ||
											!nummgnt ||
											!curpay ||
											!curself
										}
									>
										Save Changes
									</Button>
								</div>
							</form>
						</div>
					</>
				)}
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					{type === 'private' ? (
						<>
							<div className='mb-3 text-lg font-semibold text-center'>PERSONAL PROFILES</div>
							<div className='mb-3'>
								Please complete the Personal Profiles information. This will help SN3X determine your needs and help you use the Sponsor Sphere
								more efficiently.
							</div>
							<div className='mb-3'>
								&quot;Responsible Party&quot; pertains to the person who will be responsible for the financial obligations and member
								subscription management.
							</div>
							<div>
								&quot;Administrative Party&quot; pertains to the person, usually a parent or guardian, who will be responsible for completing
								the patient setup process (patient profile, medical history, etc.) and have access to the patients medical records, appointment
								scheduling, choosing physicians, etc. Please include their Date of Birth to verify they are not a minor.
							</div>
						</>
					) : (
						<>
							<div className='mb-3 text-lg font-semibold text-center'>COMPANY PROFILE</div>
							<div>
								Please complete the Company Profile information. This will help SN3X determine your needs and help you use the Sponsor Sphere
								more efficiently.
							</div>
						</>
					)}
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
