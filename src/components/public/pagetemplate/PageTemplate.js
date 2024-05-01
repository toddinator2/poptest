'use client';
import React, { Suspense, useEffect, useState } from 'react';
import './PageTemplate.css';
import Header from '../header/Header';

export default function PageTemplate({ children }) {
	const [screenWidth, setScreenWidth] = useState(0);
	const [screenHeight, setScreenHeight] = useState(0);

	useEffect(() => {
		setScreenWidth(window.innerWidth);
		setScreenHeight(window.innerHeight);
	}, []);

	useEffect(() => {
		function handleResize() {
			setScreenWidth(window.innerWidth);
			setScreenHeight(window.innerHeight);
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
			<Suspense>
				<Header />
			</Suspense>
			{screenWidth >= 1200 && (
				<div className='pgLgContainer'>
					<div className='row'>
						<div className='col-12'>{children}</div>
					</div>
				</div>
			)}
			{screenWidth < 1200 && (
				<div className='pgSmContainer'>
					<div className='row'>
						<div className='col-12'>{children}</div>
					</div>
				</div>
			)}
		</>
	);
}
