'use client';
import React, { useContext, useState } from 'react';
import '../../SubSphereContent.css';
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

export default function Videos() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const channelName = auth.user._id;
	const { isLoading: isLoadingMic, localMicrophoneTrack } = useLocalMicrophoneTrack();
	const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
	const remoteUsers = useRemoteUsers();
	const { audioTracks } = useRemoteAudioTracks(remoteUsers);
	const token = misc.editId;
	const [activeConnection, setActiveConnection] = useState(true);
	const [isCamOn, setIsCamOn] = useState(true);
	const [isMicOn, setIsMicOn] = useState(true);

	useJoin(
		{
			appid: process.env.AGORA_APP_ID,
			channel: channelName,
			token: token,
		},
		activeConnection
	);
	usePublish([localMicrophoneTrack, localCameraTrack]);
	audioTracks.map((track) => track.play());
	const deviceLoading = isLoadingMic || isLoadingCam;

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
				<div className='row my-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='chkListHdng'>Loading Devices...</div>
					</div>
				</div>
			) : (
				<div className='row my-3'>
					<div className='col-10 col-xl-6 offset-1 offset-xl-0 pe-2 d-flex justify-content-end'>
						<div className='row pe-3' style={{ width: '100%' }}>
							<div className='col-8 d-flex justify-content-end'>
								{!localCameraTrack || localCameraTrack === null ? (
									<div></div>
								) : (
									<>
										{isCamOn ? (
											<Image src={vidOn} alt='Camera On' onClick={() => handleCamera()} />
										) : (
											<Image src={vidOff} alt='Camera Off' onClick={() => handleCamera()} />
										)}
									</>
								)}
							</div>
							<div className='col-2 d-flex justify-content-center'>
								{!localMicrophoneTrack || localMicrophoneTrack === null ? (
									<div></div>
								) : (
									<>
										{isMicOn ? (
											<Image src={micOn} alt='Microphone On' onClick={() => handleMicrophone()} />
										) : (
											<Image src={micOff} alt='Microphone Off' onClick={() => handleMicrophone()} />
										)}
									</>
								)}
							</div>
							<div className='col-2 d-flex justify-content-end'>
								<Image src={close} alt='Close' onClick={() => handleClose()} />
							</div>
						</div>
						<div className='row' style={{ width: '100%' }}>
							<div className='col-12'>
								<LocalVideoTrack
									track={localCameraTrack}
									play={true}
									style={{ width: '400px', height: '250px', border: '4px solid #555555' }}
								/>
							</div>
						</div>
					</div>
					<div className='col-10 col-xl-6 offset-1 ps-2 offset-xl-0'>
						{remoteUsers.map((user) => (
							<RemoteUser user={user} key={user.id} />
						))}
					</div>
				</div>
			)}
		</>
	);
}
