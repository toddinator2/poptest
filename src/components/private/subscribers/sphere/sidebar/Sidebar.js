import React from 'react';
import './Sidebar.css';
import Header from './header/SbHeader';
import PhyButton from './modules/physicians/phybutton/PhyButton';
import VirtualButton from './modules/virtual/VirtualButton';
import MessageButton from './modules/messaging/MessageButton';

export default function Sidebar() {
	return (
		<div className='subSideContainer'>
			<Header />
			<PhyButton />
			<VirtualButton />
			<MessageButton />
		</div>
	);
}
