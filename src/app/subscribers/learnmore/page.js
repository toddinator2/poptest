'use client';
import React, { useState } from 'react';
import { FixPhone, FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/Functions';
import Image from 'next/image';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Register from '@/actions/register/Register';
import GetPtUname from '@/actions/get/getptuname/GetPtUname';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPts from '@/assets/images/hmpgIcoPts.png';
import couple from '@/assets/images/lmPtsCouple.png';

export default function SubLearnMore() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [zip, setZip] = useState('');
	const [loading, setLoading] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (zip) {
			toast.success('Patient Registered Successfully');
			return;
		}

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid patient email');
			document.getElementById('email').focus();
			return;
		}

		//Fix Phone Number
		const ptPhone = FixPhone(phone);

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		//Create a new password
		const pword = RandomStringMake(10);

		try {
			const objData = {
				register: 'subscribers',
				fname,
				lname,
				email,
				phone: ptPhone,
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
				let uname = '';

				//get new username by verifycode
				const objData = {
					verifycode: verifycode,
				};
				//Encrypt data to send and send
				const ptData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
				const getPt = await GetPtUname(ptData);
				//Decrypt returned data
				const decryptedPtData = CryptoJS.AES.decrypt(getPt, cryptoKey);
				const patientData = JSON.parse(decryptedPtData.toString(CryptoJS.enc.Utf8));
				uname = patientData.uname;
				const ptStatus = patientData.status;

				if (ptStatus === 200) {
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
						username: uname,
						password: pword,
					};

					//Send emails
					emailjs.send(emlService, tempPtRegWelcomeSelf, dataPtRegWelcomeSelf, emlUser);
					emailjs.send(emlService, tempPtRegVerifySelf, dataPtRegVerifySelf, emlUser);

					setFname('');
					setLname('');
					setEmail('');
					setPhone('');
					toast.success('Registration Successful: Please watch for verification email');
				}
			}
		} catch (err) {
			toast.error(err);
			return;
		} finally {
			setLoading(false);
		}
	};

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	return (
		<PageTemplate>
			<div className='pbpgSection pb-4'>
				<div className='pbpgContainer'>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='icoSectionHdng' src={icoMemberPts} alt='Subscribers' />
						</div>
					</div>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>For Patients</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Image className='pbColImg' src={couple} priority={true} alt='Patients' />
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='pbpgSubHdng'>
								<div className='mb-4'>Access abundant, affordable, and high-quality Physician-led healthcare with SN3X</div>
							</div>
							<div className='pbpgText'>
								<div className='mb-3'>
									You deserve access to a wider range of medical services and real doctors at lower prices. Experience the difference of
									Professional Healthcare for yourself, today!
								</div>
								<div>
									Choose SN3X for physician-supervised healthcare and save money. Your board-certified physician and their staff will provide
									you with professional healthcare services that you deserve.
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>Switch to Professional Healthcare today!</div>
						</div>
					</div>
					<div className='row'>
						<div className='pbColSides mb-3 mb-xl-0'>
							<div className='row mb-2'>
								<div className='col-12'>
									<div className='pbpgText blu'>
										<strong>Physician-led Healthcare</strong>
									</div>
									<ul>
										<li>In-office and Virtual-visits</li>
										<li>Diagnostic and Lab Testing</li>
										<li>Imaging, Injections, and Procedures</li>
										<li>In-house Pharmacy &amp; Rx Plans</li>
										<li>Much, much more</li>
									</ul>
								</div>
							</div>
							<div className='row mb-2'>
								<div className='col-12'>
									<div className='pbpgText blu'>
										<strong>Multiple Membership Options</strong>
									</div>
									<ul>
										<li className='pbPgText'>Unlimited and Custom</li>
									</ul>
								</div>
							</div>
							<div className='row mb-2'>
								<div className='col-12'>
									<div className='pbpgText blu'>
										<strong>Multiple Sponsorship Options</strong>
									</div>
									<ul>
										<li>Self Sponsorship for Individual Membership</li>
										<li>Employer Sponsorship for Employee Membership</li>
										<li>Private Sponsorship for family, church, and others Membership</li>
										<li>Philanthropy Sponsorship for Charitable Membership</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='pbColCenter d-none d-xl-block'></div>
						<div className='pbColSides'>
							<div className='row mb-2'>
								<div className='col-12'>
									<div className='pbpgText blu'>
										<strong>Better Service</strong>
									</div>
									<ul>
										<li>On Time &ndash; More Time Appointments</li>
										<li>Diagnostic and Lab Testing</li>
										<li>Imaging, Injections, and Procedures</li>
										<li>In-house Pharmacy &amp; Rx Plans</li>
										<li>Much, much more</li>
									</ul>
								</div>
							</div>
							<div className='row mb-2'>
								<div className='col-12'>
									<div className='pbpgText blu'>
										<strong>Free Registration</strong>
									</div>
									<ul>
										<li>Electronic, complete and thorough</li>
										<li>Updateable in real-time</li>
									</ul>
								</div>
							</div>
							<div className='row mb-2'>
								<div className='col-12'>
									<div className='pbpgText blu'>
										<strong>The Subscriber Sphere</strong>
									</div>
									<ul>
										<li>Access your medical history in real-time</li>
										<li>Schedule Office/Virtual Appointment&apos;s</li>
										<li>Request refills</li>
										<li>Message your Physicians and medical teams</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='pbpgSection py-4' id='preRegister'>
				<div className='pbpgContainer'>
					<div className='row mb-4'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='pbpgHdng'>
								Get started today!
								<br />
								Reserve your free lifetime membership now!
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='row d-flex justify-content-center'>
							<div className='col-8 col-md-4 col-xl-3 '>
								<Input label='First Name' type='text' id='fname' required={true} value={fname} setValue={setFname} />
								<Input label='Last Name' type='text' id='lname' required={true} value={lname} setValue={setLname} />
								<ChkInput label='Zip Code' type='text' value={zip} setValue={setZip} />
								<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
								<Input label='Mobile Phone' type='tel' id='phone' required={true} value={phone} funcCall={handlePhone} />
								<div className='my-4 d-flex justify-content-center'>
									<Button type='submit' border='0000ff' disabled={!fname || !lname || !email || !phone}>
										Register
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{loading && <Spinner />}
		</PageTemplate>
	);
}
