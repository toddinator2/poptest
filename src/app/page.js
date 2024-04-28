'use client';
import React from 'react';
import './page.css';
import { useRouter } from 'next/navigation';

export default function Home() {
	const router = useRouter();
	router.push('/physicians/login');
}
