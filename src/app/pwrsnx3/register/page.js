'use client';
import React, { useState } from 'react';
import { FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Register from '@/actions/global/register/Register';
import Input from '@/components/global/forms/input/Input';
import ChkInput from '@/components/global/forms/input/ChkInput';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';

export default function S3xRegister() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [phone, setPhone] = useState('');
	const [uname, setUname] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Test for bots
		if (address) {
			toast.success('Patient Registered Successfully');
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
			//Create the temporary password
			const tmpPwrd = RandomStringMake(10);

			//Create the email verification code
			const verifycode = RandomStringMake(64);

			//Create the credentials reset code
			const resetcode = RandomStringMake(5);

			const objData = {
				register: 's3x',
				fname,
				lname,
				email,
				phone,
				username: uname,
				password: tmpPwrd,
				resetcode,
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
				toast.error('Email already exists, please use another email');
				document.getElementById('email').focus();
				return;
			}
			if (data.status === 401) {
				toast.error('Username already exists, please choose another');
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
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const tempS3xNewUser = 's3xNewUser';
				const verifyLink = `${url}/pwrsnx3/verify/email/${verifycode}`;

				//Set verify email data
				const dataS3xNewUser = {
					toName: fname,
					toEmail: email,
					verifyLink: verifyLink,
					username: uname.toLowerCase(),
					password: tmpPwrd,
				};

				//Send email
				emailjs.send(emlService, tempS3xNewUser, dataS3xNewUser, emlUser);
				toast.success('User added successfully');
			}

			setFname('');
			setLname('');
			setEmail('');
			setPhone('');
			setUname('');
			setLoading(false);
		} catch (err) {
			toast.error('Network Error: Please try again');
			setLoading(false);
		}
	};

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='row mt-5 d-flex justify-content-center'>
					<div className='col-8 col-md-4 col-xl-3 '>
						<Input label='First Name' type='text' required={true} value={fname} setValue={setFname} />
						<Input label='Last Name' type='text' required={true} value={lname} setValue={setLname} />
						<Input label='Email' type='email' id='email' required={true} value={email} setValue={setEmail} />
						<ChkInput label='Address' type='text' id='setAddress' value={address} setValue={setAddress} />
						<Input label='Phone #' type='tel' required={true} value={phone} funcCall={handlePhone} />
						<Input label='Username' type='text' id='username' required={true} value={uname} setValue={setUname} />
						<div className='row mt-4'>
							<div className='col-12 d-flex justify-content-center'>
								<Button type='submit' border='adb5bd' disabled={loading || !fname || !lname || !email || !phone || !uname}>
									Save User
								</Button>
							</div>
						</div>
					</div>
				</div>
			</form>
			{loading && <Spinner />}
		</>
	);
}
