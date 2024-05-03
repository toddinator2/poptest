'use client';
import React, { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/lsSecure';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import PageTemplate from '@/components/public/pagetemplate/PageTemplate';
import Input from '@/components/global/forms/input/Input';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoMemberPts from '@/assets/images/hmpgIcoPts.png';

export default function Login() {
	const lsUname = process.env.UNAME_SUB;
	const lsRem = process.env.REM_SUB;
	const router = useRouter();
	const [uname, setUname] = useState('');
	const [pword, setPword] = useState('');
	const [remember, setRemember] = useState(false);
	const [chkdUname, setChkdUname] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		//Set auth data from localstorage
		if (!uname && !chkdUname) {
			const svdUname = getFromLocalStorage(lsUname);
			const svdRemember = getFromLocalStorage(lsRem);
			if (svdUname) {
				setUname(svdUname);
			}
			if (svdRemember) {
				setRemember(svdRemember);
			}
			setChkdUname(true);
		}
	}, [uname, chkdUname, lsUname, lsRem]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const result = await signIn('credentials', {
				redirect: false,
				type: 'patient',
				username: uname,
				password: pword,
			});

			if (result?.error) {
				toast.error('Invalid username, password, email not verified, or user is inactive');
			} else {
				//set username and remember in localstorage
				if (remember) {
					saveInLocalStorage(lsUname, uname.toLowerCase());
					saveInLocalStorage(lsRem, remember);
				} else {
					removeFromLocalStorage(lsUname);
					removeFromLocalStorage(lsRem);
				}
				router.push('/subscribers/authorize');
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
						<Image className='icoSectionHdng' src={icoMemberPts} alt='Subscribers' />
					</div>
				</div>
				<div className='row mb-3'>
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
						<Link className='fgtLinkText' href='/subscribers/login/forgotusername'>
							Forgot Username
						</Link>
					</div>
				</div>
				<div className='row mt-2'>
					<div className='col-12 d-flex justify-content-center'>
						<Link className='fgtLinkText' href='/subscribers/login/forgotpassword'>
							Forgot Password
						</Link>
					</div>
				</div>
				{loading && <Spinner />}
			</div>
		</PageTemplate>
	);
}
