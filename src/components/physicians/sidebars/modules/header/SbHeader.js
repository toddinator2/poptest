import React, { useContext, useEffect, useState } from 'react';
import './SbHeader.css';
import { AuthContext } from '@/utils/context/physicians/AuthContext';
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
		<>
			<SetLocation />
			<div className='row mb-2'>
				<div className='col-12 d-flex justify-content-center'>{pg === 'schedule' && <div className='sbHdrHdng'>NOVA DATE</div>}</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-12 col-md-3 d-flex justify-content-center'>
					{auth.user.photo ? <Image className='sbHdrPhoto' src={auth.user.photo} alt='Photo' /> : <div className='sbHdrInits'>{inits}</div>}
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
							<div className='sbHdrSmLink' onClick={() => signOut({ callbackUrl: '/physicians/login' })}>
								Logout
							</div>
						</div>
					</div>
				</div>
			</div>
			{auth.user.role === 'admin' ? (
				<div className='row mb-2 d-flex justify-content-around'>
					<div className='col-auto'>
						{pg === 'schedule' ? (
							<Link className='sbHdrLgLink wht' href='/physicians/schedule'>
								DATE
							</Link>
						) : (
							<Link className='sbHdrLgLink' href='/physicians/schedule'>
								DATE
							</Link>
						)}
					</div>
					<div className='col-auto'>
						{pg === 'patient' ? <div className='sbHdrLgNotLink wht'>CHART</div> : <div className='sbHdrLgNotLink'>CHART</div>}
					</div>
					<div className='col-auto'>
						{pg === 'sphere' ? (
							<Link className='sbHdrLgLink wht' href='/physicians/sphere'>
								SPHERE
							</Link>
						) : (
							<Link className='sbHdrLgLink' href='/physicians/sphere'>
								SPHERE
							</Link>
						)}
					</div>
				</div>
			) : (
				<div className='row mb-2 d-flex justify-content-around'>
					<div className='col-auto'>
						{pg === 'schedule' ? (
							<Link className='sbHdrLgLink wht' href='/physicians/schedule'>
								DATE
							</Link>
						) : (
							<Link className='sbHdrLgLink' href='/physicians/schedule'>
								DATE
							</Link>
						)}
					</div>
					<div className='col-auto'>
						{pg === 'patient' ? <div className='sbHdrLgNotLink wht'>CHART</div> : <div className='sbHdrLgNotLink'>CHART</div>}
					</div>
				</div>
			)}
		</>
	);
}
