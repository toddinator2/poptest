'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<SessionProvider>
				<body className={`body ${inter.className}`}>
					<Toaster
						toastOptions={{
							success: {
								duration: 5000,
								iconTheme: {
									primary: 'green',
									secondary: 'green',
								},
								style: {
									border: '2px solid #65fe08',
								},
							},
							error: {
								duration: 5000,
								iconTheme: {
									primary: '#ec2e38',
									secondary: '#ec2e38',
								},
								style: {
									border: '2px solid #ec2e38',
								},
							},
						}}
					/>
					{children}
				</body>
			</SessionProvider>
		</html>
	);
}
