'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import ForgotUsername from '@/actions/login/ForgotUsername';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';

export default function PhyFU() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const objData = {
			type: 'physician',
			email,
		};
		//Encrypt data to send and send
		const fuData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
		const encdData = await ForgotUsername(fuData);
		//Decrypt returned data
		const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
		const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
		const unames = data.unames;

		if (unames.length >= 1) {
			let uNames = '';
			const domain = process.env.DOMAIN;
			const emlService = process.env.EMAILJS_SERVICE;
			const emlUser = process.env.EMAILJS_USER;
			const tempFU = 'forgotUsername';

			unames.forEach((uname) => {
				if (!uNames) {
					uNames = uname;
				} else {
					uNames = uNames + ', ' + uname;
				}
			});

			//Set email data
			const dataFU = {
				domain: domain,
				toEmail: email.toLowerCase(),
				unames: uNames,
			};

			//Send emails
			emailjs.send(emlService, tempFU, dataFU, emlUser);

			toast.success('Please check your email for username');
			setLoading(false);
			router.push('/physicians/login');
		}
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
								<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Forgot Username</div>
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-3/5 lg:w-1/3 mx-auto flex-auto'>
							<Input label='Email' type='email' id='email' autocomplete={true} required={true} value={email} setValue={setEmail} />
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!email}>
									Send Request
								</Button>
							</div>
						</div>
					</form>
					<div className='w-full mt-5 flex justify-center'>
						<Link className='fgtLinkText' href='/physicians/login'>
							&laquo; Back to Login
						</Link>
					</div>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
