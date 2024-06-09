'use client';
import React, { useContext } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
//Physician Search
import PhysicianSearch from './content/physiciansearch/PhysicianSearch';
/*
import OfficeData from './content/physiciansearch/OfficeData';
import OfficeDetails from './content/physiciansearch/OfficeDetails';
//Telemed
//import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
import Videos from './content/virtual/Videos';
//Messages
import Messages from './content/messaging/Messages';
*/
export default function SphContent() {
	const [menu] = useContext(MenuContext);

	return (
		<div className='py-5'>
			{/*}
			{menu.vids && (
				<AgoraRTCProvider client={AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })}>
					<Videos />
				</AgoraRTCProvider>
			)}
		{*/}
			<div className='w-full min-h-40 mb-3 border-4 border-drkred rounded-3xl'>
				{menu.type === 'phySearch' && <PhysicianSearch />}
				{/*}
				{menu.type === 'messages' && <Messages />}
    {*/}
			</div>
			<div className='w-full min-h-40 mb-3 border-4 border-drkblu rounded-3xl'>
				{/*}
                {menu.func === 'phySearchData' && <OfficeData />}
{*/}
			</div>
			<div className='w-full min-h-40 border-4 border-drkppl rounded-3xl'>{/*{menu.dets === 'phySearchDetails' && <OfficeDetails />}*/}</div>
		</div>
	);
}
