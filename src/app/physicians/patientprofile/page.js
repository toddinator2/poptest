'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import PageTemplate from '@/components/private/physicians/global/pagetemplate/PageTemplate';

export default function PhySchedule() {
	const router = useRouter();
	const [auth, _setAuth] = useContext(AuthContext);
	const [office, _setOffice] = useContext(OfficeContext);

	useEffect(() => {
		if (Object.keys(auth.user).length === 0 || office.users.length === 0) {
			router.push('/physicians/setup');
		}
	});

	return <PageTemplate page='patientprofile'></PageTemplate>;
}
