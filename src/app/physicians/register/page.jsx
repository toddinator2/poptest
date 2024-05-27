'use client';
import React, { useState } from 'react';
import { FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/Functions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Register from '@/actions/register/Register';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';

export default function PhyRegister() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [license, setLicense] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [npi, setNpi] = useState('');
	const [specialty, setSpecialty] = useState('');
	const [username, setUsername] = useState('');
	const [newPword, setNewPword] = useState('');
	const [cnfPword, setCnfPword] = useState('');
	const [isPhysician, setIsPhysician] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (city) {
			toast.success('Physician Information Received: We will be in contact within 3 business days');
			setLoading(false);
			return;
		}

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			setLoading(false);
			return;
		}

		//Check Password Requirements
		if (!newPword || newPword.length < 6) {
			toast.error('Password is required and must be at least 6 characters long');
			setNewPword('');
			setCnfPword('');
			document.getElementById('newPword').focus();
			return;
		}
		if (newPword !== cnfPword) {
			toast.error('Passwords do not match, please try again');
			setNewPword('');
			setCnfPword('');
			document.getElementById('newPword').focus();
			return;
		}

		//Check if Physician Checkbox checked
		if (!isPhysician) {
			toast.error('You must be a board-certified physician to continue');
			setLoading(false);
			return;
		}

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		try {
			const objData = {
				register: 'physicians',
				fname,
				lname,
				email,
				phone,
				username,
				password: newPword,
				license,
				state,
				npi,
				specialty,
				isphysician: isPhysician,
				verifycode,
				token,
			};
			//Encrypt data to send and send
			const regData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await Register(regData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('User already exists with this email, please check for verification email');
				setLoading(false);
				return;
			}
			if (data.status === 401) {
				toast.error('This username is already taken, please try another');
				document.getElementById('username').focus();
				setLoading(false);
				return;
			}
			if (data.status === 500) {
				toast.error('Network Error: Please try again');
				return;
			}
			if (data.status === 501) {
				toast.error('Invalid Data: Please try again');
				return;
			}

			if (data.status === 200) {
				const url = process.env.NEXTAUTH_URL;
				const enviro = process.env.ENVIRONMENT;
				const domain = process.env.DOMAIN;
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const tempPhyPreRegPhysician = 'phyPreRegPhysician';
				const tempPhyPreRegChad = 'phyPreRegChad';
				const verifyLink = `${url}/physicians/verify/email/${verifycode}`;
				let chadsEmail = '';

				//Set chads email
				if (enviro === 'pop' || enviro === 's3x') {
					chadsEmail = 'chad@supernova3x.com';
				} else {
					chadsEmail = 'todd@zaxxiss.com';
				}

				//Set doctor email data
				const dataDoc = {
					domain: domain,
					toName: fname,
					toEmail: email,
					verifyLink: verifyLink,
				};

				//Set Chads email data
				const dataChad = {
					chadsEmail: chadsEmail,
					domain: domain,
					name: fname + ' ' + lname,
					email: email,
					phone: phone,
					license: license,
					state: state,
					npi: npi,
					specialty: specialty,
				};

				//Send emails
				emailjs.send(emlService, tempPhyPreRegPhysician, dataDoc, emlUser);
				emailjs.send(emlService, tempPhyPreRegChad, dataChad, emlUser);

				toast.success('Success: Please check your email to continue');
				setFname('');
				setLname('');
				setEmail('');
				setPhone('');
				setUsername('');
				setNewPword('');
				setCnfPword('');
				setLicense('');
				setCity('');
				setState('');
				setNpi('');
				setSpecialty('');
				setIsPhysician(false);
				setLoading(false);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
			setLoading(false);
			return;
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	const handlePhysician = (e) => {
		const value = e.target.checked;
		setIsPhysician(value);
	};

	return (
		<PageTemplate>
			<div className='w-full py-7'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberPhy} alt='Physicians' />
					</div>
					<div className='w-full mb-7 flex-auto'>
						<div className='w-5/6 md:w-4/5 2xl:w-2/3 mb-7 mx-auto'>
							<div className='w-full'>
								<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Physician Verification Form</div>
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-3/5 lg:w-1/3 mx-auto flex-auto'>
							<Input label='First Name' type='text' required={true} value={fname} setValue={setFname} />
							<Input label='Last Name' type='text' required={true} value={lname} setValue={setLname} />
							<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
							<Input label='Phone' type='tel' required={true} value={phone} funcCall={handlePhone} />
							<Input label='License' type='text' required={true} value={license} setValue={setLicense} />
							<ChkInput label='City' type='text' value={city} setValue={setCity} />
							<div className='frmLabel'>State</div>
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
							<Input label='Individual NPI' type='text' required={true} value={npi} setValue={setNpi} />
							<Input label='Specialty' type='text' required={true} value={specialty} setValue={setSpecialty} />
							<Input label='Username' type='text' id='username' required={true} value={username} setValue={setUsername} />
							<Input label='Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' required={true} value={cnfPword} setValue={setCnfPword} />
							<div className='w-full mt-3 flex items-center'>
								<div className='w-1/6 flex justify-end'>
									<CheckBox check={isPhysician} funcCall={handlePhysician} />
								</div>
								<div className='w-5/6 ps-2'>
									<div className='text-xs sm:text-sm'>I am a board-certified physician</div>
								</div>
							</div>
							<div className='w-full mt-4 flex justify-center'>
								<Button
									type='submit'
									disabled={
										!fname ||
										!lname ||
										!email ||
										!phone ||
										!license ||
										!state ||
										!npi ||
										!specialty ||
										!username ||
										!newPword ||
										!cnfPword ||
										!isPhysician
									}
								>
									Register
								</Button>
							</div>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</PageTemplate>
	);
}
