'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import ResetCreds from '@/actions/login/ResetCreds';
import PageTemplate from '@/components/private/physicians/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';

export default function PhyResetCredentials({ params }) {
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
				type: 'physician',
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
				router.push('/subscribers/login');
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
				router.push('/physicians/login');
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
						<Image className='icoSectionHdng' src={icoMemberPhy} alt='Physicians' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Reset Credentials</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-center'>
						<div className='col-8 col-md-4 col-xl-3 '>
							<Input label='New Username' type='text' id='username' required={true} value={newUname} setValue={setNewUname} />
							<Input label='New Password' type='password' id='newPword' required={true} value={newPword} setValue={setNewPword} />
							<Input label='Confirm Password' type='password' id='cnfPword' required={true} value={cnfPword} setValue={setCnfPword} />
							<div className='mt-4 d-flex justify-content-center'>
								<Button type='submit' border='FF0000'>
									Save Credentials
								</Button>
							</div>
						</div>
					</div>
				</form>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
