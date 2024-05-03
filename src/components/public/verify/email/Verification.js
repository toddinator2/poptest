'use client';
import React, { useEffect, useRef, useState } from 'react';
import './Verification.css';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import VerifyEmail from '@/actions/verify/Email';
import Spinner from '@/components/global/spinner/Spinner';

export default function Verification({ type, verifycode }) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const router = useRouter();
	const buttonRef = useRef(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		const timer = setTimeout(() => {
			buttonRef.current.click();
		}, 500);

		return () => clearTimeout(timer);
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const objData = {
				type,
				verifycode,
				token,
			};
			//Encrypt data to send and send
			const verData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await VerifyEmail(verData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('User not found or already confirmed');
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
				toast.success('Verification Successful');
				if (type === 'patient') {
					router.push('/subscribers/demo');
				}
				if (type === 'sponsor') {
					router.push('/sponsors/login');
				}
				if (type === 's3x') {
					router.push('/pwrsnx3');
				}
				if (type === 'physicianprereg') {
					router.push(`/physicians/register/${verifycode}`);
				}
				if (type === 'physician') {
					router.push('/physicians/login');
				}
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='row mt-5'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='verBtn'>
						<button ref={buttonRef} onClick={handleSubmit}>
							Click me!
						</button>
					</div>
				</div>
			</div>
			{loading && <Spinner />}
		</>
	);
}
