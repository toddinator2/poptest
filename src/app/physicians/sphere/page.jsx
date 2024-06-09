'use client';
import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import PageTemplate from '@/components/private/physicians/pagetemplate/PageTemplate';
import { SponsorSearchProvider } from '@/utils/context/physicians/SponsorSearchContext';

export default function PhySphere() {
	const router = useRouter();
	const [auth] = useContext(AuthContext);

	useEffect(() => {
		if (Object.keys(auth.user).length === 0) {
			router.push('/physicians/authorize');
		}
	}, [auth]);

	return (
		<>
			{Object.keys(auth.user).length !== 0 && (
				<SponsorSearchProvider>
					<PageTemplate page='sphere'></PageTemplate>
				</SponsorSearchProvider>
			)}
		</>
	);
}
