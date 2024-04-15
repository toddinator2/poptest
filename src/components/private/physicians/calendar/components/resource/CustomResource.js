import React from 'react';
import Image from 'next/image';
import noPhoto from '@/assets/images/noProfile.png';

export const CustomResource = (resource) => {
	return (
		<div className='d-flex justify-content-center'>
			<div className='resource-template-content'>
				<div className='resource-name'>{resource.name}</div>
				<div className='resource-description'>{resource.description}</div>
				{resource.photo ? <img className='resource-avatar' src={resource.photo} alt='No Photo' /> : <Image className='resource-avatar' src={noPhoto} alt='No Photo' />}
			</div>
		</div>
	);
};
