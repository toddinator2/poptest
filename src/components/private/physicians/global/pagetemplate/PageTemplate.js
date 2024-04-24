'use client';
import React, { useContext, useEffect, useState } from 'react';
import './PageTemplate.css';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Header from '@/components/private/physicians/global/header/Header';
import Calendar from '../../calendar/Calendar';
import PatientProfile from '../../patientprofile/PatientProfile';
import SchDatadiv from '../../sidebars/schedule/datadiv/SchDatadiv';
import SchSidebar from '../../sidebars/schedule/sidebar/SchSidebar';
import PtPrfDatadiv from '../../sidebars/patientprofile/datadiv/PtPrfDatadiv';
import PtPrfSidebar from '../../sidebars/patientprofile/sidebar/PtPrfSidebar';
import SphDataDiv from '../../sidebars/sphere/datadiv/SphDataDiv';
import SphSidebar from '../../sidebars/sphere/sidebar/SphSidebar';
import PhySphereContent from '../../sphere/PhySphereContent';

export default function PageTemplate(page) {
	const pg = page.page;
	const router = useRouter();
	const { status } = useSession();
	const [menu] = useContext(MenuContext);
	const [screenWidth, setScreenWidth] = useState(0);

	useEffect(() => {
		if (screenWidth === 0) {
			setScreenWidth(window.innerWidth);
		}
	}, [screenWidth, window]);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
		}

		// Attach the event listener to the window object
		window.addEventListener('resize', handleResize);

		// Remove the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [window]);

	useEffect(() => {
		if (status !== 'authenticated') {
			router.push('/physicians/login');
		}
	}, [status, router]);

	return (
		<>
			{status === 'authenticated' && (
				<div className='phyPgContainer'>
					<Header />
					{screenWidth !== 0 && (
						<>
							{pg === 'schedule' && (
								<div className='row'>
									<div className='phyDataContainer col-12 col-md-4 col-xl-2'>
										{screenWidth < 1400 ? <SchDatadiv dataType={menu.type} /> : <SchSidebar />}
									</div>
									<div className='phyContContainer col-12 col-md-8 col-xl-10'>
										<Calendar />
									</div>
								</div>
							)}
							{pg === 'patientprofile' && (
								<div className='row'>
									<div className='phyDataContainer col-12 col-md-4 col-xl-2'>{screenWidth < 1400 ? <PtPrfDatadiv /> : <PtPrfSidebar />}</div>
									<div className='phyContContainer col-12 col-md-8 col-xl-10'>
										<PatientProfile />
									</div>
								</div>
							)}
							{pg === 'sphere' && (
								<div className='row'>
									<div className='phyDataContainer col-12 col-md-4 col-xl-2'>
										{screenWidth < 1400 ? <SphDataDiv dataType={menu.type} /> : <SphSidebar />}
									</div>
									<div className='phyContContainer col-12 col-md-8 col-xl-10'>
										<PhySphereContent />
									</div>
								</div>
							)}
						</>
					)}
				</div>
			)}
		</>
	);
}
