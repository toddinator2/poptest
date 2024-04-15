'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RandomStringMake } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import Link from 'next/link';
import ForgotPassword from '@/actions/global/login/ForgotPassword';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';

export default function SpnFP() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
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
				type: 'patient',
				email,
				username,
				resetcode,
			};
			//Encrypt data to send and send
			const fpData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await ForgotPassword(fpData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error(data.msg);
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

				toast.success(data.msg);
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
			<div className='pbpgSection noBorder pb-5'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={icoMemberEmp} alt='Sponsors' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Forgot Password</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-center'>
						<div className='col-8 col-md-4 col-xl-3 '>
							<Input label='Email' type='email' id='email' autocomplete={true} required={true} value={email} setValue={setEmail} />
							<Input label='Username' type='text' id='uname' required={true} value={username} setValue={setUsername} />
							<div className='mt-4 d-flex justify-content-center'>
								<Button type='submit' border='8000FF'>
									Request Reset
								</Button>
							</div>
						</div>
					</div>
				</form>
				<div className='row mt-4'>
					<div className='col-12 d-flex justify-content-center'>
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
