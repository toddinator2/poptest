'use client';
import React, { useState } from 'react';
import { FixDob, FixPhone, FormatDob, FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/Functions';
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
	const [dob, setDob] = useState('');
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

		//Fix DOB to only numbers
		let newDob = '';
		newDob = await FixDob(dob);

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		//Create a new password
		const pword = RandomStringMake(10);

		try {
			const objData = {
				register: 'subscribers',
				fname,
				lname,
				dob: newDob,
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
					setDob('');
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	function handleDob(e) {
		const value = e.target.value;
		const chkDob = FormatDob(value);
		setDob(chkDob);
	}

	return (
		<PageTemplate>
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberPts} priority={true} alt='Subscribers' />
					</div>
					<div className='mb-5 text-2xl lg:text-3xl flex justify-center'>For Patients</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full mb-5 lg:mb-0 lg:w-1/2 lg:pe-7 2xl:flex 2xl:justify-end'>
							<Image className='w-full 2xl:w-4/5 h-auto rounded-3xl border-4 border-drkgry' src={couple} priority={true} alt='Patients' />
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='mb-3 text-xl lg:text-2xl text-center text-txtblu'>
								Access abundant, affordable, and high-quality Physician-led healthcare with SN3X
							</div>
							<div className='text-left text-sm lg:text-base'>
								<div className='mb-5'>
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
			<div className='w-full py-7 border-b-2 border-dotted border-drkgry'>
				<div className='w-5/6 md:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='w-full'>
						<div className='text-2xl lg:text-3xl 2xl:text-4xl mb-7 text-center'>Switch to Professional Healthcare today!</div>
					</div>
					<div className='w-full flex-auto lg:flex'>
						<div className='w-full lg:w-1/2 lg:pe-7 2xl:ps-9'>
							<div className='text-base xl:text-lg text-lgtblu font-semibold'>Physician-led Healthcare</div>
							<div className='mb-5 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>In-office and Virtual-visits</li>
									<li>Diagnostic and Lab Testing</li>
									<li>Imaging, Injections, and Procedures</li>
									<li>In-house Pharmacy &amp; Rx Plans</li>
									<li>Much, much more</li>
								</ul>
							</div>
							<div className='text-base xl:text-lg text-lgtblu font-semibold'>Multiple Membership Options</div>
							<div className='mb-5 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li className='pbPgText'>Unlimited and Custom</li>
								</ul>
							</div>
							<div className='text-base xl:text-lg text-lgtblu font-semibold'>Multiple Sponsorship Options</div>
							<div className='mb-5 lg:mb-0 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Self Sponsorship for Individual Membership</li>
									<li>Employer Sponsorship for Employee Membership</li>
									<li>Private Sponsorship for family, church, and others Membership</li>
									<li>Philanthropy Sponsorship for Charitable Membership</li>
								</ul>
							</div>
						</div>
						<div className='w-full lg:w-1/2 lg:ps-7 2xl:pe-9'>
							<div className='text-base xl:text-lg text-lgtblu font-semibold'>Better Service</div>
							<div className='mb-5 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>On Time &ndash; More Time Appointments</li>
									<li>Diagnostic and Lab Testing</li>
									<li>Imaging, Injections, and Procedures</li>
									<li>In-house Pharmacy &amp; Rx Plans</li>
									<li>Much, much more</li>
								</ul>
							</div>
							<div className='text-base xl:text-lg text-lgtblu font-semibold'>Free Registration</div>
							<div className='mb-5 ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Electronic, complete and thorough</li>
									<li>Updateable in real-time</li>
								</ul>
							</div>
							<div className='text-base xl:text-lg text-lgtblu font-semibold'>The Subscriber Sphere</div>
							<div className='ps-12 text-sm xl:text-base'>
								<ul className='list-disc'>
									<li>Access your medical history in real-time</li>
									<li>Schedule Office/Virtual Appointments</li>
									<li>Request refills</li>
									<li>Message your Physicians and medical teams</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full py-7' id='preRegister'>
				<div className='w-5/6 md:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='w-full'>
						<div className='mb-2 text-2xl lg:text-3xl 2xl:text-4xl text-center'>Get started today!</div>
						<div className='mb-7 text-lg lg:text-xl 2xl:text-2xl text-center'>Reserve your free lifetime membership now!</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-4/5 sm:w-3/4 lg:w-1/2 2xl:w-1/3 mx-auto flex-auto'>
							<Input label='First Name' type='text' id='fname' required={true} value={fname} setValue={setFname} />
							<Input label='Last Name' type='text' id='lname' required={true} value={lname} setValue={setLname} />
							<ChkInput label='Zip Code' type='text' value={zip} setValue={setZip} />
							<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
							<Input label='Mobile Phone' type='tel' id='phone' required={true} value={phone} funcCall={handlePhone} />
							<Input label='DOB (mmddyyyy)' type='text' value={dob} funcCall={handleDob} />
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!fname || !lname || !email || !phone || !dob}>
									Register
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
			{loading && <Spinner />}
		</PageTemplate>
	);
}
