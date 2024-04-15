'use client';
import React, { useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { storage } from '@/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { CompareByFName, FormatPhoneNumber, IsValidEmail } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function EdtUser() {
	const [auth] = useContext(AuthContext);
	const [office] = useContext(OfficeContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [user, setUser] = useState({});
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [newPicUrl, setNewPicUrl] = useState('');
	const [curPicUrl, setCurPicUrl] = useState('');
	const [permission, setPermission] = useState('staff');
	const [role, setRole] = useState('staff');
	const [supervisor, setSupervisor] = useState('');
	const [spvOptions, setSpvOptions] = useState([]);
	const [title, setTitle] = useState('');
	const [license, setLicense] = useState('');
	const [npi, setNpi] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [selLocations, setSelLocations] = useState([]);
	const [uploading, setUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(office.selUser).length !== 0 && (Object.keys(user).length === 0 || user._id !== office.selUser._id)) {
			setUser(office.selUser);
		}
	}, [office.selUser, user]);

	useEffect(() => {
		if (spvOptions.length === 0) {
			let tmpArr = [];
			const users = office.users;
			for (let i = 0; i < users.length; i++) {
				const user = users[i];
				if (user.permission === 'provider') {
					tmpArr.push(user);
				}
			}
			setSpvOptions(tmpArr);
		}
	}, [spvOptions, office]);

	useEffect(() => {
		if (Object.keys(user).length !== 0) {
			if (user.fname !== '' && user.fname !== undefined) {
				setFname(user.fname);
			} else {
				setFname('');
			}
			if (user.lname !== '' && user.lname !== undefined) {
				setLname(user.lname);
			} else {
				setLname('');
			}
			if (user.email !== '' && user.email !== undefined) {
				setEmail(user.email);
			} else {
				setEmail('');
			}
			if (user.phone !== '' && user.phone !== undefined) {
				setPhone(user.phone);
			} else {
				setPhone('');
			}
			if (user.photo !== '' && user.photo !== undefined) {
				setCurPicUrl(user.photo);
			} else {
				setCurPicUrl('');
			}
			if (user.permission !== '' && user.permission !== undefined) {
				setPermission(user.permission);
			} else {
				setPermission('');
			}
			if (user.role !== '' && user.role !== undefined) {
				setRole(user.role);
			} else {
				setRole('');
			}
			if (user.supervisor !== '' && user.supervisor !== undefined) {
				setSupervisor(user.supervisor);
			} else {
				setSupervisor('');
			}
			if (user.title !== '' && user.title !== undefined) {
				setTitle(user.title);
			} else {
				setTitle('');
			}
			if (user.license !== '' && user.license !== undefined) {
				setLicense(user.license);
			} else {
				setLicense('');
			}
			if (user.npi !== '' && user.npi !== undefined) {
				setNpi(user.npi);
			} else {
				setNpi('');
			}
			if (user.specialty !== '' && user.specialty !== undefined) {
				setSpecialty(user.specialty);
			} else {
				setSpecialty('');
			}
			//Need to set default values for locations select
			let tmpArr = [];
			if (office.locOptions.length !== 0) {
				const ofcLocArr = office.locOptions;
				const curLocs = user.locationObjId;

				for (let i = 0; i < ofcLocArr.length; i++) {
					const loc = ofcLocArr[i];
					for (let o = 0; o < curLocs.length; o++) {
						const curId = curLocs[o];
						if (curId === loc.value) {
							tmpArr.push(office.locOptions[i]);
							break;
						}
					}
				}
				setSelLocations(tmpArr);
			}
		}
	}, [user, office]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let arrLocs = [];
		let photoUrl = '';
		let spv = '';

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid patient email');
			document.getElementById('email').focus();
			return;
		}

		//set photo url
		if (newPicUrl) {
			photoUrl = newPicUrl;
		} else {
			photoUrl = curPicUrl;
		}

		//set selected location(s) if not already set
		if (selLocations.length === 0) {
			arrLocs.push(office.locations[0]._id);
		} else {
			for (let i = 0; i < selLocations.length; i++) {
				const loc = selLocations[i];
				arrLocs.push(loc.value);
			}
		}

		//set supervisor if pa or staff
		if (supervisor !== user.supervisor && (permission === 'pa' || permission === 'staff')) {
			spv = supervisor;
		} else {
			spv = spvOptions[0]._id;
		}

		//create object to update the users context
		const updObj = {
			_id: user._id,
			fname,
			lname,
			email,
			phone,
			photo: photoUrl,
			permission,
			role,
			supervisor: spv,
			title,
			license,
			npi,
			specialty,
			locationObjId: arrLocs,
		};

		try {
			//update the users context array
			const searchedObj = user;
			const replacingObj = updObj;

			const i = office.users.findIndex((x) => x._id === searchedObj._id);
			office.users[i] = replacingObj;

			//sort array alphabetically by name
			office.users.sort(CompareByFName);

			//update the database
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/users/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: user._id,
					fname,
					lname,
					email,
					phone,
					photo: photoUrl,
					permission,
					role,
					supervisor: spv,
					title,
					license,
					npi,
					specialty,
					locationObjId: arrLocs,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success('User updated successfully');
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

	const handleFileChange = async (e) => {
		e.preventDefault();
		setUploading(true);

		let file = e.target.files.item(0);
		const storageRef = ref(storage, `/offices/${auth.user.ofcid}/photos/${nanoid()}`);
		const uploadTask = uploadBytes(storageRef, file);
		uploadTask
			.then(async () => {
				getDownloadURL(storageRef).then(async (URL) => {
					setNewPicUrl(URL);
					//Delete old file from storage
					if (curPicUrl !== '' && curPicUrl !== undefined) {
						const picRef = ref(storage, curPicUrl);
						await deleteObject(picRef);
					}
				});
			})
			.catch((err) => {
				toast.error(err);
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
					<div className='colHdng'>Edit User</div>
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
									value={selLocations}
									options={office.locOptions}
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
								Save Changes
							</Button>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</>
	);
}
