import { NextResponse } from 'next/server';
import { RtcTokenBuilder, RtcRole } from 'agora-token';

export const GET = async (request) => {
	const appId = process.env.AGORA_APP_ID;
	const appCertificate = process.env.AGORA_APP_CERTIFICATE;
	const { searchParams } = new URL(request.url);
	const channelName = searchParams.get('channel');
	const uid = 0;
	const role = RtcRole.PUBLISHER;
	const expirationTimeInSeconds = 1800;
	const currentTimestamp = Math.floor(Date.now() / 1000);
	const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

	// Build token with uid
	const tokenA = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);
	console.log('tokenA:', tokenA);
	return NextResponse.json({ token: tokenA, exp: privilegeExpiredTs, status: 200 });
};
