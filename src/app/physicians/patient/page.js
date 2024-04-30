'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/physicians/AuthContext';
import PageTemplate from '@/components/physicians/pagetemplate/PageTemplate';

export default function Patient() {
	const router = useRouter();
	const { status } = useSession();
	const [auth] = useContext(AuthContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK TO MAKE SURE USER IS AUTHENTICATED
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/physicians/login');
		}
	}, [status, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK TO MAKE SURE AUTH CONTEXT IS SET (THIS IS MOSTLY FOR PAGE REFRESH)
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(auth.user).length === 0) {
			router.push('/physicians/authorize');
		}
	}, [auth, router]);

	return <>{Object.keys(auth.user).length !== 0 && <PageTemplate page='patient'></PageTemplate>}</>;
}
