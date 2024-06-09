import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import date from 'date-and-time';
import SetLocation from '../setlocation/SetLocation';

export default function SbHeader({ page }) {
	const pg = page;
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

	return (
		<div className='mb-5'>
			<SetLocation />
			<div className='mb-3'>
				{pg === 'schedule' && <div className='text-3xl 2xl:text-4xl font-bold text-center'>NOVA DATE</div>}
				{pg === 'patient' && <div className='text-3xl 2xl:text-4xl font-bold text-center'>NOVA CHART</div>}
				{pg === 'sphere' && <div className='text-3xl 2xl:text-4xl font-bold text-center'>NOVA SPHERE</div>}
			</div>
			<div className='mb-3 flex flex-col 2xl:flex-row 2xl:items-center'>
				<div className='w-full 2xl:w-1/6 mb-1 2xl:mb-0 flex justify-center'>
					{auth.user.photo ? (
						<Image className='rounded-full' src={auth.user.photo} width={50} height={50} alt='Photo' />
					) : (
						<div className='text-3xl 2xl:text-4xl font-bold text-lgtred'>{inits}</div>
					)}
				</div>
				<div className='w-full 2xl:w-5/6 2xl:flex 2xl:flex-col'>
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
								<div className='text-sm text-center text-txtblu hover:text-txtclr cursor-pointer'>Support</div>
							</Link>
						</div>
						<div className='w-1/2'>
							<div
								className='text-sm text-center text-txtblu hover:text-txtclr cursor-pointer'
								onClick={() => signOut({ callbackUrl: '/subscribers/login' })}
							>
								Logout
							</div>
						</div>
					</div>
				</div>
			</div>
			{auth.user.role === 'admin' ? (
				<div className='flex flex-row justify-between'>
					<div className='w-auto'>
						{pg === 'schedule' ? (
							<div className='text-lg 2xl:text-2xl text-center text-txtclr font-semibold'>DATE</div>
						) : (
							<Link href='/physicians/schedule'>
								<div className='text-lg 2xl:text-2xl text-center text-drkgry hover:text-lgtblu font-semibold'>DATE</div>
							</Link>
						)}
					</div>
					<div className='w-auto'>
						{pg === 'patient' ? (
							<div className='text-lg 2xl:text-2xl text-center text-txtclr font-semibold'>CHART</div>
						) : (
							<div className='text-lg 2xl:text-2xl text-center text-drkbrd font-semibold'>CHART</div>
						)}
					</div>
					<div className='w-auto'>
						{pg === 'sphere' ? (
							<div className='text-lg 2xl:text-2xl text-center text-txtclr font-semibold'>SPHERE</div>
						) : (
							<Link href='/physicians/sphere'>
								<div className='text-lg 2xl:text-2xl text-center text-drkgry hover:text-lgtblu font-semibold'>SPHERE</div>
							</Link>
						)}
					</div>
				</div>
			) : (
				<>
					<div className='flex flex-row justify-around'>
						<div className='w-auto'>
							{pg === 'schedule' ? (
								<div className='text-lg 2xl:text-2xl text-center text-txtclr font-semibold'>DATE</div>
							) : (
								<Link href='/physicians/schedule'>
									<div className='text-lg 2xl:text-2xl text-center text-drkgry hover:text-lgtblu font-semibold'>DATE</div>
								</Link>
							)}
						</div>
						<div className='w-auto'>
							{pg === 'patient' ? (
								<div className='text-lg 2xl:text-2xl text-center text-txtclr font-semibold'>CHART</div>
							) : (
								<div className='text-lg 2xl:text-2xl text-center text-drkbrd font-semibold'>CHART</div>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
}
