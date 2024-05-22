'use client';
import { useContext, useEffect, useState } from 'react';
import '@livekit/components-styles';
import { ControlBar, GridLayout, LiveKitRoom, ParticipantTile, RoomAudioRenderer, useTracks } from '@livekit/components-react';
import { Track } from 'livekit-client';
import { AuthContext } from '@/utils/context/global/AuthContext';

export default function Virtual() {
	const [auth] = useContext(AuthContext);
	const room = auth.user._id;
	const name = auth.user.fname + auth.user.lname;
	const [token, setToken] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const resp = await fetch(`${process.env.API_URL}/livekittoken?room=${room}&username=${name}`);
				const data = await resp.json();
				setToken(data.token);
			} catch (e) {
				console.error(e);
			}
		})();
	}, [room, name]);

	if (token === '') {
		return <div>Connecting...</div>;
	}

	return (
		<div className='row'>
			<div className='col-10 col-xl-6 mb-5 pb-5 pe-0 pe-xl-4 offset-1 offset-xl-0 d-flex justify-content-center justify-content-xl-end'>
				<LiveKitRoom
					video={true}
					audio={true}
					token={token}
					serverUrl={process.env.LIVEKIT_URL}
					// Use the default LiveKit theme for nice styles.
					data-lk-theme='default'
					style={{ width: '400px', height: '250px' }}
				>
					{/* Your custom component with basic video conferencing functionality. */}
					<MyVideoConference />
					{/* The RoomAudioRenderer takes care of room-wide audio for you. */}
					<RoomAudioRenderer />
					{/* Controls for the user to start/stop audio, video, and screen share tracks and to leave the room. */}
					<ControlBar />
				</LiveKitRoom>
			</div>
			<div className='col-10 col-xl-6 offset-1 offset-xl-0 d-flex justify-content-center justify-content-xl-end'></div>
		</div>
	);
}

function MyVideoConference() {
	// `useTracks` returns all camera and screen share tracks. If a user
	// joins without a published camera track, a placeholder track is returned.
	const tracks = useTracks(
		[
			{ source: Track.Source.Camera, withPlaceholder: true },
			{ source: Track.Source.ScreenShare, withPlaceholder: false },
		],
		{ onlySubscribed: false }
	);
	console.log('tracks:', tracks);
	return (
		<GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
			{/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
			<ParticipantTile />
		</GridLayout>
	);
}
