import React from 'react';
import Image from 'next/image';
import Verification from '@/components/public/verify/email/Verification';
import logo from '@/assets/images/logoLgt.png';

export default function PhyVerifyEmail({ params }) {
	const type = 'physicianprereg';
	const verifycode = params?.slug;
	const domain = process.env.DOMAIN;

	return (
		<>
			<div className='row mt-3'>
				<div className='col-12 d-flex justify-content-center'>
					<Image className='verifyLogo' src={logo} priority={true} alt={domain} />
				</div>
			</div>
			<Verification type={type} verifycode={verifycode} />
		</>
	);
}
