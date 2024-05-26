'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Header from '../header/Header';

export default function PageTemplate({ children }) {
	return (
		<>
			<Suspense>
				<Header />
			</Suspense>
			<div className='pt-24 sm:pt-12 xl:pt-36 2xl:pt-48'>{children}</div>
		</>
	);
}
