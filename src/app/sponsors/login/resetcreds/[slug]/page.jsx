'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import ResetCreds from '@/actions/login/ResetCreds';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberEmp from '@/assets/images/hmpgIcoEmp.png';

export default function SpnRC({ params }) {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const token = process.env.AUTH_TOKEN;
	const resetcode = params?.slug;
	const router = useRouter();
	const [newUname, setNewUname] = useState('');
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
				resetcode,
				username: newUname,
				password: newPword,
				token,
			};
			//Encrypt data to send and send
			const rcData = CryptoJS.AES.encrypt(JSON.stringify(objData), cryptoKey).toString();
			const encdData = await ResetCreds(rcData);
			//Decrypt returned data
			const decryptedData = CryptoJS.AES.decrypt(encdData, cryptoKey);
			const data = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));

			if (data.status === 400) {
				toast.error('Username is already taken, please try another');
				document.getElementById('username').focus();
				return;
			}
			if (data.status === 401) {
				toast.error('User not found, please try logging in again');
				router.push('/sponsors/login');
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
				toast.success('Credentials updated successfully, please login again');
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
						<div className='w-full'>
							<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Reset Credentials</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-4/5 sm:w-3/4 lg:w-1/2 2xl:w-1/3 mx-auto flex-auto'>
							<Input label='New Username' type='text' id='username' required={true} value={newUname} setValue={setNewUname} />
							<Input label='New Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' id='cnfPword' required={true} value={cnfPword} setValue={setCnfPword} />
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!newUname || !newPword || !cnfPword}>
									Save Credentials
								</Button>
							</div>
						</div>
					</form>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
