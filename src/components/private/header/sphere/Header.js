'use client';
import React, { useEffect, useState } from 'react';
import './Header.css';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import logo from '@/assets/images/logoSide.png';
import logoS3x from '@/assets/images/logoSideS3x.png';
import logout from '@/assets/images/icoLogout.png';

export default function Header(type) {
	const domain = process.env.DOMAIN;
	const router = useRouter();
	const { status } = useSession();
	const [url, setUrl] = useState('');

	useEffect(() => {
		if (status !== 'authenticated') {
			if (type === 'patient') {
				router.push('/subscribers/login');
			}
			if (type === 'sponsor') {
				router.push('/sponsors/login');
			}
			if (type === 'physician') {
				router.push('/physicians/login');
			}
			if (type === 's3x') {
				router.push('/pwrsnx3');
			}
		}
	}, [status, type, router]);

	useEffect(() => {
		if (!url) {
			if (type === 'patient') {
				setUrl('/subscribers/login');
			}
			if (type === 'sponsor') {
				setUrl('/sponsors/login');
			}
			if (type === 'physician') {
				setUrl('/physicians/login');
			}
			if (type === 's3x') {
				setUrl('/pwrsnx3');
			}
		}
	}, [url, type]);

	return (
		<>
			{status === 'authenticated' && (
				<div className='pvtHdrContainer mb-4'>
					<div className='row px-3 py-2 d-flex align-items-center'>
						<div className='col-12 col-lg-6 d-flex justify-content-center justify-content-lg-start'>
							{type === 's3x' ? (
								<Image className='pvtHdrLogo' src={logoS3x} priority={true} alt={domain} />
							) : (
								<Image className='pvtHdrLogo' src={logo} priority={true} alt={domain} />
							)}
						</div>
						<div className='col-12 col-lg-6 d-flex justify-content-end'>
							<Image className='pvtHdrIcon' src={logout} alt='Logout' onClick={() => signOut({ callbackUrl: url })} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
