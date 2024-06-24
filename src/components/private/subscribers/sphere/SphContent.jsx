'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';
//Physicians Button
import PhysicianSearch from './content/physicians/physiciansearch/PhysicianSearch';
import OfficeInfo from './content/physicians/officeinfo/OfficeInfo';
import OfficeDetails from './content/physicians/physiciansearch/OfficeDetails';
//Telemed
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react';
//import Videos from './content/virtual/Videos';
//Messages
import AddMessage from './content/messages/add/AddMessage';

//need to dynmaically import videos to not get the 'window is not defined error'
//const VideoScreens = dynamic(() => import('./content/virtual/Videos'), { ssr: false });

export default function SphContent() {
	const [auth] = useContext(AuthContext);
	const [menu] = useContext(MenuContext);
	const [token, setToken] = useState('');
	const channelName = auth.user.fname + ' ' + auth.user.lname;

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CREATE TOKEN
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const getToken = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/virtual?channel=${channelName}`, {
				method: 'GET',
			});
			const data = await response.json();

			setToken(data.token);
		} catch (err) {
			toast.error(err);
		}
	}, [channelName]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// GET TOKEN
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		getToken();
	}, [getToken]);

	return (
		<>
			{menu.vids && (
				<AgoraRTCProvider client={AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })}>
					<div>Videos Go Here</div>
					{/*}
					<div className='w-full py-5 xl:py-3 flex justify-center'>
						<VideoScreens token={token} />
					</div>
					{*/}
				</AgoraRTCProvider>
			)}
			<div className='py-5 xl:py-3 xl:px-5 xl:flex xl:flex-row xl:justify-center xl:gap-3'>
				<div className='w-full xl:w-1/3 mb-3 xl:mb-0 min-h-40 border-4 border-drkred rounded-3xl'>
					{menu.type === 'phySearch' && <PhysicianSearch />}
					{menu.type === 'ofcInfo' && <OfficeInfo />}
					{menu.type === 'msgAdd' && <AddMessage />}
				</div>
				<div className='w-full xl:w-1/3 mb-3 xl:mb-0 min-h-40 border-4 border-drkblu rounded-3xl'>
					{menu.func === 'phySchOfcInfo' && <OfficeInfo />}
				</div>
				<div className='w-full xl:w-1/3 min-h-40 border-4 border-drkppl rounded-3xl'>{menu.dets === 'phySchOfcDets' && <OfficeDetails />}</div>
			</div>
		</>
	);
}
