'use client';
import React, { useContext } from 'react';
import './SubSphereContent.css';
import { MenuContext } from '@/utils/context/global/MenuContext';
//Physician Search
import PhysicianSearch from './content/physiciansearch/PhysicianSearch';
import OfficeComponent from './content/physiciansearch/OfficeComponent';
import OfficeDetails from './content/physiciansearch/OfficeDetails';
//Telemed
/*
import AgoraRTC, { AgoraRTCProvider, useRTCClient } from 'agora-rtc-react';
*/
import JoinCall from './content/virtual/JoinCall';
import Videos from './content/virtual/Videos';
//Messages
import Messages from './content/messaging/Messages';

export default function SubSphereContent() {
	const [menu] = useContext(MenuContext);
	//const client = useRTCClient(AgoraRTC.createClient({ codec: 'vp9', mode: 'rtc' }));

	return (
		<div className='row d-flex justify-content-center'>
			{/*<AgoraRTCProvider client={client}>*/}
			{menu.dets === 'joinCall' && <JoinCall />}
			{menu.vids && <Videos />}
			{/*</AgoraRTCProvider>*/}
			<div className='sphContainer red'>
				{menu.type === 'phySearch' && <PhysicianSearch />}
				{menu.type === 'messages' && <Messages />}
			</div>
			<div className='sphContainer blu mx-4'>{menu.func === 'phySearchComponent' && <OfficeComponent />}</div>
			<div className='sphContainer ppl'>{menu.dets === 'phySearchDetails' && <OfficeDetails />}</div>
		</div>
	);
}
