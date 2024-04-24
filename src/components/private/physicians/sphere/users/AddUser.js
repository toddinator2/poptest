'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { storage } from '../../../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Select from 'react-select';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function AddUser() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [newPicUrl, setNewPicUrl] = useState('');
	const [permission, setPermission] = useState('staff');
	const [role, setRole] = useState('staff');
	const [supervisor, setSupervisor] = useState('');
	const [spvOptions, setSpvOptions] = useState([]);
	const [title, setTitle] = useState('');
	const [license, setLicense] = useState('');
	const [npi, setNpi] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [locOptions, setLocOptions] = useState([]);
	const [selLocations, setSelLocations] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadSupervisorOptions = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/users/get/all?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				let tmpArr = [];
				for (let i = 0; i < data.users.length; i++) {
					const user = data.users[i];
					if (user.permission === 'provider') {
						tmpArr.push(user);
					}
				}
				setSpvOptions(tmpArr);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	}, [auth]);

	const loadLocationOptions = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/locations/get/forselect?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLocOptions(data.locs);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadSupervisorOptions();
	}, [loadSupervisorOptions]);

	useEffect(() => {
		loadLocationOptions();
	}, [loadLocationOptions]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let arrLocs = [];
		let spv = '';

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			return;
		}

		//create temporary password
		const tmpPwrd = RandomStringMake(10);

		//create credentials reset code
		const resetcode = RandomStringMake(5);

		//set selected location(s) if not already set
		if (selLocations.length === 0) {
			arrLocs.push(locOptions[0]._id);
		} else {
			for (let i = 0; i < selLocations.length; i++) {
				const loc = selLocations[i];
				arrLocs.push(loc.value);
			}
		}

		//set supervisor if pa or staff
		if (spvOptions.length === 1 && !supervisor && (permission === 'pa' || permission === 'staff')) {
			spv = spvOptions[0]._id;
		} else if (supervisor && (permission === 'pa' || permission === 'staff')) {
			spv = supervisor;
		} else {
			spv = null;
		}

		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/users/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fname,
					lname,
					email,
					password: tmpPwrd,
					phone,
					photo: newPicUrl,
					permission,
					role,
					supervisor: spv,
					paid: true,
					title,
					license,
					npi,
					specialty,
					resetcreds: true,
					resetcode,
					emailconfirmed: true,
					officeid: auth.user.ofcid,
					locationObjId: arrLocs,
					officeObjId: auth.user.ofcObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				//Email user new credentials
				const domain = process.env.DOMAIN;
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const tempUserAdded = 'ofcUserAdded';

				//Set welcome email data
				const dataUserAdded = {
					domain: domain,
					toEmail: email,
					toName: fname,
					username: data.uname,
					password: tmpPwrd,
				};

				//Send email
				emailjs.send(emlService, tempUserAdded, dataUserAdded, emlUser);
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	const handleClose = () => {
		setFname('');
		setLname('');
		setEmail('');
		setPhone('');
		setNewPicUrl('');
		setPermission('staff');
		setRole('staff');
		setTitle('');
		setLicense('');
		setNpi('');
		setSpecialty('');
		setSelLocations([]);
		setMenu({ type: menu.type, func: '' });
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleFileChange = async (e) => {
		e.preventDefault();
		setUploading(true);
		let file = e.target.files.item(0);
		const storageRef = ref(storage, `/offices/${auth.user.ofcid}/photos/${nanoid()}`);
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

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Add User</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-12 col-xl-8'>
					<form onSubmit={handleSubmit}>
						<Input label='First Name' type='text' value={fname} setValue={setFname} />
						<Input label='Last Name' type='text' value={lname} setValue={setLname} />
						<Input label='Email' type='email' id='email' value={email} setValue={setEmail} />
						<Input label='Phone' type='tel' name='phone' id='phone' value={phone} funcCall={handlePhone} />
						<label className={`btn btn-primary col-12 my-2 ${uploading ? 'disabled' : ''}`}>
							{!uploading && !uploaded && 'Upload Photo'}
							{uploading && 'Processing'}
							{uploaded && 'Photo Uploaded'}
							<input type='file' hidden accept='images/*' onChange={handleFileChange} disabled={uploading} />
						</label>
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>Permission</label>
							</div>
							<div className='col-12'>
								<select className='form-control inpBorder' value={permission} onChange={(e) => setPermission(e.target.value)}>
									<option value='staff'>Staff</option>
									<option value='pa'>Non-Physician Provider</option>
									<option value='provider'>Physician</option>
								</select>
							</div>
						</div>
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>Role</label>
							</div>
							<div className='col-12'>
								<select className='form-control inpBorder' value={role} onChange={(e) => setRole(e.target.value)}>
									<option value='staff'>Staff</option>
									<option value='admin'>Admin</option>
								</select>
							</div>
						</div>
						{(permission === 'staff' || permission === 'pa') && spvOptions.length !== 0 && (
							<div className='row mb-2'>
								<div className='col-12'>
									<label className='frmLabel'>Supervisor</label>
								</div>
								<div className='col-12'>
									<select className='form-control inpBorder' value={supervisor} onChange={(e) => setSupervisor(e.target.value)}>
										<option value=''>Select One...</option>
										{spvOptions.map((spv) => (
											<option value={spv._id} key={spv._id}>
												{spv.fname} {spv.lname}
											</option>
										))}
									</select>
								</div>
							</div>
						)}
						{(permission === 'provider' || permission === 'pa') && (
							<>
								<Input label='Title' type='text' value={title} setValue={setTitle} />
								<Input label='License' type='text' value={license} setValue={setLicense} />
								<Input label='NPI' type='text' value={npi} setValue={setNpi} />
								<Input label='Specialty' type='text' value={specialty} setValue={setSpecialty} />
							</>
						)}
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>Location</label>
							</div>
							<div className='col-12'>
								<Select
									isMulti={true}
									options={locOptions}
									onChange={setSelLocations}
									styles={{
										control: (baseStyles) => ({
											...baseStyles,
											backgroundColor: 'transparent',
											border: '1px solid #c9c9c9',
											borderRadius: '7px',
										}),
									}}
								/>
							</div>
						</div>
						<div className='row my-3 d-flex justify-content-center'>
							<Button border='ff0000' disabled={!fname || !lname || email.length < 6 || !permission || !role || selLocations.length === 0}>
								Save User
							</Button>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</>
	);
}
