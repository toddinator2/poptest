'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { GetAuthData, SaveAuthData } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
import Image from 'next/image';
import Link from 'next/link';
import GetUser from '@/actions/global/get/GetUser';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberS3x from '@/assets/images/hmpgIcoS3x.png';

export default function S3xLogin() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const router = useRouter();
	const { status } = useSession();
	const [svdUser, setSvdUser] = useState({});
	const [svdRem, setSvdRem] = useState(false);
	const [svdUname, setSvdUname] = useState('');
	const [uname, setUname] = useState('');
	const [pword, setPword] = useState('');
	const [remember, setRemember] = useState(false);
	const [setAuth, setSetAuth] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//Set auth data from localstorage
		if (!setAuth) {
			const lsData = GetAuthData('s3x');
			setSvdUser(JSON.parse(lsData.user));
			setSvdRem(lsData.remember);
			setSvdUname(lsData.userUname);
			setSetAuth(true);
		}
	}, [svdUser, setAuth]);

	useEffect(() => {
		if (status === 'authenticated' && !loggingIn) {
			if (svdUser) {
				if (svdUser.perm === 'admin') {
					router.push('/pwrsnx3/sphere');
				}
			}
		}
	}, [status, loggingIn, svdUser, router]);

	useEffect(() => {
		//Set variables if there are saved variables
		if (svdRem) {
			if (!uname) {
				setUname(svdUname);
				setRemember(true);
			}
		}
	}, [svdRem, uname, svdUname]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setLoggingIn(true);

		try {
			const result = await signIn('credentials', {
				redirect: false,
				type: 's3x',
				username: uname,
				password: pword,
			});

			if (result?.error) {
				toast.error('Invalid username or password');
			} else {
				/***** GET USER *****/
				const getUsrData = {
					type: 's3x',
					username: uname,
				};
				//Encrypt data to send and send
				const usrData = CryptoJS.AES.encrypt(JSON.stringify(getUsrData), cryptoKey).toString();
				const getUser = await GetUser(usrData);
				//Decrypt returned data
				const decryptedUserData = CryptoJS.AES.decrypt(getUser, cryptoKey);
				const userData = JSON.parse(decryptedUserData.toString(CryptoJS.enc.Utf8));
				const user = userData.user;
				const usrStatus = userData.status;

				if (usrStatus === 400) {
					toast.error('Invalid username or password');
					return;
				}
				if (usrStatus === 500) {
					toast.error('Network Error: Please try again');
					return;
				}
				if (usrStatus === 501) {
					toast.error('Invalid Data: Please try again');
					return;
				}

				if (usrStatus === 200) {
					if (!user.resetcreds && user.permission === 'admin') {
						const userObj = {
							_id: user._id,
							fname: user.fname,
							lname: user.lname,
							email: user.email,
							phone: user.phone,
							photo: user.photo,
							perm: user.permission,
							role: user.role,
						};

						const saveAuthData = {
							uname: uname,
							userData: userObj,
							remember: remember,
						};

						SaveAuthData('s3x', saveAuthData);
						router.push('/pwrsnx3/sphere');
					} else {
						if (user.permission !== 'admin') {
							router.push('/pwrsnx3');
						} else {
							router.push(`/pwrsnx3/login/resetcreds/${user.resetcode}`);
						}
					}
				}
			}
		} catch (error) {
			toast.error('Network Error: Please try again');
			return;
		} finally {
			setLoading(false);
		}
	};

	const handleRemember = (e) => {
		const value = e.target.checked;
		setRemember(value);
	};

	return (
		<PageTemplate>
			<div className='pbpgSection noBorder pb-5'>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<Image className='icoSectionHdng' src={icoMemberS3x} alt='S3x Admins' />
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng center'>Login</div>
					</div>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='row d-flex justify-content-center'>
						<div className='col-8 col-md-4 col-xl-3 '>
							<Input label='Username' type='text' id='uname' required={true} value={uname} setValue={setUname} />
							<Input label='Password' type='password' id='pword' required={true} value={pword} setValue={setPword} />
							<div className='row mt-3'>
								<div className='col-2 d-flex justify-content-end'>
									<CheckBox id='remember' check={remember} funcCall={handleRemember} />
								</div>
								<div className='col ps-1'>
									<div className='fs-6'>Remember Me</div>
								</div>
							</div>
							<div className='mt-4 d-flex justify-content-center'>
								<Button type='submit' border='CACAD9' disabled={!uname || !pword}>
									Login
								</Button>
							</div>
						</div>
					</div>
				</form>
				<div className='row mt-4'>
					<div className='col-12 d-flex justify-content-center'>
						<Link className='fgtLinkText' href='/pwrsnx3/login/forgotpassword'>
							Forgot Password
						</Link>
					</div>
				</div>
				<div className='row mt-2'>
					<div className='col-12 d-flex justify-content-center'>
						<Link className='fgtLinkText' href='/pwrsnx3/login/forgotusername'>
							Forgot Username
						</Link>
					</div>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
