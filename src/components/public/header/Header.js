'use client';
import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaBars, FaChevronDown, FaTimes } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Dropdown from 'react-bootstrap/Dropdown';
import NavItem from 'react-bootstrap/NavItem';
import NavLink from 'react-bootstrap/NavLink';
import hdrLogo from '@/assets/images/logoLgt.png';
import hdrLogoSm from '@/assets/images/logoSide.png';
import icoPts from '@/assets/images/hdrIcoPts.png';
import icoPhy from '@/assets/images/hdrIcoPhy.png';
import icoEmp from '@/assets/images/hdrIcoEmp.png';

export default function Header() {
	const domain = process.env.DOMAIN;
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const [nav, setNav] = useState(false);
	const [screenWidth, setScreenWidth] = useState(0);
	const [screenHeight, setScreenHeight] = useState(0);

	useEffect(() => {
		if (callbackUrl) {
			if (callbackUrl.includes('subscribers')) {
				router.push('/subscribers/login');
			}
			if (callbackUrl.includes('sponsors')) {
				router.push('/sponsors/login');
			}
			if (callbackUrl.includes('physicians')) {
				router.push('/physicians/login');
			}
			if (callbackUrl.includes('pwrsn3x')) {
				router.push('/pwrsnx3');
			}
		}
	}, [callbackUrl, router]);

	useEffect(() => {
		setScreenWidth(window.innerWidth);
		setScreenHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
			setScreenHeight(window.innerHeight);
		}

		// Attach the event listener to the window object
		window.addEventListener('resize', handleResize);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const shwMobileMenu = () => {
		setNav(!nav);
	};

	return (
		<>
			{(screenWidth > 1366 || screenHeight > 950) && (
				<div className='hdrContainer'>
					<div className='row py-3 d-flex align-items-center justify-content-around'>
						<div className='col-12 col-lg-4 ps-lg-4'>
							<div className='row mb-4 mb-lg-0 d-flex justify-content-around justify-content-lg-start'>
								<div className='col-3 col-lg-auto d-flex justify-content-center'>
									<div className='row'>
										<Link className='icoText blu' href='/subscribers/login'>
											<div className='col-12 d-flex justify-content-center'>
												<Image className='icoLogin' src={icoPts} alt='Subscribers' />
											</div>
											<div className='col-12 d-flex justify-content-center'>
												<div>Subscribers</div>
											</div>
										</Link>
									</div>
								</div>
								<div className='col-3 col-lg-auto mx-lg-4 d-flex justify-content-center'>
									<div className='row'>
										<Link className='icoText red' href='/physicians/login'>
											<div className='col-12 d-flex justify-content-center'>
												<Image className='icoLogin' src={icoPhy} alt='Physicians' />
											</div>
											<div className='col-12 d-flex justify-content-center'>
												<div>Physicians</div>
											</div>
										</Link>
									</div>
								</div>
								<div className='col-3 col-lg-auto d-flex justify-content-center'>
									<div className='row'>
										<Link className='icoText ppl' href='/sponsors/login'>
											<div className='col-12 d-flex justify-content-center'>
												<Image className='icoLogin' src={icoEmp} alt='Sponsors' />
											</div>
											<div className='col-12 d-flex justify-content-center'>
												<div>Sponsors</div>
											</div>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className='col-12 col-lg-4 mb-2 mb-lg-0 d-flex justify-content-center'>
							<Link className='logoSubText' href='/'>
								<Image className='hdrLogo' src={hdrLogo} priority={true} alt={domain} />
								<div className='row mt-2'>
									<div className='col-12 d-flex justify-content-center'>Healthcare Restored</div>
								</div>
							</Link>
						</div>
						<div className='col-4 pe-lg-5 d-none d-lg-block'>
							<div className='row'>
								<div className='col-12 d-flex justify-content-center justify-content-xl-end'>
									<Dropdown as={NavItem}>
										<Dropdown.Toggle className='navLink me-2' as={NavLink}>
											Register <FaChevronDown size={14} />
										</Dropdown.Toggle>
										<Dropdown.Menu className='menuDropdown p-2'>
											<div className='row mb-1'>
												<div className='col-12'>
													<Link className='navDDLink blu' href='/subscribers/register'>
														Subscribers
													</Link>
												</div>
											</div>
											<div className='row mb-1'>
												<div className='col-12'>
													<Link className='navDDLink red' href='/physicians/prescreen'>
														Physicians
													</Link>
												</div>
											</div>
											<div className='row'>
												<div className='col-12'>
													<Link className='navDDLink ppl' href='/sponsors/register'>
														Sponsors
													</Link>
												</div>
											</div>
										</Dropdown.Menu>
									</Dropdown>
									<Dropdown as={NavItem}>
										<Dropdown.Toggle className='navLink mx-2' as={NavLink}>
											Learn More <FaChevronDown size={14} />
										</Dropdown.Toggle>
										<Dropdown.Menu className='menuDropdown p-2'>
											<div className='row mb-1'>
												<div className='col-12'>
													<Link className='navDDLink blu' href='/subscribers/learnmore'>
														Subscribers
													</Link>
												</div>
											</div>
											<div className='row mb-1'>
												<div className='col-12'>
													<Link className='navDDLink red' href='/physicians/prescreen'>
														Physicians
													</Link>
												</div>
											</div>
											<div className='row'>
												<div className='col-12'>
													<Link className='navDDLink ppl' href='/sponsors/learnmore'>
														Sponsors
													</Link>
												</div>
											</div>
										</Dropdown.Menu>
									</Dropdown>
									<div className='col-auto ms-2'>
										<Link className='navLink' href='/contact'>
											Contact Us
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{screenWidth <= 1366 && screenHeight <= 950 && (
				<div className='hdrContainer'>
					<div className='col-10 mb-2 offset-1'>
						<Link className='d-flex justify-content-center' href='/'>
							<Image className='hdrLogoSm' src={hdrLogoSm} priority={true} alt={domain} />
						</Link>
					</div>
					<div className='col-12'>
						<div className='row mb-2'>
							<div className='col-12 pe-4 d-flex justify-content-end' onClick={shwMobileMenu}>
								{nav ? <FaTimes size={30} color='#cacac9' /> : <FaBars size={30} color='#cacac9' />}
							</div>
						</div>
						{nav && (
							<div className='mobileMenu p-4'>
								<div className='mobileMenuHdng mb-1'>Login</div>
								<div className='row mb-4 d-flex align-items-center'>
									<div className='col-12 ps-5 mb-1'>
										<Link className='navDDLink blu' href='/subscribers/login'>
											Subscribers
										</Link>
									</div>
									<div className='col-12 ps-5 mb-1'>
										<Link className='navDDLink red' href='/physicians/login'>
											Physicians
										</Link>
									</div>
									<div className='col-12 ps-5'>
										<Link className='navDDLink ppl' href='/sponsors/login'>
											Sponsors
										</Link>
									</div>
								</div>
								<div className='mobileMenuHdng mb-1'>Register</div>
								<div className='row mb-4 d-flex align-items-center'>
									<div className='col-12 ps-5 mb-1'>
										<Link className='navDDLink blu' href='/subscribers/register'>
											Subscribers
										</Link>
									</div>
									<div className='col-12 ps-5 mb-1'>
										<Link className='navDDLink red' href='/physicians/prescreen'>
											Physicians
										</Link>
									</div>
									<div className='col-12 ps-5'>
										<Link className='navDDLink ppl' href='/sponsors/register'>
											Sponsors
										</Link>
									</div>
								</div>
								<div className='mobileMenuHdng mb-1'>Learn More</div>
								<div className='row mb-4 d-flex align-items-center'>
									<div className='col-12 ps-5 mb-1'>
										<Link className='navDDLink blu' href='/subscribers/learnmore'>
											Subscribers
										</Link>
									</div>
									<div className='col-12 ps-5 mb-1'>
										<Link className='navDDLink red' href='/physicians/prescreen'>
											Physicians
										</Link>
									</div>
									<div className='col-12 ps-5'>
										<Link className='navDDLink ppl' href='/sponsors/learnmore'>
											Sponsors
										</Link>
									</div>
								</div>
								<div className='row'>
									<div className='col-auto'>
										<Link className='mobileMenuHdng nounderline' href='/contact'>
											Contact Us
										</Link>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
