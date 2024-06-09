'use client';
import React, { useEffect, useState } from 'react';
import './Header.css';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import hdrLogo from '@/assets/images/logoLgt.png';
import inlLogo from '@/assets/images/logoSide.png';
import icoPts from '@/assets/images/hdrIcoPts.png';
import icoPhy from '@/assets/images/hdrIcoPhy.png';
import icoEmp from '@/assets/images/hdrIcoEmp.png';

function ArrowDown() {
	return (
		<svg className='size-4' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor'>
			<path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
		</svg>
	);
}

function MenuClose() {
	return (
		<svg className='size-8 stroke-txtclr' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2}>
			<path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
		</svg>
	);
}

function MenuOpen() {
	return (
		<svg className='size-8 stroke-txtclr' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2}>
			<path strokeLinecap='round' strokeLinejoin='round' d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
		</svg>
	);
}

export default function Header() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get('callbackUrl');
	const [navSm, setNavSm] = useState(false);
	const [navLg, setNavLg] = useState(false);
	const [screenWidth, setScreenWidth] = useState(0);

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

	const shwMobileMenuSm = () => {
		setNavSm(!navSm);
		setNavLg(false);
	};

	const shwMobileMenuLg = () => {
		setNavLg(!navLg);
		setNavSm(false);
	};

	return (
		<>
			{screenWidth !== 0 && (
				<div className='w-full px-3 py-2 flex-auto 2xl:flex 2xl:items-center fixed bg-black border-b-2 border-dotted border-drkgry z-20'>
					{screenWidth < 640 && (
						<>
							<div className='w-full mb-2 flex justify-center'>
								<Link href='/'>
									<Image className='w-auto h-10 max-w-full' src={inlLogo} priority={true} alt='Supernova3x' />
								</Link>
							</div>
							<div className='w-full flex justify-end'>
								<div className='w-auto cursor-pointer' onClick={() => shwMobileMenuSm()}>
									{navSm ? <MenuClose /> : <MenuOpen />}
								</div>
							</div>
						</>
					)}
					{screenWidth >= 640 && screenWidth < 1280 && (
						<>
							<div className='w-full flex items-center'>
								<div className='w-4/5'>
									<Link href='/'>
										<Image className='w-auto h-10 max-w-full' src={inlLogo} priority={true} alt='Supernova3x' />
									</Link>
								</div>
								<div className='w-1/5 flex justify-end'>
									<div className='w-auto cursor-pointer' onClick={() => shwMobileMenuSm()}>
										{navSm ? <MenuClose /> : <MenuOpen />}
									</div>
								</div>
							</div>
						</>
					)}
					{screenWidth >= 1280 && screenWidth < 1536 && (
						<div className='w-full flex flex-col'>
							<div className='w-full mb-2 flex justify-center'>
								<Link href='/'>
									<Image className='w-auto h-10 max-w-full' src={inlLogo} priority={true} alt='Supernova3x' />
								</Link>
							</div>
							<div className='w-full flex items-center'>
								<div className='w-3/5'>
									<div className='w-full flex justify-start'>
										<Link className='w-28 h-auto text-lgtblu hover:text-drkblu' href='/subscribers/login'>
											<div className='w-full'>
												<div className='w-full flex justify-center'>
													<Image className='w-auto h-10 xl:h-16' src={icoPts} priority={true} alt='Subscribers' />
												</div>
												<div className='text-sm xl:text-base text-center'>Subscribers</div>
											</div>
										</Link>
										<Link className='w-28 h-auto text-lgtred hover:text-drkred' href='/physicians/login'>
											<div className='w-full'>
												<div className='w-full flex justify-center'>
													<Image className='w-auto h-10 xl:h-16' src={icoPhy} priority={true} alt='Physicians' />
												</div>
												<div className='text-sm xl:text-base text-center'>Physicians</div>
											</div>
										</Link>
										<Link className='w-28 h-auto text-lgtppl hover:text-drkppl' href='/sponsors/login'>
											<div className='w-full'>
												<div className='w-full flex justify-center'>
													<Image className='w-auto h-10 xl:h-16' src={icoEmp} priority={true} alt='Sponsors' />
												</div>
												<div className='text-sm xl:text-base text-center'>Sponsors</div>
											</div>
										</Link>
									</div>
								</div>
								<div className='w-2/5 flex justify-end'>
									<div className='w-auto cursor-pointer' onClick={() => shwMobileMenuLg()}>
										{navLg ? <MenuClose /> : <MenuOpen />}
									</div>
								</div>
							</div>
						</div>
					)}
					{screenWidth >= 1536 && (
						<>
							<div className='w-1/3 flex justify-start'>
								<Link className='w-28 h-auto text-lgtblu hover:text-drkblu' href='/subscribers/login'>
									<div className='w-full'>
										<div className='w-full flex justify-center'>
											<Image className='w-auto h-10 xl:h-16' src={icoPts} priority={true} alt='Subscribers' />
										</div>
										<div className='text-sm xl:text-base text-center'>Subscribers</div>
									</div>
								</Link>
								<Link className='w-28 h-auto text-lgtred hover:text-drkred' href='/physicians/login'>
									<div className='w-full'>
										<div className='w-full flex justify-center'>
											<Image className='w-auto h-10 xl:h-16' src={icoPhy} priority={true} alt='Physicians' />
										</div>
										<div className='text-sm xl:text-base text-center'>Physicians</div>
									</div>
								</Link>
								<Link className='w-28 h-auto text-lgtppl hover:text-drkppl' href='/sponsors/login'>
									<div className='w-full'>
										<div className='w-full flex justify-center'>
											<Image className='w-auto h-10 xl:h-16' src={icoEmp} priority={true} alt='Sponsors' />
										</div>
										<div className='text-sm xl:text-base text-center'>Sponsors</div>
									</div>
								</Link>
							</div>
							<div className='w-1/3 flex justify-center'>
								<Link className='cursor-pointer' href='/'>
									<div className='w-auto flex flex-col items-center'>
										<Image className='w-auto h-36 mb-1' src={hdrLogo} priority={true} alt='Supernova3x' />
										<div className='text-xl'>Healthcare Restored</div>
									</div>
								</Link>
							</div>
							<div className='w-1/3 flex justify-end items-center gap-3'>
								<div className='dropdown'>
									<button className='text-sm text-drkwht hover:text-lgtwht'>
										<div className='w-auto flex flex-row gap-1 items-center'>
											Register
											<ArrowDown />
										</div>
									</button>
									<div className='dropdown-content'>
										<div className='px-5 py-2 flex flex-col'>
											<Link className='mb-1.5 text-sm text-drkwht hover:text-lgtwht' href='/subscribers/learnmore/#preRegister'>
												Subscribers
											</Link>
											<Link className='mb-1.5 text-sm text-drkwht hover:text-lgtwht' href='/physicians/register'>
												Physicians
											</Link>
											<Link className='text-sm text-drkwht hover:text-lgtwht' href='/sponsors/register'>
												Sponsors
											</Link>
										</div>
									</div>
								</div>
								<div className='dropdown'>
									<button className='text-sm text-drkwht hover:text-lgtwht'>
										<div className='w-auto flex flex-row gap-1 items-center'>
											Learn More
											<ArrowDown />
										</div>
									</button>
									<div className='dropdown-content'>
										<div className='px-5 py-2 flex flex-col'>
											<Link className='mb-1.5 text-sm text-drkwht hover:text-lgtwht' href='/subscribers/learnmore'>
												Subscribers
											</Link>
											<Link className='mb-1.5 text-sm text-drkwht hover:text-lgtwht' href='/physicians/learnmore'>
												Physicians
											</Link>
											<Link className='text-sm text-drkwht hover:text-lgtwht' href='/sponsors/learnmore'>
												Sponsors
											</Link>
										</div>
									</div>
								</div>
								<Link className='text-sm text-drkwht hover:text-lgtwht' href='/contact'>
									Contact Us
								</Link>
							</div>
						</>
					)}
					{navSm && (
						<div className='menu'>
							<div className='bg-menubg mt-2 px-3 pt-3 pb-10 border-4 border-drkppl rounded-2xl flex-auto'>
								<div className='text-base underline'>Login</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtblu hover:text-drkblu' href='/subscribers/login' scroll={true}>
										Subscribers
									</Link>
								</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtred hover:text-drkred' href='/physicians/login'>
										Physicians
									</Link>
								</div>
								<div className='mb-5 ps-10'>
									<Link className='text-sm text-lgtppl hover:text-drkppl' href='/sponsors/login'>
										Sponsors
									</Link>
								</div>
								<div className='text-base underline'>Register</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtblu hover:text-drkblu' href='/subscribers/learnmore/#preRegister' scroll={true}>
										Subscribers
									</Link>
								</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtred hover:text-drkred' href='/physicians/register'>
										Physicians
									</Link>
								</div>
								<div className='mb-5 ps-10'>
									<Link className='text-sm text-lgtppl hover:text-drkppl' href='/sponsors/register'>
										Sponsors
									</Link>
								</div>
								<div className='text-base underline'>Learn More</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtblu hover:text-drkblu' href='/subscribers/learnmore'>
										Subscribers
									</Link>
								</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtred hover:text-drkred' href='/physicians/learnmore'>
										Physicians
									</Link>
								</div>
								<div className='mb-5 ps-10'>
									<Link className='text-sm text-lgtppl hover:text-drkppl' href='/sponsors/learnmore'>
										Sponsors
									</Link>
								</div>
								<div>
									<Link className='text-base text-lgtwht hover:text-drkwht' href='/contact'>
										Contact Us
									</Link>
								</div>
							</div>
						</div>
					)}
					{navLg && (
						<div className='menu'>
							<div className='w-full bg-menubg mt-2 px-3 pt-3 pb-10 border-4 border-drkppl rounded-2xl flex-auto'>
								<div className='text-base underline'>Register</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtblu hover:text-drkblu' href='/subscribers/learnmore/#preRegister' scroll={true}>
										Subscribers
									</Link>
								</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtred hover:text-drkred' href='/physicians/register'>
										Physicians
									</Link>
								</div>
								<div className='mb-5 ps-10'>
									<Link className='text-sm text-lgtppl hover:text-drkppl' href='/sponsors/register'>
										Sponsors
									</Link>
								</div>
								<div className='text-base underline'>Learn More</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtblu hover:text-drkblu' href='/subscribers/learnmore'>
										Subscribers
									</Link>
								</div>
								<div className='ps-10'>
									<Link className='text-sm text-lgtred hover:text-drkred' href='/physicians/learnmore'>
										Physicians
									</Link>
								</div>
								<div className='mb-5 ps-10'>
									<Link className='text-sm text-lgtppl hover:text-drkppl' href='/sponsors/learnmore'>
										Sponsors
									</Link>
								</div>
								<div>
									<Link className='text-base text-lgtwht hover:text-drkwht' href='/contact'>
										Contact Us
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}
