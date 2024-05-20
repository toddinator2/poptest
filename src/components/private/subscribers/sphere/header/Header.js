import React from 'react';
import './Header.css';
import Image from 'next/image';
import logo from '@/assets/images/logoLgt.png';
import ad from '@/assets/images/bnrAd.jpg';

export default function Header() {
	return (
		<div className='pgSubHdrContainer'>
			<div className='row d-flex align-items-center'>
				<div className='col-12 col-md-5 col-lg-4 col-xl-3 col-xxl-2'>
					<div className='row px-3 py-2'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='pgSubHdrLogo' priority={true} src={logo} alt='Supernova3x' />
						</div>
						<div className='col-12 d-flex justify-content-center'>Healthcare Restored</div>
					</div>
				</div>
				<div className='col-12 col-md-7 col-lg-8 col-xl-9 col-xxl-10'>
					<div className='row px-3 py-2'>
						<div className='col-12 d-flex justify-content-center justify-content-lg-end'>
							<a href='https://www.disneyplus.com/' target='_blank'>
								<Image className='pgSubHdrAd' src={ad} priority={true} alt='Banner Ad' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
