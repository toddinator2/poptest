'use client';
import React, { useContext, useEffect } from 'react';
import './SubSphereContent.css';
import { MenuContext } from '@/utils/context/global/MenuContext';
//Physician Search
import PhysicianSearch from './content/physiciansearch/PhysicianSearch';
import OfficeComponent from './content/physiciansearch/OfficeComponent';
import OfficeDetails from './content/physiciansearch/OfficeDetails';
//Messages
import Messages from './content/messaging/Messages';
//Telemed
import Call from './content/virtual/Call';
import { AuthContext } from '@/utils/context/global/AuthContext';

export default function SubSphereContent() {
	const [menu] = useContext(MenuContext);
	const [auth] = useContext(AuthContext);

	return (
		<div className='row d-flex justify-content-center'>
			<Call appId={process.env.AGORA_APP_ID} channelName={auth.user._id} />
			<div className='sphContainer red'>
				{menu.type === 'phySearch' && <PhysicianSearch />}
				{menu.type === 'messages' && <Messages />}
			</div>
			<div className='sphContainer blu mx-4'>{menu.func === 'phySearchComponent' && <OfficeComponent />}</div>
			<div className='sphContainer ppl'>{menu.dets === 'phySearchDetails' && <OfficeDetails />}</div>
		</div>
	);
}
