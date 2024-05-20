import React, { useContext, useEffect, useState } from 'react';
import './SbHeader.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import date from 'date-and-time';
import SetOffice from '../modules/physicians/setoffice/SetOffice';

export default function SbHeader() {
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
		<>
			<SetOffice />
			<div className='row mb-2'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='sbHdrHdng'>NOVA SPHERE</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-12 col-md-3 d-flex justify-content-center'>
					{auth.user.photo ? (
						<Image className='sbHdrPhoto' src={auth.user.photo} width={50} height={50} alt='Photo' />
					) : (
						<div className='sbHdrInits'>{inits}</div>
					)}
				</div>
				<div className='col-12 col-md-9'>
					<div className='row mb-2'>
						<div className='col-6 d-flex justify-content-center'>
							<div className='sbHdrCenterText'>
								Welcome
								<br />
								{auth.user.fname} {auth.user.lname}
							</div>
						</div>
						<div className='col-6 d-flex justify-content-center'>
							<div className='sbHdrCenterText'>
								<div className='hdrDate'>{date.format(now, 'MM/DD/YYYY')}</div>
								<div className='hdrDate'>{date.format(now, 'h:mm A')}</div>
							</div>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-6 d-flex justify-content-center'>
							<Link className='sbHdrSmLink' href='/contact'>
								Support
							</Link>
						</div>
						<div className='col-6 d-flex justify-content-center'>
							<div className='sbHdrSmLink' onClick={() => signOut({ callbackUrl: '/subscribers/login' })}>
								Logout
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='sbHdrText'>SN3X #: {auth.user.s3xid.toUpperCase()}</div>
				</div>
			</div>
		</>
	);
}
