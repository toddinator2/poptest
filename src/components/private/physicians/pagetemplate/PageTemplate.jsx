import React, { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Header from '../header/Header';
import SchSidebar from '../sidebars/schsidebar/SchSidebar';
import Calendar from '../content/calendar/Calendar';
import SphSidebar from '../sidebars/sphsidebar/SphSidebar';
import SphereContent from '../content/sphere/SphereContent';
/*
import PtSidebar from '../sidebars/patient/PtSidebar';
import PatientProfile from '../patientprofile/PatientProfile';
*/
export default function PageTemplate({ page }) {
	const pg = page;
	const router = useRouter();
	const { status } = useSession();
	const [menu, setMenu] = useContext(MenuContext);
	const [curPage, setCurPage] = useState('');
	const [screenWidth, setScreenWidth] = useState(0);

	useEffect(() => {
		setScreenWidth(window.innerWidth);
	}, []);

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
	}, []);

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/physicians/login');
		}
	}, [status, router]);

	useEffect(() => {
		if (pg !== curPage) {
			setMenu({ type: menu.type, func: menu.func, dets: menu.dets, vids: menu.vids, page: pg });
			setCurPage(pg);
		}
	}, [pg, curPage, menu, setMenu]);

	return (
		<>
			{status === 'authenticated' && screenWidth > 0 && (
				<div className='w-full'>
					<Header screenWidth={screenWidth} page={pg} />
					{pg === 'schedule' && (
						<>
							{screenWidth < 1280 && (
								<>
									<div className='w-5/6 mx-auto min-h-screen'>
										<Calendar />
									</div>
								</>
							)}
							{screenWidth >= 1280 && (
								<div className='w-full flex flex-row'>
									<div className='w-1/5 2xl:w-1/6 min-h-screen border-r-2 border-dotted border-r-drkgry'>
										<SchSidebar />
									</div>
									<div className='w-4/5 2xl:w-5/6 min-h-screen ps-3'>
										<Calendar />
									</div>
								</div>
							)}
						</>
					)}
					{pg === 'patient' && (
						<></>
						/*}
						<div className='row'>
							<div className='col-12 col-md-4 col-xl-3 col-xxl-2'>
								<div className='phySideDiv py-2'>
									<PtSidebar page={pg} />
								</div>
							</div>
							<div className='phyContContainer col-12 col-md-8 col-xl-9 col-xxl-10'>
								<PatientProfile />
							</div>
						</div>
                    {*/
					)}
					{pg === 'sphere' && (
						<>
							{screenWidth < 1280 && (
								<>
									<div className='w-5/6 mx-auto min-h-screen'>
										<SphereContent />
									</div>
								</>
							)}
							{screenWidth >= 1280 && (
								<div className='w-full flex flex-row'>
									<div className='w-1/5 2xl:w-1/6 min-h-screen border-r-2 border-dotted border-r-drkgry'>
										<SphSidebar />
									</div>
									<div className='w-4/5 2xl:w-5/6 min-h-screen ps-3'>
										<SphereContent />
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
