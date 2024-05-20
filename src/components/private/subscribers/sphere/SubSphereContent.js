'use client';
import React, { useContext } from 'react';
import './SubSphereContent.css';
import { MenuContext } from '@/utils/context/global/MenuContext';
//Physician Search
import PhysicianSearch from './content/physiciansearch/PhysicianSearch';
import OfficeComponent from './content/physiciansearch/OfficeComponent';
import OfficeDetails from './content/physiciansearch/OfficeDetails';
//Messages
import Messages from './content/messaging/Messages';

export default function SubSphereContent() {
	const [menu] = useContext(MenuContext);

	return (
		<div className='row d-flex justify-content-center'>
			<div className='sphContainer red'>
				{menu.type === 'phySearch' && <PhysicianSearch />}
				{menu.type === 'messages' && <Messages />}
			</div>
			<div className='sphContainer blu mx-4'>{menu.func === 'phySearchComponent' && <OfficeComponent />}</div>
			<div className='sphContainer ppl'>{menu.dets === 'phySearchDetails' && <OfficeDetails />}</div>
		</div>
	);
}
