import React from 'react';
import Image from 'next/image';
import Verification from '@/components/public/verify/email/Verification';
import logo from '@/assets/images/logoLgt.png';

export default function SubVerifyEmail({ params }) {
	const type = 'subscriber';
	const verifycode = params?.slug;
	const domain = process.env.DOMAIN;

	return (
		<div className='w-full flex-auto'>
			<div className='w-full mt-7 flex justify-center'>
				<Image className='w-auto h-52' src={logo} priority={true} alt={domain} />
			</div>
			<Verification type={type} verifycode={verifycode} />
		</div>
	);
}
