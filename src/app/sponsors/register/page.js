'use client';
import React, { useState } from 'react';
import './page.css';
import { FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/Functions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Register from '@/actions/register/Register';
import GetSponsor from '@/actions/get/getsponsor/GetSponsor';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberSpn from '@/assets/images/hmpgIcoEmp.png';

export default function EmpRegister() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [company, setCompany] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [phoneExt, setPhoneExt] = useState('');
	const [zip, setZip] = useState('');
	const [website, setWebsite] = useState('');
	const [type, setType] = useState('');
	const [loading, setLoading] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (zip) {
			toast.success('Sponsor Registered Successfully');
			return;
		}

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			return;
		}

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		//Create a new password
		const pword = RandomStringMake(10);

		try {
			const objData = {
				register: 'sponsors',
				fname,
				lname,
				company,
				email,
				phone,
				phoneext: phoneExt,
				website,
				type,
				password: pword,
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
				toast.error('Sponsor Did Not Save: Please try again');
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
				const tempSpnRegWelcome = 'spnRegWelcome';
				const tempSpnRegVerify = 'spnRegVerify';
				let verifyLink = `${url}/sponsors/verify/email/${verifycode}`;
				let uname = '';

				//get new username by verifycode
				const objData = {
					verifycode,
					token,
				};
				//Encrypt data to send and send
				const spnData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
				const getSpn = await GetSponsor(spnData);
				//Decrypt returned data
				const decryptedSpnData = CryptoJS.AES.decrypt(getSpn, cryptoKey);
				const sponsorData = JSON.parse(decryptedSpnData.toString(CryptoJS.enc.Utf8));
				uname = sponsorData.username;
				const spnStatus = sponsorData.status;

				if (spnStatus === 200) {
					//Set welcome email data
					const dataSpnRegWelcome = {
						domain: domain,
						compName: company,
						toEmail: email,
					};

					//Set verify email data
					const dataSpnRegVerify = {
						domain: domain,
						toName: fname + ' ' + lname,
						toEmail: email,
						verifyLink: verifyLink,
						username: uname,
						password: pword,
					};

					//Send emails
					emailjs.send(emlService, tempSpnRegWelcome, dataSpnRegWelcome, emlUser);
					emailjs.send(emlService, tempSpnRegVerify, dataSpnRegVerify, emlUser);

					setFname('');
					setLname('');
					setCompany('');
					setEmail('');
					setPhone('');
					setPhoneExt('');
					setWebsite('');
					setType('');
					toast.success('Registration Successful: Please watch for verification email');
				}
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	};

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	const handleType = (type) => {
		if (type === 'pvt') {
			setType('private');
		}
		if (type === 'crp') {
			setType('corporate');
		}
		if (type === 'phi') {
			setType('philanthropic');
		}
	};

	return (
		<PageTemplate>
			<div className='pbpgSection pb-5'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberSpn} alt='Sponsors' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>For Sponsors</div>
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>Free Sponsor Registration Form</div>
						</div>
					</div>
					<div className='row mb-4 d-flex justify-content-center'>
						<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
							{type === 'private' ? (
								<Button type='button' border='c175ff' onClick={(e) => handleType('pvt')}>
									<div className='spnRegBtnBigText'>Private</div>
									<div className='spnRegBtnSmText'>Family, Friends, Church</div>
								</Button>
							) : (
								<Button type='button' border='555' onClick={(e) => handleType('pvt')}>
									<div className='spnRegBtnBigText'>Private</div>
									<div className='spnRegBtnSmText'>Family, Friends, Church</div>
								</Button>
							)}
						</div>
						<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
							{type === 'corporate' ? (
								<Button type='button' border='c175ff' onClick={(e) => handleType('crp')}>
									<div className='spnRegBtnBigText'>Corporate</div>
									<div className='spnRegBtnSmText'>Employees</div>
								</Button>
							) : (
								<Button type='button' border='555' onClick={(e) => handleType('crp')}>
									<div className='spnRegBtnBigText'>Corporate</div>
									<div className='spnRegBtnSmText'>Employees</div>
								</Button>
							)}
						</div>
						<div className='col-12 col-sm-auto mb-3 mb-sm-0 d-flex justify-content-center'>
							{type === 'philanthropic' ? (
								<Button type='button' border='c175ff' onClick={(e) => handleType('phi')}>
									<div className='spnRegBtnBigText'>Philanthropic</div>
									<div className='spnRegBtnSmText'>Charity</div>
								</Button>
							) : (
								<Button type='button' border='555' onClick={(e) => handleType('phi')}>
									<div className='spnRegBtnBigText'>Philanthropic</div>
									<div className='spnRegBtnSmText'>Charity</div>
								</Button>
							)}
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='row d-flex justify-content-center'>
							<div className='col-8 col-md-4 col-xl-3 '>
								<Input label='Contact First Name' type='text' id='fname' required={true} value={fname} setValue={setFname} />
								<Input label='Contact Last Name' type='text' id='lname' required={true} value={lname} setValue={setLname} />
								<Input label='Company Name' type='text' required={true} value={company} setValue={setCompany} />
								<ChkInput label='Zip Code' type='text' value={zip} setValue={setZip} />
								<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
								<Input label='Phone' type='tel' id='phone' required={true} value={phone} funcCall={handlePhone} />
								<Input label='Phone Ext.' type='tel' value={phoneExt} setValue={setPhoneExt} />
								<Input label='Website' type='text' value={website} setValue={setWebsite} />
								<div className='mt-4 d-flex justify-content-center'>
									<Button type='submit' border='555' disabled={!fname || !lname || !email || !phone || !type}>
										Register
									</Button>
								</div>
							</div>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</PageTemplate>
	);
}
