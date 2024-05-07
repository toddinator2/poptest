'use client';
import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { storage } from '../../../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { FixDob, FormatDob, FormatPhoneNumber, FormatZip } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Checklist from '../checklist/Checklist';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Profile({ user }) {
	const [add, setAdd] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [dob, setDob] = useState('');
	const [sex, setSex] = useState('');
	const [s3xId, setS3xId] = useState('');
	const [newPicUrl, setNewPicUrl] = useState('');
	const [uploading, setUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();

		//Fix DOB to only numbers
		const newDob = await FixDob(dob);

		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: user._id,
					address: add,
					address2: add2,
					city,
					state,
					zip,
					dob: newDob,
					sex,
					s3xId: s3xId,
					photo: newPicUrl,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
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
		setUploading(true);
		let file = e.target.files.item(0);
		const storageRef = ref(storage, `/patients/${user.s3xid}/photos/${nanoid()}`);
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
		setUploading(false);
		setUploaded(true);
	};

	function handleZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setZip(formattedZip);
	}

	function handleDob(e) {
		const value = e.target.value;
		const chkDob = FormatDob(value);
		setDob(chkDob);
	}

	return (
		<div className='row mt-3 mt-xl-5 d-flex justify-content-center'>
			<div className='suDiv red order-last order-xl-first'>
				<div className='suHdrDiv red'>COMPLETE YOUR PROFILE</div>
				<form onSubmit={handleSubmit}>
					<div className='row mt-3'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel'>Name:</div>
						</div>
						<div className='col-10 col-xl-6 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<div className='suText'>
								{user.fname} {user.lname}
							</div>
						</div>
					</div>
					<div className='row mt-2'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel'>Cell Phone:</div>
						</div>
						<div className='col-10 col-xl-6 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<div className='suText'>{FormatPhoneNumber(user.mphone)}</div>
						</div>
					</div>
					<div className='row mt-2 mb-3'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel'>Email:</div>
						</div>
						<div className='col-10 col-xl-6 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<div className='suText'>{user.email}</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>Street Adress:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<Input type='text' required={true} value={add} setValue={setAdd} />
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>Address 2:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<Input type='text' value={add2} setValue={setAdd2} />
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>City:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<Input type='text' required={true} value={city} setValue={setCity} />
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>State:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<select className='inpBorder form-control mb-2' required={true} value={state} onChange={(e) => setState(e.target.value)}>
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
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>Zip Code:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<Input type='text' required={true} value={zip} funcCall={handleZip} />
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>DOB (mmddyyyy):</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<Input type='text' required={true} value={dob} funcCall={handleDob} />
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>Sex:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<select className='inpBorder form-control mb-2' required={true} value={sex} onChange={(e) => setSex(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='m'>Male</option>
								<option value='f'>Female</option>
							</select>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>Employer SN3X #:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<Input type='text' value={s3xId} setValue={setS3xId} />
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
							<div className='frmLabel mb-2'>Photo:</div>
						</div>
						<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
							<label className={`btn btn-primary col-12 ${uploading ? 'disabled' : ''}`}>
								{!uploading && !uploaded && 'Upload Photo'}
								{uploading && 'Processing'}
								{uploaded && 'Photo Uploaded'}
								<input type='file' hidden accept='images/*' onChange={handleFileChange} disabled={uploading} />
							</label>
						</div>
					</div>
					<div className='my-4 d-flex justify-content-center'>
						<Button type='submit' border='555555' disabled={!add || !city || !state || !zip || !dob || !sex}>
							Save Changes
						</Button>
					</div>
				</form>
			</div>
			<div className='suDiv blu mx-4 mb-3 mb-xl-0 order-2'>
				<div className='suHdrDiv blu'>DETAILS</div>
				<div className='row mt-3 mb-4'>
					<div className='col-12'>
						<div className='suHdng'>Subscriber Profile</div>
					</div>
				</div>
				<div className='px-2 px-xl-4'>
					<p>SN3X Subscribers can update their private profile anytime in their personal NOVA SPHERE.</p>
					<p>
						We realize this is a comprehensive setup process, so you may at any time during this setup process, close this window and log back in
						later to finish. Just please have it completed before your first initial visit with your physician, and this is also the only time you
						will have to do this EVER AGAIN.
					</p>
				</div>
			</div>
			<div className='suDiv ppl mb-3 mb-xl-0 order-first order-xl-last'>
				<div className='suHdrDiv ppl'>SETUP CHECKLIST</div>
				<Checklist progress={user.setupprogress} />
			</div>
		</div>
	);
}
