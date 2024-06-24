import React from 'react';
import SbHeader from './header/SbHeader';
import PhyButton from './buttons/PhyButton';
import VirtualButton from './buttons/VirtualButton';
import MessageButton from './buttons/MessageButton';

export default function Sidebar() {
	return (
		<div className='subSideContainer'>
			<SbHeader />
			<div className='mb-2'>
				<PhyButton />
			</div>
			<div className='mb-2'>
				<VirtualButton />
			</div>
			<div className='mb-2'>
				<MessageButton />
			</div>
		</div>
	);
}
