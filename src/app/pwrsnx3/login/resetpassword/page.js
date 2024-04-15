'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import ResetPassword from '@/actions/global/login/ResetPassword';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberS3x from '@/assets/images/hmpgIcoS3x.png';

export default function S3xResetPassword() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const router = useRouter();
	const [code, setCode] = useState('');
	const [newPword, setNewPword] = useState('');
	const [cnfPword, setCnfPword] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			//Check Password
			if (!newPword || newPword.length < 6) {
				toast.error('Password is required and must be at least 6 characters long');
				setNewPword('');
				setCnfPword('');
				document.getElementById('newPword').focus();
				return;
			}
			if (newPword !== cnfPword) {
				toast.error('Passwords do not match, please try again');
				setNewPword('');
				setCnfPword('');
				document.getElementById('newPword').focus();
				return;
			}

			const objData = {
				type: 's3x',
				resetcode: code,
				password: newPword,
				token,
			};
			//Encrypt data to send and send
			const rpData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await ResetPassword(rpData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('Invalid Reset Code, please check and try again');
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
				toast.success('Password updated successfully');
				router.push('/pwrsnx3');
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
				<div className='row ps-3'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={icoMemberS3x} alt='Supernova3x' />
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Reset Password</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-center'>
						<div className='col-8 col-md-4 col-xl-3 '>
							<Input label='Reset Code' type='text' id='code' required={true} value={code} setValue={setCode} />
							<Input label='New Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' id='cnfPword' required={true} value={cnfPword} setValue={setCnfPword} />
							<div className='mt-4 d-flex justify-content-center'>
								<Button type='submit' border='CACAD9'>
									Save Password
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
