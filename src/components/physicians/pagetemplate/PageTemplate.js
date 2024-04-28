import React, { useContext, useEffect, useState } from 'react';
import './PageTemplate.css';
import { useSession } from 'next-auth/react';
import Header from '../header/Header';
import SchSidebar from '../sidebars/schedule/SchSidebar';
import Calendar from '../calendar/Calendar';

export default function PageTemplate({ page }) {
	const pg = page;
	const { status } = useSession();

	return (
		<>
			{status === 'authenticated' && (
				<div className='phyPgContainer'>
					<Header />
					{pg === 'schedule' && (
						<div className='row'>
							<div className='col-12 col-sm-4 col-xl-3 col-xxl-2'>
								<div className='phySideDiv py-2'>
									<SchSidebar page={pg} />
								</div>
							</div>
							<div className='phyContContainer col-12 col-sm-8 col-xl-9 col-xxl-10'>
								<Calendar />
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}
