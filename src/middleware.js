export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/api/private/:path*',
		'/physicians/authorize',
		'/physicians/setup',
		'/physicians/schedule',
		'/physicians/sphere',
		'/physicians/patientprofile',
		'/subscribers/authorize',
		'/subscribers/setup/:path*',
		'/subscribers/sphere/:path*',
		'/sponsors/authorize',
		'/sponsors/setup/:path*',
		'/sponsors/sphere/:path*',
	],
};
