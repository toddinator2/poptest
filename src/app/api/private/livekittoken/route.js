import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function GET(request) {
	const apiKey = process.env.LIVEKIT_API_KEY;
	const apiSecret = process.env.LIVEKIT_API_SECRET;
	const wsUrl = process.env.LIVEKIT_URL;
	const { searchParams } = new URL(request.url);
	const room = searchParams.get('room');
	const username = searchParams.get('username');

	if (!room) {
		return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
	} else if (!username) {
		return NextResponse.json({ error: 'Missing "username" query parameter' }, { status: 400 });
	}

	if (!apiKey || !apiSecret || !wsUrl) {
		return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
	}

	const at = new AccessToken(apiKey, apiSecret, { identity: username });

	at.addGrant({ room: room, roomJoin: true, canPublish: true, canSubscribe: true });

	const token = await at.toJwt();
	console.log('token:', token);

	return NextResponse.json({ token: at.toJwt() });
}
