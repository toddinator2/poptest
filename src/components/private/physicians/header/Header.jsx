'use client';
import React, { useState } from 'react';
import './Header.css';
import Link from 'next/link';
import Image from 'next/image';
import inlLogo from '@/assets/images/logoSide.png';
import ad from '@/assets/images/bnrAd.jpg';
import MblSchSidebar from '../sidebars/mobile/mblschsidebar/MblSchSidebar';
import MblSphSidebar from '../sidebars/mobile/mblsphsidebar/MblSphSidebar';

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

export default function Header({ screenWidth, page }) {
	const [nav, setNav] = useState(false);

	const shwMobileMenu = () => {
		setNav(!nav);
	};

	return (
		<>
			{screenWidth > 0 && (
				<div className='w-full px-3 py-2 flex-auto 2xl:flex 2xl:items-center border-b-2 border-dotted border-drkgry'>
					{screenWidth < 640 && (
						<div className='flex flex-col'>
							<div className='w-full mb-3 flex justify-center'>
								<Link href='/subscribers/sphere'>
									<Image className='w-auto h-auto max-h-12' src={inlLogo} priority={true} alt='Supernova3x' />
								</Link>
							</div>
							<div className='w-full mb-3 flex justify-center'>
								<a href='https://www.disneyplus.com/' target='_blank'>
									<Image className='w-auto h-auto max-h-14' src={ad} priority={true} alt='Banner Ad' />
								</a>
							</div>
							<div className='w-full flex justify-end'>
								<div className='w-auto cursor-pointer' onClick={() => shwMobileMenu()}>
									{nav ? <MenuClose /> : <MenuOpen />}
								</div>
							</div>
						</div>
					)}
					{screenWidth >= 640 && screenWidth < 1280 && (
						<div className='flex flex-col'>
							<div className='w-full mb-3 flex justify-center'>
								<Link href='/subscribers/sphere'>
									<Image className='w-auto h-auto max-h-12' src={inlLogo} priority={true} alt='Supernova3x' />
								</Link>
							</div>
							<div className='flex flex-row items-baseline'>
								<div className='w-5/6'>
									<a href='https://www.disneyplus.com/' target='_blank'>
										<Image className='w-auto h-auto max-h-14' src={ad} priority={true} alt='Banner Ad' />
									</a>
								</div>
								<div className='w-1/6 flex justify-end'>
									<div className='w-auto cursor-pointer' onClick={() => shwMobileMenu()}>
										{nav ? <MenuClose /> : <MenuOpen />}
									</div>
								</div>
							</div>
						</div>
					)}
					{screenWidth >= 1280 && (
						<div className='w-full flex flex-row items-center'>
							<div className='w-1/2'>
								<Link href='/subscribers/sphere'>
									<Image className='w-auto h-auto max-h-12' src={inlLogo} priority={true} alt='Supernova3x' />
								</Link>
							</div>
							<div className='w-1/2 flex justify-end'>
								<a href='https://www.disneyplus.com/' target='_blank'>
									<Image className='w-auto h-auto max-h-20' src={ad} priority={true} alt='Banner Ad' />
								</a>
							</div>
						</div>
					)}
				</div>
			)}
			{page === 'schedule' && nav && <MblSchSidebar />}
			{page === 'sphere' && nav && <MblSphSidebar />}
		</>
	);
}
