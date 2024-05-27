'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RandomStringMake } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import Link from 'next/link';
import ForgotPassword from '@/actions/login/ForgotPassword';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';

export default function SpnFP() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [username, setUsername] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const resetcode = RandomStringMake(5);

		try {
			const objData = {
				type: 'sponsor',
				email,
				username,
				resetcode,
				token,
			};
			//Encrypt data to send and send
			const fpData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await ForgotPassword(fpData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('User not found');
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
				const domain = process.env.DOMAIN;
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const tempFP = 'forgotPassword';

				//Set email data
				const dataFP = {
					domain: domain,
					toEmail: email,
					resetcode: resetcode,
				};

				//Send email
				emailjs.send(emlService, tempFP, dataFP, emlUser);

				toast.success('Please check your email to continue');
				router.push('/sponsors/login/resetpassword');
			}
		} catch (error) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setLoading(false);
		}
	};

	return (
		<PageTemplate>
			<div className='w-full py-7'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberEmp} alt='Sponsors' />
					</div>
					<div className='w-full mb-7 flex-auto'>
						<div className='w-full'>
							<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Forgot Password</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-4/5 sm:w-3/4 lg:w-1/2 2xl:w-1/3 mx-auto flex-auto'>
							<Input label='Email' type='email' id='email' autocomplete={true} required={true} value={email} setValue={setEmail} />
							<Input label='Username' type='text' id='uname' required={true} value={username} setValue={setUsername} />
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!email || !username}>
									Request Reset
								</Button>
							</div>
						</div>
					</form>
					<div className='w-full mt-5 flex justify-center'>
						<Link className='fgtLinkText' href='/sponsors/login'>
							&laquo; Back to Login
						</Link>
					</div>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
