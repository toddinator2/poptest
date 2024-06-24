import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import date from 'date-and-time';
import SetOffice from './setoffice/SetOffice';
import { getFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/lsSecure';

export default function SbHeader() {
	const lsUname = process.env.UNAME_SUB;
	const lsRem = process.env.REM_SUB;
	const [auth] = useContext(AuthContext);
	const [inits, setInits] = useState('');
	const [now, setNow] = useState(new Date());

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	});

	useEffect(() => {
		if (!inits) {
			const finit = auth.user.fname.slice(0, 1);
			const linit = auth.user.lname.slice(0, 1);
			setInits((finit + linit).toUpperCase());
		}
	}, [inits, auth]);

	const logOut = () => {
		const uname = getFromLocalStorage(lsUname);
		const rem = getFromLocalStorage(lsRem);
		localStorage.clear();
		saveInLocalStorage(lsUname, uname);
		saveInLocalStorage(lsRem, rem);
		signOut({ callbackUrl: '/subscribers/login' });
	};

	return (
		<>
			<SetOffice />
			<div className='my-2 text-3xl 2xl:text-4xl font-bold text-center'>NOVA SPHERE</div>
			<div className='mb-3 flex flex-col'>
				<div className='w-full mb-2 flex justify-center'>
					{auth.user.photo ? (
						<Image className='rounded-full' src={auth.user.photo} width={50} height={50} alt='Photo' />
					) : (
						<div className='text-3xl 2xl:text-4xl font-bold text-lgtblu'>{inits}</div>
					)}
				</div>
				<div className='w-full 2xl:flex 2xl:flex-col'>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/2 text-sm text-center'>
							Welcome
							<br />
							{auth.user.fname} {auth.user.lname}
						</div>
						<div className='w-1/2 text-sm text-center flex flex-col justify-center'>
							<div>{date.format(now, 'MM/DD/YYYY')}</div>
							<div>{date.format(now, 'h:mm A')}</div>
						</div>
					</div>
					<div className='flex flex-row items-center'>
						<div className='w-1/2'>
							<Link href='/contact'>
								<div className='text-sm text-center text-txtblu hover:text-lgtblu cursor-pointer'>Support</div>
							</Link>
						</div>
						<div className='w-1/2'>
							<div className='text-sm text-center text-txtblu hover:text-lgtblu cursor-pointer' onClick={() => logOut()}>
								Logout
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='mb-3 text-base font-semibold text-center'>SN3X #: {auth.user.s3xid.toUpperCase()}</div>
		</>
	);
}
