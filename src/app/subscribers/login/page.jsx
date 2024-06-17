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
	const lsData = process.env.DATA_SUB;
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
			if (svdRemember) {
				setUname(svdUname);
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
				type: 'subscriber',
				username: uname,
				password: pword,
			});

			if (result?.error) {
				toast.error('Invalid username, password, email not verified, or user is inactive');
			} else {
				removeFromLocalStorage(lsUname);
				removeFromLocalStorage(lsRem);
				removeFromLocalStorage(lsData);
				//set username and remember in localstorage
				if (remember) {
					saveInLocalStorage(lsRem, remember);
				}
				saveInLocalStorage(lsUname, uname.toLowerCase());
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
			<div className='w-full py-7'>
				<div className='w-5/6 md:w-3/5 lg:w-4/5 2xl:w-2/3 mx-auto'>
					<div className='flex justify-center'>
						<Image className='max-h-20 lg:max-h-28 w-auto' src={icoMemberPts} priority={true} alt='Subscribers' />
					</div>
					<div className='w-full mb-7 flex-auto'>
						<div className='w-full'>
							<div className='text-2xl lg:text-3xl 2xl:text-4xl text-center'>Subscriber Login</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='w-4/5 sm:w-3/4 lg:w-1/2 2xl:w-1/3 mx-auto flex-auto'>
							<Input label='Username' type='text' id='uname' required={true} value={uname} setValue={setUname} />
							<Input label='Password' type='password' id='pword' required={true} value={pword} setValue={setPword} />
							<div className='w-full mt-3 flex items-center'>
								<div className='w-1/6 flex justify-end'>
									<CheckBox id='remember' check={remember} funcCall={handleRemember} />
								</div>
								<div className='w-5/6 ps-2'>
									<div className='text-xs sm:text-sm'>Remember Me</div>
								</div>
							</div>
							<div className='w-full mt-4 flex justify-center'>
								<Button type='submit' disabled={!uname || !pword}>
									Login
								</Button>
							</div>
						</div>
					</form>
					<div className='w-full mt-5 flex justify-center'>
						<Link className='fgtLinkText' href='/subscribers/login/forgotusername'>
							Forgot Username
						</Link>
					</div>
					<div className='w-full mt-3 mb-3 flex justify-center'>
						<Link className='fgtLinkText' href='/subscribers/login/forgotpassword'>
							Forgot Password
						</Link>
					</div>
					{loading && <Spinner />}
				</div>
			</div>
		</PageTemplate>
	);
}
