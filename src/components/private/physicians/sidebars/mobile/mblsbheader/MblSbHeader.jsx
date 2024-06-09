import React, { useContext } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Link from 'next/link';

export default function MblSbHeader() {
	const [menu] = useContext(MenuContext);

	return (
		<>
			<div className='mb-2 flex flex-row items-center justify-between'>
				<div className='w-auto'>
					{menu.page === 'schedule' ? (
						<div className='text-xl font-bold text-txtclr'>DATE</div>
					) : (
						<Link href='/physicians/schedule'>
							<div className='text-xl font-bold text-drkgry hover:text-txtblu cursor-pointer'>DATE</div>
						</Link>
					)}
				</div>
				<div className='w-auto'>
					{menu.page === 'patient' ? (
						<div className='text-xl font-bold text-txtclr'>CHART</div>
					) : (
						<div className='text-xl font-bold text-drkbrd'>CHART</div>
					)}
				</div>
				<div className='w-auto'>
					{menu.page === 'sphere' ? (
						<div className='text-xl font-bold text-txtclr'>SPHERE</div>
					) : (
						<Link href='/physicians/sphere'>
							<div className='text-xl font-bold text-drkgry hover:text-txtblu cursor-pointer'>SPHERE</div>
						</Link>
					)}
				</div>
			</div>
			<div className='mb-3 flex flex-row'>
				<div className='w-1/2 flex justify-center'>
					<Link href='/contact'>
						<div className='text-sm text-txtblu hover:text-txtclr cursor-pointer'>Support</div>
					</Link>
				</div>
				<div className='w-1/2 flex justify-center'>
					<div className='text-sm text-txtblu hover:text-txtclr cursor-pointer' onClick={() => signOut({ callbackUrl: '/subscribers/login' })}>
						Logout
					</div>
				</div>
			</div>
		</>
	);
}
