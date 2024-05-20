'use client';
import React, { useContext, useEffect } from 'react';
import './SubSphereContent.css';
import { MenuContext } from '@/utils/context/global/MenuContext';
//Physician Search
import PhysicianSearch from './content/physiciansearch/PhysicianSearch';
import OfficeComponent from './content/physiciansearch/OfficeComponent';
import OfficeDetails from './content/physiciansearch/OfficeDetails';
//Telemed
import { AgoraRTCProvider } from 'agora-rtc-react';
//Messages
import Messages from './content/messaging/Messages';

export default function SubSphereContent() {
	let client;
	const [menu] = useContext(MenuContext);

	useEffect(() => {
		const initSdk = async () => {
			const AgoraRTC = (await import('agora-rtc-react')).default;
			client = AgoraRTC.createClient({ codec: 'vp9', mode: 'rtc' });
		};
		initSdk();
	}, []);

	return (
		<div className='row d-flex justify-content-center'>
			<AgoraRTCProvider client={client}></AgoraRTCProvider>
			<div className='sphContainer red'>
				{menu.type === 'phySearch' && <PhysicianSearch />}
				{menu.type === 'messages' && <Messages />}
			</div>
			<div className='sphContainer blu mx-4'>{menu.func === 'phySearchComponent' && <OfficeComponent />}</div>
			<div className='sphContainer ppl'>{menu.dets === 'phySearchDetails' && <OfficeDetails />}</div>
		</div>
	);
}
