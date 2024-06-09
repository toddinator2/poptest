import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import SphContent from '../SphContent';
//import Sidebar from '../sidebar/Sidebar';

export default function PageTemplate() {
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

	return (
		<>
			{screenWidth > 0 && (
				<div className='w-full'>
					<Header screenWidth={screenWidth} />
					{screenWidth < 1280 && (
						<>
							<div className='w-5/6 mx-auto min-h-screen'>
								<SphContent />
							</div>
						</>
					)}
					{screenWidth >= 1280 && (
						<div className='w-full flex flex-row'>
							<div className='w-1/5 min-h-screen 2xl:w-1/6 border-r-2 border-dotted border-r-drkgry'>&nbsp;</div>
							<div className='w-4/5 min-h-screen 2xl:w-5/6'>&nbsp;</div>
						</div>
					)}
					{/*}
				<div className='row'>
					<div className='col-12 col-md-4 col-xl-3 col-xxl-2'>
						<div className='subSideDiv py-2'>
							<Sidebar />
						</div>
					</div>
					<div className='subContContainer col-12 col-md-8 col-xl-9 col-xxl-10'>
						<SubSphereContent />
					</div>
				</div>
	{*/}
				</div>
			)}
		</>
	);
}
