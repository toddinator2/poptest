import pkg from './config.mjs';
const {
	API_URL,
	API_URL_PUB,
	AUTH_TOKEN,
	CRYPTO_KEY,
	DATA_OFC,
	DATA_PHY,
	DATA_S3X,
	DATA_SPN,
	DATA_SUB,
	DATABASE,
	DEFAULT_LOCATION,
	DOMAIN,
	EMAILJS_SERVICE,
	EMAILJS_USER,
	ENVIRONMENT,
	FIREBASE_API_KEY,
	FIREBASE_AUTH_DOMAIN,
	FIREBASE_PROJECT_ID,
	FIREBASE_STORAGE_BUCKET,
	FIREBASE_MESSAGING_SENDER_ID,
	FIREBASE_APP_ID,
	FIREBASE_MEASUREMENT_ID,
	LIVEKIT_API_KEY,
	LIVEKIT_API_SECRET,
	LIVEKIT_URL,
	MAPS_KEY,
	NEXTAUTH_SECRET,
	NEXTAUTH_URL,
	OFC_ID,
	REALM_DB,
	REALM_ID,
	REM_PHY,
	REM_S3X,
	REM_SPN,
	REM_SUB,
	SELECTED_PT,
	UNAME_PHY,
	UNAME_S3X,
	UNAME_SPN,
	UNAME_SUB,
} = pkg;

/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		AGORA_APP_ID,
		AGORA_APP_CERTIFICATE,
		API_URL,
		API_URL_PUB,
		AUTH_TOKEN,
		CRYPTO_KEY,
		DATA_OFC,
		DATA_PHY,
		DATA_S3X,
		DATA_SPN,
		DATA_SUB,
		DATABASE,
		DEFAULT_LOCATION,
		DOMAIN,
		EMAILJS_SERVICE,
		EMAILJS_USER,
		ENVIRONMENT,
		FIREBASE_API_KEY,
		FIREBASE_AUTH_DOMAIN,
		FIREBASE_PROJECT_ID,
		FIREBASE_STORAGE_BUCKET,
		FIREBASE_MESSAGING_SENDER_ID,
		FIREBASE_APP_ID,
		FIREBASE_MEASUREMENT_ID,
		LIVEKIT_API_KEY,
		LIVEKIT_API_SECRET,
		LIVEKIT_URL,
		MAPS_KEY,
		NEXTAUTH_SECRET,
		NEXTAUTH_URL,
		OFC_ID,
		REALM_DB,
		REALM_ID,
		REM_PHY,
		REM_S3X,
		REM_SPN,
		REM_SUB,
		SELECTED_PT,
		UNAME_PHY,
		UNAME_S3X,
		UNAME_SPN,
		UNAME_SUB,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: '',
				pathname: '/v0/b/poppc-da92f.appspot.com/**',
			},
		],
	},
};

export default nextConfig;
