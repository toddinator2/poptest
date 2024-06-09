import React from 'react';
import Image from 'next/image';
import noImg from '@/assets/images/noProfile.png';

export default function PhysicianSearchCard({ phy }) {
	return (
		<div className='mb-4 flex flex-col' key={phy._id}>
			{phy.photo ? (
				<Image className='w-10 h-10 mb-2 rounded-full' src={phy.photo} alt='Photo' />
			) : (
				<Image className='w-10 h-10 mb-2 rounded-full' src={noImg} alt='No Photo' />
			)}
			<div className='mb-2 text-base text-lgtblu hover:text-txtclr cursor-pointer' onClick={() => handleChange({ locId: phy.locId, phyId: phy.phyId })}>
				{phy.title}
			</div>
			<div className='mb-2 text-base'>
				<strong>{phy.ofcName.toUpperCase()}</strong>
			</div>
			<div className='mb-2 text-base'>{phy.locName}</div>
		</div>
	);
}
