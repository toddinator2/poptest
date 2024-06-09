'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import Progress from '@/components/private/subscribers/setup/progress/Progress';

export default function SubSetup() {
	const router = useRouter();
	const { status } = useSession();
	const [auth] = useContext(AuthContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK TO MAKE SURE USER IS AUTHENTICATED
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/subscribers/login');
		}
	}, [status, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK TO MAKE SURE AUTH CONTEXT IS SET (THIS IS MOSTLY FOR PAGE REFRESH)
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(auth.user).length === 0) {
			router.push('/subscribers/authorize');
		}
	}, [auth, router]);

	return <>{Object.keys(auth.user).length !== 0 && <Progress />}</>;
}
