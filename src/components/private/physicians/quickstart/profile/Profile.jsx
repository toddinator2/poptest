import React, { useCallback, useContext, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { FormatPhoneNumber, FormatZip, IsValidEmail } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Checklist from '../checklist/Checklist';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Profile() {
	const [auth] = useContext(AuthContext);
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [photo, setPhoto] = useState('');
	const [add, setAdd] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [title, setTitle] = useState('');
	const [license, setLicense] = useState('');
	const [licensestate, setLicenseState] = useState('');
	const [npi, setNpi] = useState('');
	const [gnpi, setGnpi] = useState('');
	const [specialty, setSpecialty] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/users/get/databyid?id=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setFname(data.phy.fname);
				setLname(data.phy.lname);
				setEmail(data.phy.email);
				setPhone(data.phy.phone);
				setSpecialty(data.phy.specialty);
				setLicense(data.phy.license);
				setLicenseState(data.phy.licensestate);
				setNpi(data.phy.npi);
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
		loadUser();
	}, [loadUser]);

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
			const response = await fetch(`${process.env.API_URL}/physicians/office/setup/edit/profile`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: auth.user._id,
					fname,
					lname,
					email,
					phone,
					photo,
					add,
					add2,
					city,
					state,
					zip,
					title,
					license,
					licensestate,
					npi,
					gnpi,
					specialty,
					ofcid: auth.user.ofcObjId,
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
	const handleFileChange = async (e) => {
		e.preventDefault();
		let file = e.target.files.item(0);
		const storageRef = ref(storage, `/offices/${auth.user.ofcid}/photos/${nanoid()}`);
		const uploadTask = uploadBytes(storageRef, file);
		uploadTask.then(async () => {
			getDownloadURL(storageRef)
				.then(async (URL) => {
					setPhoto(URL);
				})
				.catch((err) => {
					toast.error(err);
				});
		});
		file = null;
	};

	const handlePhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	};

	function handleZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setZip(formattedZip);
	}

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>PHYSICIAN PROFILE</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
					<form onSubmit={handleSubmit}>
						<label className='frmLabel'>First Name</label>
						<Input type='text' required={true} value={fname} setValue={setFname} />
						<label className='frmLabel'>Last Name</label>
						<Input type='text' required={true} value={lname} setValue={setLname} />
						<label className='frmLabel'>Email</label>
						<Input type='email' id='email' required={true} value={email} setValue={setEmail} />
						<label className='frmLabel'>Cell Phone</label>
						<Input type='tel' required={true} value={phone} funcCall={handlePhone} />
						<label className='frmLabel'>Home Street Address</label>
						<Input type='text' required={true} value={add} setValue={setAdd} />
						<label className='frmLabel'>Home Address 2</label>
						<Input type='text' value={add2} setValue={setAdd2} />
						<label className='frmLabel'>Home City</label>
						<Input type='text' required={true} value={city} setValue={setCity} />
						<label className='frmLabel'>Home State</label>
						<div className='mb-2'>
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
						<label className='frmLabel'>Home Zip Code</label>
						<Input type='text' required={true} value={zip} funcCall={handleZip} />
						<label className='frmLabel'>Signature Title (ex: Name, MD)</label>
						<Input type='text' required={true} value={title} setValue={setTitle} />
						<label className='frmLabel'>Specialty</label>
						<select className='inpBorder form-control mb-2' required={true} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='Allergy & Immunology'>Allergy & Immunology</option>
							<option value='Anatomical Pathology'>Anatomical Pathology</option>
							<option value='Bariatric Medicine'>Bariatric Medicine</option>
							<option value='Cardiology'>Cardiology</option>
							<option value='Cardiothoracic Surgery'>Cardiothoracic Surgery</option>
							<option value='Chiropractic'>Chiropractic</option>
							<option value='Colorectal Surgery'>Colorectal Surgery</option>
							<option value='Dermatology'>Dermatology</option>
							<option value='Emergency Room'>Emergency Room</option>
							<option value='Endocrinology'>Endocrinology</option>
							<option value='Family Medicine'>Family Medicine</option>
							<option value='Functional Medicine'>Functional Medicine</option>
							<option value='Gastroenterology'>Gastroenterology</option>
							<option value='General Surgery'>General Surgery</option>
							<option value='Gynecology'>Gynecology</option>
							<option value='Hematology & Oncology'>Hematology & Oncology</option>
							<option value='Infectious Disease'>Infectious Disease</option>
							<option value='Intensive Care'>Intensive Care</option>
							<option value='Internal Medicine'>Internal Medicine</option>
							<option value='Lifestyle Medicine'>Lifestyle Medicine</option>
							<option value='Medical Genetics'>Medical Genetics</option>
							<option value='Neonatology'>Neonatology</option>
							<option value='Nephrology'>Nephrology</option>
							<option value='Neuro Surgery'>Neuro Surgery</option>
							<option value='Neurology'>Neurology</option>
							<option value='Obstetrics & Gynecology'>Obstetrics & Gynecology</option>
							<option value='Occupational Care'>Occupational Care</option>
							<option value='Ophthalmology'>Ophthalmology</option>
							<option value='Optometry'>Optometry</option>
							<option value='Orthopedic'>Orthopedic</option>
							<option value='Orthopedic Surgery'>Orthopedic Surgery</option>
							<option value='Otorhinolaryngology'>Otorhinolaryngology</option>
							<option value='Pain Management'>Pain Management</option>
							<option value='Pathology'>Pathology</option>
							<option value='Pediatric Medicine'>Pediatric Medicine</option>
							<option value='Physical Therapy'>Physical Therapy</option>
							<option value='Plastic Surgery'>Plastic Surgery</option>
							<option value='Podiatry'>Podiatry</option>
							<option value='Preventative Care'>Preventative Care</option>
							<option value='Prevention Medicine'>Prevention Medicine</option>
							<option value='Psychiatry'>Psychiatry</option>
							<option value='Pulmonology'>Pulmonology</option>
							<option value='Radiology'>Radiology</option>
							<option value='Rheumatology'>Rheumatology</option>
							<option value='Spinal Cord Care'>Spinal Cord Care</option>
							<option value='Sport Care'>Sport Care</option>
							<option value='Urology'>Urology</option>
							<option value='Vascular Surgery'>Vascular Surgery</option>
							<option value='Well Medicine'>Well Medicine</option>
						</select>
						<label className='frmLabel'>License</label>
						<Input type='text' required={true} value={license} setValue={setLicense} />
						<label className='frmLabel'>License State</label>
						<div className='mb-2'>
							<select className='inpBorder form-control' required={true} value={licensestate} onChange={(e) => setLicenseState(e.target.value)}>
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
						<label className='frmLabel'>NPI</label>
						<Input type='text' required={true} value={npi} setValue={setNpi} />
						<label className='frmLabel'>Group NPI</label>
						<Input type='text' required={true} value={gnpi} setValue={setGnpi} />
						<label className='frmLabel'>Photo</label>
						<div>
							<input
								className='block w-full text-sm text-txtclr border-2 border-txtbox rounded-md cursor-pointer'
								type='file'
								onChange={handleFileChange}
							/>
						</div>
						<div className='mt-5 flex justify-center'>
							<Button
								type='submit'
								disabled={
									!fname ||
									!lname ||
									!email ||
									!phone ||
									!add ||
									!city ||
									!state ||
									!zip ||
									!title ||
									!license ||
									!licensestate ||
									!npi ||
									!gnpi ||
									!specialty
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
					<div className='mb-3 text-lg font-semibold text-center'>PHYSICIAN PROFILE</div>
					<div className='mb-3'>
						Physicians interested in obtaining a SUPERNOVA3X Software License should complete this Quick Start process in order to get up and
						running as quickly as possible.
					</div>
					<div className='mb-3'>
						To gain instant approval and access to SN3X software, complete the Quick Start process including signing the License Agreements.
					</div>
					<div>SN3X reserves the right to deny applicants for any reason.</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
