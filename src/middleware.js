export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/api/private/:path*',
		'/physicians/setup',
		'/physicians/schedule',
		'/physicians/sphere',
		'/physicians/patientprofile',
		'/subscribers/setup',
		'/subscribers/sphere',
	],
};
