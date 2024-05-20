'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import PageTemplate from '@/components/private/subscribers/sphere/pagetemplate/PageTemplate';

export default function SubSphere() {
	const router = useRouter();
	const { status } = useSession();
	const [auth] = useContext(AuthContext);

	useEffect(() => {
		if (status === 'unauthorized') {
			router.push('/subscribers/login');
		}
	}, [status]);

	useEffect(() => {
		if (Object.keys(auth.user).length === 0) {
			router.push('/subscribers/authorize');
		}
	}, [auth]);

	return <>{Object.keys(auth.user).length !== 0 && status === 'authenticated' && <PageTemplate />}</>;
}
