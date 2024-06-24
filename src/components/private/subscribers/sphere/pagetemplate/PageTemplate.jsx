import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import SphContent from '../SphContent';

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
							<div className='w-1/5 min-h-screen 2xl:w-1/6 px-2 border-r-2 border-dotted border-r-drkgry'>
								<Sidebar />
							</div>
							<div className='w-4/5 min-h-screen 2xl:w-5/6'>
								<SphContent />
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}
