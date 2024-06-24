import React, { useContext, useState } from 'react';
import './Videos.css';
import Image from 'next/image';
import {
	LocalVideoTrack,
	RemoteUser,
	useJoin,
	useLocalCameraTrack,
	useLocalMicrophoneTrack,
	usePublish,
	useRemoteAudioTracks,
	useRemoteUsers,
} from 'agora-rtc-react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import vidOff from '@/assets/images/vidCamOff.png';
import vidOn from '@/assets/images/vidCamOn.png';
import micOff from '@/assets/images/vidMicOff.png';
import micOn from '@/assets/images/vidMicOn.png';
import close from '@/assets/images/vidLeave.png';

export default function Videos({ token }) {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const channelName = auth.user.fname + ' ' + auth.user.lname;
	const remoteUsers = useRemoteUsers();
	const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
	const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
	const { audioTracks } = useRemoteAudioTracks(remoteUsers);
	const [activeConnection, setActiveConnection] = useState(true);
	const [isCamOn, setIsCamOn] = useState(true);
	const [isMicOn, setIsMicOn] = useState(true);
	let deviceLoading = true;

	useJoin(
		{
			token: token,
			appid: process.env.AGORA_APP_ID,
			channel: channelName,
		},
		activeConnection
	);
	usePublish([localMicrophoneTrack, localCameraTrack]);
	audioTracks.map((track) => track.play());
	deviceLoading = isLoadingMic || isLoadingCam;

	const handleCamera = () => {
		if (localCameraTrack.enabled) {
			localCameraTrack.setEnabled(false);
			setIsCamOn(false);
		} else {
			localCameraTrack.setEnabled(true);
			setIsCamOn(true);
		}
	};

	const handleMicrophone = () => {
		if (localMicrophoneTrack.enabled) {
			localMicrophoneTrack.setEnabled(false);
			setIsMicOn(false);
		} else {
			localMicrophoneTrack.setEnabled(true);
			setIsMicOn(true);
		}
	};

	const handleClose = () => {
		localCameraTrack.close();
		localMicrophoneTrack.close();
		remoteUsers.length = 0;
		setActiveConnection(false);
		setMenu({ type: menu.type, func: menu.func, dets: menu.dets, vids: false });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: {} });
	};

	return (
		<>
			{deviceLoading ? (
				<div className='w-full py-5 text-lg font-semibold text-center text-lgtblu'>Loading Devices...</div>
			) : (
				<div className='w-full'>
					<div className='w-full mb-3 flex flex-row justify-center gap-3'>
						<div>
							{isCamOn ? (
								<Image src={vidOn} alt='Camera On' width={40} height={40} onClick={() => handleCamera()} />
							) : (
								<Image src={vidOff} alt='Camera Off' width={40} height={40} onClick={() => handleCamera()} />
							)}
						</div>
						<div>
							{isMicOn ? (
								<Image src={micOn} alt='Microphone On' width={40} height={40} onClick={() => handleMicrophone()} />
							) : (
								<Image src={micOff} alt='Microphone Off' width={40} height={40} onClick={() => handleMicrophone()} />
							)}
						</div>
						<div>
							<Image src={close} alt='Close' width={40} height={40} onClick={() => handleClose()} />
						</div>
					</div>
					<div className='w-full flex flex-col xl:flex-row justify-center xl:gap-5'>
						<div className='w-full xl:w-1/2 mb-2 flex justify-center xl:mb-0 xl:justify-end'>
							<LocalVideoTrack className='vidScreen' track={localCameraTrack} play={true} />
						</div>
						<div className='w-full xl:w-1/2 flex justify-center xl:justify-start'>
							{remoteUsers.map((user) => (
								<RemoteUser className='vidScreen' user={user} key={user.id} />
							))}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
