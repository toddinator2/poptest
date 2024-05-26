'use client'
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
	<html lang="en">
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
    </html>
  );
}
