import React from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logoLgt.png';
import Button from '@/components/global/forms/buttons/Button';
import Link from 'next/link';

export default function Demo() {
	return (
		<div className='pbpgSection noBorder py-3'>
			<div className='row mb-3'>
				<div className='col-12 d-flex justify-content-center'>
					<Image className='verifyLogo' src={logo} priority={true} alt='Supernova3x' />
				</div>
			</div>
			<div className='pbpgContainer'>
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng'>Congratulations!</div>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng'>You are the newest free lifetime member of SUPERNOVA3X</div>
					</div>
				</div>
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='pbpgHdng'>
							<i>Watch the demo and get started today!</i>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<iframe
							width='560'
							height='315'
							src='https://www.youtube.com/embed/86qKgK0asGo?si=5YkSTHN7d3gYJ0fR'
							title='YouTube video player'
							frameborder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerpolicy='strict-origin-when-cross-origin'
							allowfullscreen={true}
						></iframe>
					</div>
				</div>
				<div className='mt-4 d-flex justify-content-center'>
					<Link href='/subscribers/login'>
						<Button type='button' border='555555'>
							Next
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
