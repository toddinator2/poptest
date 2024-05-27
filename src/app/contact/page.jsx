'use client';
import React, { useState } from 'react';
import { FormatPhoneNumber, IsValidEmail } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';

export default function Contact() {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [zip, setZip] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (zip) {
			toast.success('Your message was successfully received');
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

		try {
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

			//Set email data
			const dataObj = {
				domain: domain,
				toEmail: chadsEmail,
				fname: fname,
				lname: lname,
				email: email,
				phone: phone,
				message: message,
			};

			//Send emails
			emailjs.send(emlService, tempContact, dataObj, emlUser);

			toast.success('Your message was successfully received');
			setFname('');
			setLname('');
			setEmail('');
			setPhone('');
			setMessage('');
			setLoading(false);
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

	return (
		<PageTemplate>
			<div className='w-full py-7'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='w-full mb-7 flex-auto'>
						<div className='w-full'>
							<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Contact Us</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-4/5 sm:w-3/4 lg:w-1/2 2xl:w-1/3 mx-auto flex-auto'>
							<Input label='First Name' type='text' required={true} value={fname} setValue={setFname} />
							<Input label='Last Name' type='text' required={true} value={lname} setValue={setLname} />
							<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
							<Input label='Phone' type='tel' required={true} value={phone} funcCall={handlePhone} />
							<ChkInput label='Zip' type='text' value={zip} setValue={setZip} />
							<div className='mb-1.5'>
								<label className='frmLabel'>Message:</label>
								<textarea
									className='inpTa form-control'
									rows={3}
									name='message'
									id='message'
									required={true}
									value={message}
									onChange={(e) => setMessage(e.target.value)}
								/>
							</div>
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!fname || !lname || !email || !phone || !message}>
									Send Message
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
