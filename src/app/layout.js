'use client';
import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/utils/context/global/AuthContext';
import { MiscProvider } from '@/utils/context/global/MiscContext';
import { MenuProvider } from '@/utils/context/global/MenuContext';
import { PatientPopupProvider } from '@/utils/context/physicians/PatientPopupContext';
import { PatientSearchProvider } from '@/utils/context/physicians/PatientSearchContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<SessionProvider>
				<AuthProvider>
					<MenuProvider>
						<MiscProvider>
							<PatientPopupProvider>
								<PatientSearchProvider>
									<body className={`body ${inter.className}`}>
										<Toaster
											toastOptions={{
												success: {
													duration: 5000,
													iconTheme: {
														primary: '#26cc00',
														secondary: '#26cc00',
													},
													style: {
														border: '2px solid #26cc00',
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
								</PatientSearchProvider>
							</PatientPopupProvider>
						</MiscProvider>
					</MenuProvider>
				</AuthProvider>
			</SessionProvider>
		</html>
	);
}
