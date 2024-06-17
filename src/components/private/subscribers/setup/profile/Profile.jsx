'use client';
import React, { useContext, useState } from 'react';
import { nanoid } from 'nanoid';
import { storage } from '../../../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import { FormatDob, FormatPhoneNumber, FormatZip } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';

export default function Profile() {
	const lsUserData = process.env.DATA_SUB;
	const [auth, setAuth] = useContext(AuthContext);
	const [add, setAdd] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [sex, setSex] = useState('');
	const [spns3xId, setSpnS3xId] = useState('');
	const [newPicUrl, setNewPicUrl] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: auth.user._id,
					address: add,
					address2: add2,
					city,
					state,
					zip,
					sex,
					spns3xId: spns3xId,
					photo: newPicUrl,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				//reset auth context and local storage in case anything changed
				const userObj = {
					_id: auth.user._id,
					fname: auth.user.fname,
					lname: auth.user.lname,
					dob: auth.user.dob,
					email: auth.user.email,
					phone: auth.user.phone,
					photo: newPicUrl,
					sex: sex,
					permission: auth.user.permission,
					role: auth.user.role,
					subs3xid: auth.user.subs3xid,
				};
				setAuth({ user: userObj });
				saveInLocalStorage(lsUserData, userObj);
				toast.success(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleFileChange = async (e) => {
		e.preventDefault();
		let file = e.target.files.item(0);
		const storageRef = ref(storage, `/patients/${auth.user.subs3xid}/photos/${nanoid()}`);
		const uploadTask = uploadBytes(storageRef, file);
		uploadTask.then(async () => {
			getDownloadURL(storageRef)
				.then(async (URL) => {
					setNewPicUrl(URL);
				})
				.catch((err) => {
					toast.error(err);
				});
		});
		file = null;
	};

	function handleZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setZip(formattedZip);
	}

	return (
		<>
			<div className='w-full mt-7 mb-1 font-semibold text-center text-2xl'>Complete Your Profile</div>
			<div className='w-full mb-7 font-semibold text-center text-base'>Supernova3x ID: {auth.user.subs3xid.toUpperCase()}</div>
			<div className='w-full pb-5 lg:w-5/6 lg:mx-auto flex flex-col xl:flex-row xl-justify-center xl:gap-3'>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>PROFILE</div>
					<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
						<form onSubmit={handleSubmit}>
							<label className='frmLabel'>Name</label>
							<div className='mb-2 ps-2'>
								{auth.user.fname} {auth.user.lname}
							</div>
							<label className='frmLabel'>Phone</label>
							<div className='mb-2 ps-2'>{FormatPhoneNumber(auth.user.phone)}</div>
							<label className='frmLabel'>Email</label>
							<div className='mb-2 ps-2'>{auth.user.email}</div>
							<label className='frmLabel'>DOB</label>
							<div className='mb-2 ps-2'>{FormatDob(auth.user.dob)}</div>
							<label className='frmLabel'>Street Address</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={add} setValue={setAdd} />
							</div>
							<label className='frmLabel'>Address 2</label>
							<div className='mb-2 ps-2'>
								<Input type='text' value={add2} setValue={setAdd2} />
							</div>
							<label className='frmLabel'>City</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={city} setValue={setCity} />
							</div>
							<label className='frmLabel'>State</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' required={true} value={state} onChange={(e) => setState(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='AL'>Alabama</option>
									<option value='AK'>Alaska</option>
									<option value='AZ'>Arizona</option>
									<option value='AR'>Arkansas</option>
									<option value='CA'>California</option>
									<option value='CO'>Colorado</option>
									<option value='CT'>Connecticut</option>
									<option value='DE'>Delaware</option>
									<option value='DC'>District of Columbia</option>
									<option value='FL'>Florida</option>
									<option value='GA'>Georgia</option>
									<option value='HI'>Hawaii</option>
									<option value='ID'>Idaho</option>
									<option value='IL'>Illinois</option>
									<option value='IN'>Indiana</option>
									<option value='IA'>Iowa</option>
									<option value='KS'>Kansas</option>
									<option value='KY'>Kentucky</option>
									<option value='LA'>Louisiana</option>
									<option value='ME'>Maine</option>
									<option value='MD'>Maryland</option>
									<option value='MA'>Massachusetts</option>
									<option value='MI'>Michigan</option>
									<option value='MN'>Minnesota</option>
									<option value='MS'>Mississippi</option>
									<option value='MO'>Missouri</option>
									<option value='MT'>Montana</option>
									<option value='NE'>Nebraska</option>
									<option value='NV'>Nevada</option>
									<option value='NH'>New Hampshire</option>
									<option value='NJ'>New Jersey</option>
									<option value='NM'>New Mexico</option>
									<option value='NY'>New York</option>
									<option value='NC'>North Carolina</option>
									<option value='ND'>North Dakota</option>
									<option value='OH'>Ohio</option>
									<option value='OK'>Oklahoma</option>
									<option value='OR'>Oregon</option>
									<option value='PA'>Pennsylvania</option>
									<option value='RI'>Rhode Island</option>
									<option value='SC'>South Carolina</option>
									<option value='SD'>South Dakota</option>
									<option value='TN'>Tennessee</option>
									<option value='TX'>Texas</option>
									<option value='UT'>Utah</option>
									<option value='VT'>Vermont</option>
									<option value='VA'>Virginia</option>
									<option value='WA'>Washington</option>
									<option value='WV'>West Virginia</option>
									<option value='WI'>Wisconsin</option>
									<option value='WY'>Wyoming</option>
								</select>
							</div>
							<label className='frmLabel'>Zip Code</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={zip} funcCall={handleZip} />
							</div>
							<label className='frmLabel'>Sex</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' required={true} value={sex} onChange={(e) => setSex(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='m'>Male</option>
									<option value='f'>Female</option>
								</select>
							</div>
							<label className='frmLabel'>Employer SN3X #</label>
							<div className='mb-2 ps-2'>
								<Input type='text' value={spns3xId} setValue={setSpnS3xId} />
							</div>
							<label className='frmLabel'>Photo</label>
							<div className='mb-2 ps-2'>
								<input
									className='block w-full text-sm text-txtclr border-2 border-txtbox rounded-md cursor-pointer'
									type='file'
									onChange={handleFileChange}
								/>
							</div>
							<div className='mt-5 flex justify-center'>
								<Button type='submit' disabled={!add || !city || !state || !zip || !sex}>
									Save Changes
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
					<div className='w-full py-2 font-semibold text-center text-lg'>Subscriber Profile</div>
					<div className='w-5/6 mx-auto py-3 flex flex-col'>
						<div className='mb-3'>SN3X Subscribers can update their private profile anytime in their Subscriber Sphere.</div>
						<div>
							We realize this is a comprehensive setup process, so you may at any time during this setup process, close this window and log back
							in later to finish. Just please have it completed before your first initial visit with your physician, and this is also the only
							time you will have to do this EVER AGAIN.
						</div>
					</div>
				</div>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
					<Checklist />
				</div>
			</div>
		</>
	);
}
