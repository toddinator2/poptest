'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ResetPassword from '@/actions/login/ResetPassword';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';

export default function SpnRP() {
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
				type: 'sponsor',
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
				router.push('/sponsors/login');
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
						<div className='w-5/6 md:w-4/5 2xl:w-2/3 mb-7 mx-auto'>
							<div className='w-full'>
								<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Reset Password</div>
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-3/5 lg:w-1/3 mx-auto flex-auto'>
							<Input label='Reset Code' type='text' id='code' required={true} value={code} setValue={setCode} />
							<Input label='New Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' id='cnfPword' required={true} value={cnfPword} setValue={setCnfPword} />
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!code || !newPword || !cnfPword}>
									Save Password
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
