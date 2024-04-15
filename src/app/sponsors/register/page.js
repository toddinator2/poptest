'use client';
import React, { useState } from 'react';
import './page.css';
import { useRouter } from 'next/navigation';
import { geocode, RequestType } from 'react-geocode';
import { FixPhone, FormatNumEmps, FormatPhoneNumber, FormatZip, IsValidEmail, RandomStringMake } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Register from '@/actions/global/register/Register';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';

export default function SpnRegister() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const gglKey = process.env.MAPS_KEY;
	const router = useRouter();
	const [type, setType] = useState('private');
	const [compName, setCompName] = useState('');
	const [contName, setContName] = useState('');
	const [email, setEmail] = useState('');
	const [contPhone, setContPhone] = useState('');
	const [phoneExt, setPhoneExt] = useState('');
	const [address, setAddress] = useState('');
	const [website, setWebsite] = useState('');
	const [uname, setUname] = useState('');
	const [newPword, setNewPword] = useState('');
	const [cnfPword, setCnfPword] = useState('');
	const [legalName, setLegalName] = useState('');
	const [eid, setEid] = useState('');
	const [add1, setAdd1] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [industry, setIndustry] = useState('');
	const [numEmps, setNumEmps] = useState('');
	const [openCrp, setOpenCrp] = useState(false);
	const [openPhi, setOpenPhi] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let latitude;
		let longitude;

		//Test for bots
		if (address) {
			toast.success('Sponsor Registered Successfully');
			return;
		}

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid contact email');
			document.getElementById('email').focus();
			return;
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

		//Seperate first and last names and add for compnay name if needed
		let useCompName = '';
		const name = contName.split(' ');
		const fName = name[0];
		const lName = contName.substring(name[0].length).trim();
		if (!compName) {
			useCompName = fName + ' ' + lName;
		} else {
			useCompName = compName;
		}

		//Set longitude and latitude
		if (add1 && city && state && zip) {
			const convertAddress = `${add1}, ${city}, ${state}, ${zip}`;
			await geocode(RequestType.ADDRESS, convertAddress, {
				key: gglKey,
				language: 'en',
				region: 'us',
			})
				.then((response) => {
					latitude = response.results[0].geometry.location.lat.toString();
					longitude = response.results[0].geometry.location.lng.toString();
				})
				.catch((error) => {
					console.error(error);
				});
		}

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		//Fix Phone Number
		const phone = FixPhone(contPhone);

		try {
			const objData = {
				register: 'sponsors',
				type: type,
				companyname: useCompName,
				fname: fName,
				lname: lName,
				email: email,
				phone: phone,
				phoneext: phoneExt,
				website: website,
				username: uname,
				password: newPword,
				verifycode,
				legalname: legalName,
				eid: eid,
				add1: add1,
				add2: add2,
				city: city,
				state: state,
				zip: zip,
				industry: industry,
				numemps: numEmps,
				latitude: latitude,
				longitude: longitude,
				token,
			};
			//Encrypt data to send and send
			const regData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await Register(regData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('Username already exists, please try another');
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
				const enviro = process.env.ENVIRONMENT;
				const domain = process.env.DOMAIN;
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const tempSpnRegWelcome = 'spnRegWelcome';
				const tempSpnRegChad = 'spnRegChad';
				const tempSpnRegVerify = 'spnRegVerify';
				const verifyLink = `${url}/sponsors/verify/email/${verifycode}`;
				let chadsEmail = '';

				//Set chads email
				if (enviro === 'pop' || enviro === 's3x') {
					chadsEmail = 'chad@supernova3x.com';
				} else {
					chadsEmail = 'todd@zaxxiss.com';
				}

				//Set welcome email data
				const dataSpnRegWelcome = {
					domain: domain,
					compName: useCompName,
					toEmail: email,
				};

				//Set verify email data
				const dataSpnRegVerify = {
					domain: domain,
					toName: contName,
					verifyLink: verifyLink,
					toEmail: email,
				};

				//Set data for Chads email
				const dataSpnRegChad = {
					chadsEmail: chadsEmail,
					domain: domain,
					spnType: type,
					company: useCompName,
					contact: contName,
					email: email,
					phone: contPhone,
					ext: phoneExt,
					website: website,
					legal: legalName,
					eid: eid,
					add1: add1,
					add2: add2,
					city: city,
					state: state,
					zip: zip,
					industry: industry,
					numEmps: numEmps,
				};

				//Send emails
				emailjs.send(emlService, tempSpnRegWelcome, dataSpnRegWelcome, emlUser);
				emailjs.send(emlService, tempSpnRegVerify, dataSpnRegVerify, emlUser);
				if (type === 'corporate' || type === 'philanthropic') {
					emailjs.send(emlService, tempSpnRegChad, dataSpnRegChad, emlUser);
				}

				toast.success('Registration Successful: Please watch for your verification email');
				router.push('/sponsors/login');
			}
		} catch (error) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setLoading(false);
		}
	};

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setContPhone(formattedPhoneNumber);
	}

	function handlePhoneExt(e) {
		const value = e.target.value;
		const formattedExt = FormatZip(value);
		setPhoneExt(formattedExt);
	}

	function handleZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setZip(formattedZip);
	}

	function handleEmps(e) {
		const value = e.target.value;
		const formattedEmps = FormatNumEmps(value);
		setNumEmps(formattedEmps);
	}

	const handleType = (type) => {
		if (type === 'pvt') {
			setType('private');
			setOpenCrp(false);
			setOpenPhi(false);
		}
		if (type === 'crp') {
			setType('corporate');
			openCrp ? setOpenCrp(false) : setOpenCrp(true);
			setOpenPhi(false);
		}
		if (type === 'phi') {
			setType('philanthropic');
			setOpenCrp(false);
			openPhi ? setOpenPhi(false) : setOpenPhi(true);
		}
	};

	return (
		<PageTemplate>
			<div className='pbpgSection pb-5'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={icoMemberEmp} alt='Sponsors' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Sponsor Registration</div>
					</div>
				</div>
				<div className='row mb-2'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgText center'>What type of Sponsor are you?</div>
					</div>
				</div>
				<div className='row mb-5 d-flex justify-content-center'>
					<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
						<Button type='button' border='8000ff' onClick={(e) => handleType('pvt')}>
							<div className='spnRegBtnBigText'>Private</div>
							<div className='spnRegBtnSmText'>Family, Friends, Church</div>
						</Button>
					</div>
					<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
						<Button type='button' border='8000ff' onClick={(e) => handleType('crp')}>
							<div className='spnRegBtnBigText'>Corporate</div>
							<div className='spnRegBtnSmText'>Employees</div>
						</Button>
					</div>
					<div className='col-12 col-sm-auto d-flex justify-content-center'>
						<Button type='button' border='8000ff' onClick={(e) => handleType('phi')}>
							<div className='spnRegBtnBigText'>Philanthropic</div>
							<div className='spnRegBtnSmText'>Charity</div>
						</Button>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-center justify-content-lg-evenly'>
						<div className='spnRegColBorder col-10 col-md-8 col-lg-5 col-xl-4 px-5 py-3 mb-3 mb-lg-0'>
							<div className='row mb-3'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='spnRegColHdng'>Basic Information</div>
								</div>
							</div>
							<Input label='Company Name' type='text' value={compName} setValue={setCompName} />
							<Input label='Contact Full Name' type='text' required={true} value={contName} setValue={setContName} />
							<Input label='Contact Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
							<Input label='Contact Phone' type='tel' required={true} value={contPhone} funcCall={handlePhone} />
							<Input label='Contact Phone Ext.' type='tel' value={phoneExt} funcCall={handlePhoneExt} />
							<ChkInput label='Address' type='text' value={address} setValue={setAddress} />
							<Input label='Company Website' type='text' value={website} setValue={setWebsite} />
							<Input label='Create a Username' type='text' id='username' required={true} value={uname} setValue={setUname} />
							<Input label='Create a Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' required={true} value={cnfPword} setValue={setCnfPword} />
						</div>
						{openCrp && (
							<div className='spnRegColBorder col-10 col-md-8 col-lg-5 col-xl-4 px-5 py-3 mb-3 mb-lg-0'>
								<div className='row mb-3'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='spnRegColHdng'>Corporation Information</div>
									</div>
								</div>
								<Input label='Corporate Legal Name' type='text' value={legalName} setValue={setLegalName} />
								<Input label='Corporate EID Number' type='text' value={eid} setValue={setEid} />
								<Input label='Corporate Address 1' type='text' value={add1} setValue={setAdd1} />
								<Input label='Corporate Address 2' type='text' value={add2} setValue={setAdd2} />
								<Input label='City' type='text' value={city} setValue={setCity} />
								<div className='frmLabel'>State</div>
								<select className='inpBorder form-control mb-2' value={state} onChange={(e) => setState(e.target.value)}>
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
								<Input label='Zip Code' type='text' value={zip} funcCall={handleZip} />
								<Input label='Industry' type='text' value={industry} setValue={setIndustry} />
								<Input label='# of Employees' type='text' value={numEmps} funcCall={handleEmps} />
							</div>
						)}
						{openPhi && (
							<div className='spnRegColBorder col-10 col-md-8 col-lg-5 col-xl-4 px-5 py-3 mb-3 mb-lg-0'>
								<div className='row mb-3'>
									<div className='col-12 d-flex justify-content-center'>
										<div className='spnRegColHdng'>Philanthropic Information</div>
									</div>
								</div>
								<Input label='Sponsor Legal Name' type='text' value={legalName} setValue={setLegalName} />
								<Input label='Sponsor Tax ID or SSN' type='text' value={eid} setValue={setEid} />
								<Input label='Sponsor Address 1' type='text' value={add1} setValue={setAdd1} />
								<Input label='Sponsor Address 2' type='text' value={add2} setValue={setAdd2} />
								<Input label='City' type='text' value={city} setValue={setCity} />
								<div className='frmLabel'>State</div>
								<select className='inpBorder form-control mb-2' value={state} onChange={(e) => setState(e.target.value)}>
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
								<Input label='Zip Code' type='text' value={zip} funcCall={handleZip} />
								<Input label='Charity Type' type='text' value={industry} setValue={setIndustry} />
								<Input label='# of Beneficiaries' type='text' value={numEmps} funcCall={handleEmps} />
							</div>
						)}
					</div>
					<div className='row mt-4'>
						<div className='col-12 d-flex justify-content-center'>
							<Button border='8000ff'>Submit Information</Button>
						</div>
					</div>
				</form>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
