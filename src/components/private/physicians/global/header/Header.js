'use client';
import React, { useContext, useEffect, useState } from 'react';
import './Header.css';
import { signOut } from 'next-auth/react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { getFromLocalStorage, removeFromLocalStorage } from '@/utils/helpers/auth';
import Link from 'next/link';
import Image from 'next/image';
import date from 'date-and-time';
import hdrLogoS3x from '@/assets/images/logoS3x.png';
import timeclock from '@/assets/images/icoTimeclock.png';
import sphere from '@/assets/images/icoSphPhy.png';
import scheduler from '@/assets/images/icoScheduler.png';
import logout from '@/assets/images/icoLogout.png';
import patient from '@/assets/images/icoNewPatient.png';
import messages from '@/assets/images/icoMessages.png';
import chat from '@/assets/images/icoChat.png';

export default function Header() {
	const lsUserData = process.env.DATA_PHY;
	const lsSelPt = process.env.SELECTED_PT;
	const domain = process.env.DOMAIN;
	const [auth, _setAuth] = useContext(AuthContext);
	const [_menu, setMenu] = useContext(MenuContext);
	const [inits, setInits] = useState('');
	const [nav, setNav] = useState(false);
	const [now, setNow] = useState(new Date());
	const [screenWidth, setScreenWidth] = useState(0);

	useEffect(() => {
		setScreenWidth(window.innerWidth);
	}, []);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		// Attach the event listener to the window object
		window.addEventListener('resize', handleResize);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	useEffect(() => {
		const timer = setInterval(() => setNow(new Date()), 1000);
		return function cleanup() {
			clearInterval(timer);
		};
	}, []);

	useEffect(() => {
		if (Object.keys(auth?.user).length !== 0) {
			if (!auth.user.photo && !inits) {
				const finit = auth.user.fname.slice(0, 1);
				const linit = auth.user.lname.slice(0, 1);
				setInits((finit + linit).toUpperCase());
			}
		}
	}, [auth, inits]);

	const shwMobileMenu = () => {
		setNav(!nav);
	};

	const setDiv = (type) => {
		setMenu({ type: type, func: '' });
		setNav(!nav);
	};

	const logOut = async () => {
		removeFromLocalStorage(lsUserData);
		removeFromLocalStorage(lsSelPt);
		signOut({ callbackUrl: '/physicians/login' });
	};
	return (
		<>
			<div className='phyHdrContainer'>
				<div className='row mb-2 pt-2 px-2 px-lg-4 d-flex align-items-center'>
					<div className='col-5'>
						<Link href='/'>
							<Image className='phyHdrLogoS3x' src={hdrLogoS3x} priority={true} alt={domain} />
						</Link>
					</div>
					<div className='col-7 d-flex justify-content-end'>
						<div className='phyHdrDate'>{date.format(now, 'MM/DD/YYYY h:mm A')}</div>
					</div>
				</div>
				{screenWidth < 1400 ? (
					<div className='row px-3 px-lg-4 mb-2 d-flex align-items-center'>
						<div className='col-3 col-sm-4 col-md-6 col-lg-7 col-xl-8 col-xxl-9'>
							{auth.user.photo ? (
								<img className='phyPic' src={auth.user.photo} alt={auth.user.fname} />
							) : (
								<div className='phyPhotoInits mt-2'>{inits}</div>
							)}
						</div>
						<div className='col-9 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3'>
							<div className='row d-flex justify-content-between justify-content-sm-end'>
								<div className='phyHdrIconDiv d-flex justify-content-end'>
									<Link href='/physicians/timeclock'>
										<Image className='phyHdrIcon' src={timeclock} title='Timeclock' alt='Timeclock' />
									</Link>
								</div>
								{auth.user.role === 'admin' && (
									<div className='phyHdrIconDiv d-flex justify-content-end'>
										<Link href='/physicians/sphere'>
											<Image className='phyHdrIcon' src={sphere} title='Sphere' alt='Sphere' />
										</Link>
									</div>
								)}
								<div className='phyHdrIconDiv d-flex justify-content-end'>
									<Link href='/physicians/schedule'>
										<Image className='phyHdrIcon' src={scheduler} title='Schedule' alt='Schedule' />
									</Link>
								</div>
								{screenWidth < 576 ? (
									<div className='phyHdrMenuDiv d-flex justify-content-end' onClick={shwMobileMenu}>
										{nav ? <FaTimes size={30} color='#cacac9' /> : <FaBars size={30} color='#cacac9' />}
									</div>
								) : (
									<div className='phyHdrMenuDiv d-flex justify-content-end' onClick={shwMobileMenu}>
										{nav ? <FaTimes size={40} color='#cacac9' /> : <FaBars size={40} color='#cacac9' />}
									</div>
								)}
							</div>
						</div>
					</div>
				) : (
					<div className='row px-3 px-lg-4 mb-2 d-flex align-items-center'>
						<div className='col-3 col-sm-4 col-md-6 col-lg-7 col-xl-8 col-xxl-9'>
							{auth.user.photo ? (
								<img className='phyPic' src={auth.user.photo} alt={auth.user.fname} />
							) : (
								<div className='phyPhotoInits mt-2'>{inits}</div>
							)}
						</div>
						<div className='col-9 col-sm-8 col-md-6 col-lg-5 col-xl-4 col-xxl-3'>
							<div className='row d-flex justify-content-between justify-content-sm-end'>
								{/*}
								<div className='phyHdrIconDiv d-flex justify-content-end'>
									<Link href='/physicians/timeclock'>
										<Image className='phyHdrIcon' src={timeclock} title='Timeclock' alt='Timeclock' />
									</Link>
								</div>
				{*/}
								{auth.user.role === 'admin' && (
									<div className='phyHdrIconDiv d-flex justify-content-end'>
										<Link href='/physicians/sphere'>
											<Image className='phyHdrIcon' src={sphere} title='Sphere' alt='Sphere' />
										</Link>
									</div>
								)}
								<div className='phyHdrIconDiv d-flex justify-content-end'>
									<Link href='/physicians/schedule'>
										<Image className='phyHdrIcon' src={scheduler} title='schedule' alt='schedule' />
									</Link>
								</div>
								<div className='phyHdrIconDiv d-flex justify-content-end' onClick={logOut}>
									<Image className='phyHdrIcon' src={logout} title='Logout' alt='Logout' />
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			{nav && (
				<div className='d-flex justify-content-end'>
					<div className='mobileMenu px-3 pt-4 pb-3'>
						<div className='row mb-3 d-flex align-items-center justify-content-center'>
							<div className='mnuLink col-3' onClick={() => setDiv('newpatient')}>
								<div className='row'>
									<div className='col-12 d-flex justify-content-center'>
										<Image className='mnuIcon' src={patient} title='New Patient' alt='New Patient' />
									</div>
									<div className='col-12 d-none d-md-flex justify-content-center'>New Patient</div>
								</div>
							</div>
							<div className='mnuLink col-3' onClick={() => handleShow('messages')}>
								<div className='row'>
									<div className='col-12 d-flex justify-content-center'>
										<Image className='mnuIcon' src={messages} title='Messages' alt='Messages' />
									</div>
									<div className='col-12 d-none d-md-flex justify-content-center'>Messages</div>
								</div>
							</div>
							<div className='mnuLink col-3' onClick={() => handleShow('chat')}>
								<div className='row'>
									<div className='col-12 d-flex justify-content-center'>
										<Image className='mnuIcon' src={chat} title='Chat' alt='Chat' />
									</div>
									<div className='col-12 d-none d-md-flex justify-content-center'>Chat</div>
								</div>
							</div>
							<div className='mnuLink col-3' onClick={() => signOut({ callbackUrl: '/physicians/login' })}>
								<div className='row'>
									<div className='col-12 d-flex justify-content-center'>
										<Image className='mnuIcon' src={logout} title='Logout' alt='Logout' />
									</div>
									<div className='col-12 d-none d-md-flex justify-content-center'>Logout</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
