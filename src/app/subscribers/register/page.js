'use client';
import React, { useState } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
import { FixDob, FixPhone, FormatDob, FormatPhoneNumber, FormatZip, IsValidEmail, RandomStringMake } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Register from '@/actions/global/register/Register';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPts from '@/assets/images/hmpgIcoPts.png';

export default function SubRegister() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const router = useRouter();
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [dob, setDob] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [uname, setUname] = useState('');
	const [newPword, setNewPword] = useState('');
	const [cnfPword, setCnfPword] = useState('');
	const [docComp, setDocComp] = useState('');
	const [docName, setDocName] = useState('');
	const [docPhone, setDocPhone] = useState('');
	const [docCity, setDocCity] = useState('');
	const [docState, setDocState] = useState('');
	const [docZip, setDocZip] = useState('');
	const [empComp, setEmpComp] = useState('');
	const [empName, setEmpName] = useState('');
	const [empEmail, setEmpEmail] = useState('');
	const [empPhone, setEmpPhone] = useState('');
	const [empCity, setEmpCity] = useState('');
	const [empState, setEmpState] = useState('');
	const [empZip, setEmpZip] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (address) {
			toast.success('Patient Registered Successfully');
			return;
		}

		//Check emails
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid patient email');
			document.getElementById('email').focus();
			return;
		}
		if (empEmail) {
			if (!IsValidEmail(empEmail)) {
				toast.error('Please enter a valid sponsor email');
				document.getElementById('email').focus();
				return;
			}
		}

		//Check Password
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

		//Fix DOB
		const fixedDOB = FixDob(dob);

		//Fix Phone Numbers
		const ptPhone = FixPhone(phone);
		const dcPhone = FixPhone(docPhone);
		const emPhone = FixPhone(empPhone);

		//Set values for Doc and Employer names and phones
		let ptDocName = '';
		let ptDocPhn = '';
		let ptEmpComp = '';
		let ptEmpPhn = '';
		if (dcPhone) {
			ptDocName = docName;
			ptDocPhn = dcPhone;
		}
		if (emPhone) {
			ptEmpComp = empComp;
			ptEmpPhn = emPhone;
		}

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		try {
			const objData = {
				register: 'subscribers',
				fname,
				lname,
				dob: fixedDOB,
				email,
				username: uname,
				password: newPword,
				mphone: ptPhone,
				pcpname: ptDocName,
				pcpphone: ptDocPhn,
				employer: ptEmpComp,
				employerphone: ptEmpPhn,
				resetcreds: false,
				resetcode: '',
				verifycode,
				docComp,
				docName: ptDocName,
				docPhone: ptDocPhn,
				docCity,
				docState,
				docZip,
				empComp,
				empName,
				empEmail,
				empPhone: ptEmpPhn,
				empCity,
				empState,
				empZip,
				weightloss: false,
				offices: [],
				ofcObjId: '',
				token,
			};
			//Encrypt data to send and send
			const regData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await Register(regData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('Username is already taken, please try another');
				document.getElementById('username').focus();
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
				const domain = process.env.DOMAIN;
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const tempPtRegWelcomeSelf = 'ptRegWelcomeSelf';
				const tempPtRegVerifySelf = 'ptRegVerifySelf';
				let verifyLink = `${url}/subscribers/verify/email/${verifycode}`;

				//Set welcome email data
				const dataPtRegWelcomeSelf = {
					domain: domain,
					toName: fname,
					toEmail: email,
				};

				//Set verify email data
				const dataPtRegVerifySelf = {
					domain: domain,
					toName: fname,
					toEmail: email,
					verifyLink: verifyLink,
				};

				//Send emails
				emailjs.send(emlService, tempPtRegWelcomeSelf, dataPtRegWelcomeSelf, emlUser);
				emailjs.send(emlService, tempPtRegVerifySelf, dataPtRegVerifySelf, emlUser);

				toast.success('Registration Successful: Please watch for your verification email');
				router.push('/subscribers/login');
			}
		} catch (error) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setLoading(false);
		}
	};

	function handleDob(e) {
		const value = e.target.value;
		const chkDob = FormatDob(value);
		setDob(chkDob);
	}

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	function handleDocPhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setDocPhone(formattedPhoneNumber);
	}

	function handleDocZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setDocZip(formattedZip);
	}

	function handleEmpPhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setEmpPhone(formattedPhoneNumber);
	}

	function handleEmpZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setEmpZip(formattedZip);
	}

	return (
		<PageTemplate>
			<div className='pbpgSection pb-5'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={icoMemberPts} alt='Subscribers' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Patient Registration</div>
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-10 offset-1 d-flex justify-content-center'>
						<div className='pbpgText center'>
							Please fill in the Doctor and/or Sponsor Contact Forms if you would like Supernova3x to contact them about joining the Supernova3x Community
						</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-xl-evenly'>
						<div className='ptRegPtCol col-8 col-lg-4 col-xl-3 offset-2 offset-lg-4 offset-xl-0 px-5 py-3 mb-3 mb-xl-0'>
							<div className='row mb-3'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='ptRegColHdng'>Patient Information</div>
								</div>
							</div>
							<Input label='First Name' type='text' id='fname' required={true} value={fname} setValue={setFname} />
							<Input label='Last Name' type='text' id='lname' required={true} value={lname} setValue={setLname} />
							<Input label='DOB (mmddyyyy)' type='text' id='dob' required={true} value={dob} funcCall={handleDob} />
							<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
							<Input label='Mobile Phone #' type='tel' id='phone' required={true} value={phone} funcCall={handlePhone} />
							<ChkInput label='Address' type='text' id='setAddress' value={address} setValue={setAddress} />
							<Input label='Create a Username' type='text' id='username' required={true} value={uname} setValue={setUname} />
							<Input label='Create a Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' id='cnfPword' required={true} value={cnfPword} setValue={setCnfPword} />
						</div>
						<div className='ptRegDocCol col-8 col-lg-4 col-xl-3 offset-2 offset-lg-4 offset-xl-0 px-5 py-3 mb-3 mb-xl-0'>
							<div className='row mb-3'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='ptRegColHdng'>Doctor Contact Form</div>
								</div>
							</div>
							<Input label='Practice Name' type='text' id='docComp' value={docComp} setValue={setDocComp} />
							<Input label='Doctor Name' type='text' id='docName' value={docName} setValue={setDocName} />
							<Input label='Phone #' type='tel' id='docPhone' value={docPhone} funcCall={handleDocPhone} />
							<Input label='City' type='text' id='docCity' value={docCity} setValue={setDocCity} />
							<div className='frmLabel'>State</div>
							<select className='inpBorder form-control mb-2' id='docState' value={docState} onChange={(e) => setDocState(e.target.value)}>
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
							<Input label='Zip Code' type='text' id='docZip' value={docZip} funcCall={handleDocZip} />
						</div>
						<div className='ptRegEmpCol col-8 col-lg-4 col-xl-3 offset-2 offset-lg-4 offset-xl-0 px-5 py-3'>
							<div className='row mb-3'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='ptRegColHdng'>Sponsor Contact Form</div>
								</div>
							</div>
							<Input label='Company Name' type='text' id='empComp' value={empComp} setValue={setEmpComp} />
							<Input label='Name' type='text' id='empName' value={empName} setValue={setEmpName} />
							<Input label='Email' type='email' id='empEmail' value={empEmail} setValue={setEmpEmail} />
							<Input label='Phone #' type='tel' id='empPhone' value={empPhone} funcCall={handleEmpPhone} />
							<Input label='City' type='text' id='empCity' value={empCity} setValue={setEmpCity} />
							<div className='frmLabel'>State</div>
							<select className='inpBorder form-control mb-2' id='empState' value={empState} onChange={(e) => setEmpState(e.target.value)}>
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
							<Input label='Zip Code' type='text' id='empZip' value={empZip} funcCall={handleEmpZip} />
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-12 d-flex justify-content-center'>
							<Button border='0000FF'>Submit Information</Button>
						</div>
					</div>
				</form>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
