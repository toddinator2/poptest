import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FormatPhoneNumber, IsNumber, IsValidEmail } from '@/components/global/functions/Functions';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';

export default function Profile() {
	const [auth] = useContext(AuthContext);
	const [type, setType] = useState('');
	const [legalname, setLegalName] = useState('');
	const [dba, setDba] = useState('');
	const [ein, setEin] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
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
				setType(data.sponsor.type);
				setLegalName(data.sponsor.legalname);
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
	const handleSubmit = async (e) => {
		e.preventDefault();

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			setLoading(false);
			return;
		}

		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/setup/edit/profile`, {
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handlePhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
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
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>OFFICE PROFILE</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
					<form onSubmit={handleSubmit}>
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
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					<div className='mb-3 text-lg font-semibold text-center'>COMPANY PROFILE</div>
					<div>
						Please complete the Company Profile information. This will help SN3X determine your needs and help you use the Sponsor Sphere more
						efficiently.
					</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
