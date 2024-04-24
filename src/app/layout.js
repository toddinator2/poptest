'use client';
import { Exo } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/utils/context/global/AuthContext';
import { PatientSearchProvider } from '@/utils/context/physicians/PatientSearchContext';
import { PatientPopupProvider } from '@/utils/context/physicians/PatientPopupContext';
import { MenuProvider } from '@/utils/context/global/MenuContext';
import { OfficeProvider } from '@/utils/context/physicians/OfficeContext';
import { EcommProvider } from '@/utils/context/physicians/EcommContext';
import { ApptProvider } from '@/utils/context/physicians/Appointments';
import { MiscProvider } from '@/utils/context/physicians/MiscContext';

const exo = Exo({ subsets: ['latin'] });

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<SessionProvider>
				<AuthProvider>
					<MenuProvider>
						<MiscProvider>
							<PatientSearchProvider>
								<PatientPopupProvider>
									<OfficeProvider>
										<EcommProvider>
											<ApptProvider>
												<body className={`body ${exo.className}`}>
													<Toaster
														toastOptions={{
															success: {
																duration: 5000,
																theme: {
																	primary: 'green',
																	secondary: 'green',
																},
																style: {
																	border: '2px solid #65fe08',
																},
															},
															error: {
																duration: 5000,
																theme: {
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
											</ApptProvider>
										</EcommProvider>
									</OfficeProvider>
								</PatientPopupProvider>
							</PatientSearchProvider>
						</MiscProvider>
					</MenuProvider>
				</AuthProvider>
			</SessionProvider>
		</html>
	);
}
