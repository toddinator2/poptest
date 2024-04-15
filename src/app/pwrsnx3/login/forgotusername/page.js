'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Image from 'next/image';
import Link from 'next/link';
import ForgotUsername from '@/actions/global/login/ForgotUsername';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberS3x from '@/assets/images/hmpgIcoS3x.png';

export default function S3xFU() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const objData = {
			type: 's3x',
			email,
		};
		//Encrypt data to send and send
		const fuData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
		const encdData = await ForgotUsername(fuData);
		//Decrypt returned data
		const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
		const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
		const patients = data.users;

		if (patients.length >= 1) {
			let uNames = '';
			const domain = process.env.DOMAIN;
			const emlService = process.env.EMAILJS_SERVICE;
			const emlUser = process.env.EMAILJS_USER;
			const tempFU = 'forgotUsername';

			patients.forEach((pt) => {
				if (!uNames) {
					uNames = pt;
				} else {
					uNames = uNames + ', ' + pt;
				}
			});

			//Set email data
			const dataFU = {
				domain: domain,
				toEmail: email.toLowerCase(),
				unames: uNames,
			};

			//Send email
			emailjs.send(emlService, tempFU, dataFU, emlUser);

			toast.success('Please check your email for username');
			setLoading(false);
			router.push('/pwrsnx3');
		}
	};

	return (
		<PageTemplate>
			<div className='pbpgSection noBorder pb-5'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={icoMemberS3x} alt='Supernova3x' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Forgot Username</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-center'>
						<div className='col-8 col-md-4 col-xl-3 '>
							<Input label='Email' type='email' id='email' autocomplete={true} required={true} value={email} setValue={setEmail} />
							<div className='mt-4 d-flex justify-content-center'>
								<Button type='submit' border='CACAD9'>
									Send Request
								</Button>
							</div>
						</div>
					</div>
				</form>
				<div className='row mt-4'>
					<div className='col-12 d-flex justify-content-center'>
						<Link className='fgtLinkText' href='/pwrsnx3'>
							&laquo; Back to Login
						</Link>
					</div>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
