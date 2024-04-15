'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
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
import icoMemberPhy from '@/assets/images/hmpgIcoPhy.png';
import { saveInLocalStorage } from '@/utils/helpers/auth';

export default function PhyLogin() {
	const CryptoJS = require('crypto-js');
	const cryptoKey = process.env.CRYPTO_KEY;
	const lsDefLoc = process.env.DEFAULT_LOCATION;
	const router = useRouter();
	const { status } = useSession();
	const [_auth, setAuth] = useContext(AuthContext);
	const [svdUser, setSvdUser] = useState({});
	const [svdRem, setSvdRem] = useState(false);
	const [svdUname, setSvdUname] = useState('');
	const [svdOfcId, setSvdOfcId] = useState('');
	const [uname, setUname] = useState('');
	const [pword, setPword] = useState('');
	const [ofcId, setOfcId] = useState('');
	const [remember, setRemember] = useState(false);
	const [getLsAuth, setGetLsAuth] = useState(false);
	const [loggingIn, setLoggingIn] = useState(false);
	const [beenHere, setBeenHere] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//Set auth data from localstorage
		if (!getLsAuth && !svdUname) {
			const lsData = GetAuthData('physician');
			setSvdUser(JSON.parse(lsData.user));
			setSvdRem(lsData.remember);
			setSvdUname(lsData.userUname);
			setSvdOfcId(lsData.officeid);
			setGetLsAuth(true);
		}
	}, [getLsAuth, svdUname]);

	useEffect(() => {
		if (status === 'authenticated' && !loggingIn) {
			if (svdUser) {
				if (svdUser.perm === 'provider' || svdUser.perm === 'pa' || svdUser.perm === 'staff') {
					router.push('/physicians/schedule');
				}
			}
		}
	}, [status, loggingIn, svdUser, router]);

	useEffect(() => {
		//Set variables if there are saved variables
		if (svdRem) {
			if (!uname && !beenHere) {
				setUname(svdUname);
				setOfcId(svdOfcId);
				setRemember(true);
				setBeenHere(true);
			}
		}
	}, [svdRem, uname, beenHere, svdUname, svdOfcId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setLoggingIn(true);

		try {
			const result = await signIn('credentials', {
				redirect: false,
				type: 'physician',
				username: uname,
				password: pword,
			});

			if (result?.error) {
				toast.error('Invalid username or password');
			} else {
				/***** GET USER *****/
				const getUsrData = {
					type: 'physician',
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
					if (!user.resetcreds && (user.permission === 'provider' || user.permission === 'pa' || user.permission === 'staff')) {
						const userObj = {
							_id: user._id,
							fname: user.fname,
							lname: user.lname,
							email: user.email,
							phone: user.phone,
							photo: user.photo,
							perm: user.permission,
							role: user.role,
							paid: user.paid,
							title: user.title,
							ofcid: user.officeid,
							locObjId: user.locationObjId,
							ofcObjId: user.officeObjId,
						};

						if (user.locationObjId.length === 1) {
							const locId = user.locationObjId[0];
							saveInLocalStorage(lsDefLoc, locId);
						}

						const saveAuthData = {
							uname: uname,
							userData: userObj,
							remember: remember,
						};

						SaveAuthData('physician', saveAuthData);
						setAuth({ user: userObj });
						if (user.paid) {
							router.push('/physicians/setup');
						} else {
							router.push('/physicians/demo');
						}
					} else {
						if (user.permission !== 'provider' && user.permission !== 'pa' && user.permission !== 'staff') {
							router.push('/physicians/login');
						} else {
							router.push(`/physicians/login/resetcreds/${user.resetcode}`);
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
						<Image className='icoSectionHdng' src={icoMemberPhy} alt='Physicians' />
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
								<Button type='submit' border='FF0000' disabled={!uname || !pword}>
									Login
								</Button>
							</div>
						</div>
					</div>
				</form>
				<div className='row mt-4'>
					<div className='col-12 d-flex justify-content-center'>
						<Link className='fgtLinkText' href='/physicians/login/forgotpassword'>
							Forgot Password
						</Link>
					</div>
				</div>
				<div className='row mt-2'>
					<div className='col-12 d-flex justify-content-center'>
						<Link className='fgtLinkText' href='/physicians/login/forgotusername'>
							Forgot Username
						</Link>
					</div>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
