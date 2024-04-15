'use client';
import React, { useState } from 'react';
import { FormatPhoneNumber, IsValidEmail } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import logo from '@/assets/images/logoLgt.png';

export default function Contact() {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [zip, setZip] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (zip) {
			toast.success('Thank You: Inquiry Received Successfully');
			return;
		}

		//Check emails
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid email');
			document.getElementById('email').focus();
			return;
		}

		const domain = process.env.DOMAIN;
		const enviro = process.env.ENVIRONMENT;
		const emlService = process.env.EMAILJS_SERVICE;
		const emlUser = process.env.EMAILJS_USER;
		const tempContact = 'contactus';
		let chadsEmail = '';

		//Set chads email
		if (enviro === 'pop' || enviro === 's3x') {
			chadsEmail = 'chad@supernova3x.com';
		} else {
			chadsEmail = 'todd@zaxxiss.com';
		}

		try {
			//Set contact email data
			const dataContact = {
				domain: domain,
				fname: fname,
				lname: lname,
				email: email,
				phone: phone,
				message: message,
				toEmail: chadsEmail,
			};

			//Send email
			emailjs.send(emlService, tempContact, dataContact, emlUser);
			toast.success('Thank You: Inquiry Received Successfully');
		} catch (error) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setFname('');
			setLname('');
			setEmail('');
			setPhone('');
			setZip('01234');
			setMessage('');
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
			<div className='pbpgSection noBorder pb-5'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={logo} priority={true} alt='Supernova3x' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Contact Us</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-xl-evenly'>
						<div className='ptRegPtCol col-8 col-lg-4 col-xl-3 offset-2 offset-lg-4 offset-xl-0 px-5 py-3 mb-3 mb-xl-0'>
							<Input label='First Name' type='text' id='fname' required={true} value={fname} setValue={setFname} />
							<Input label='Last Name' type='text' id='lname' required={true} value={lname} setValue={setLname} />
							<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
							<Input label='Phone #' type='tel' id='phone' required={true} value={phone} funcCall={handlePhone} />
							<ChkInput label='Zip Code' type='text' value={zip} setValue={setZip} />
							<div className='row mb-2'>
								<div className='col-12'>
									<label className='frmLabel'>Message:</label>
								</div>
								<div className='col-12'>
									<textarea className='inpBorder form-control' rows='3' required value={message} onChange={(e) => setMessage(e.target.value)} />
								</div>
							</div>
						</div>
					</div>
					<div className='row mt-4'>
						<div className='col-12 d-flex justify-content-center'>
							<Button border='CACAD9' disabled={!fname || !lname || !email || !phone || !message}>
								Send Email
							</Button>
						</div>
					</div>
				</form>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
