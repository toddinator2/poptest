'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import PageTemplate from '@/components/private/physicians/global/pagetemplate/PageTemplate';

export default function PhySchedule() {
	const router = useRouter();
	const [auth] = useContext(AuthContext);

	useEffect(() => {
		if (Object.keys(auth.user).length === 0) {
			router.push('/physicians/setup');
		}
	}, [auth]);

	return <>{Object.keys(auth.user).length !== 0 && <PageTemplate page='patientprofile'></PageTemplate>}</>;
}
