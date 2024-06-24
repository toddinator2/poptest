import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import Spinner from '@/components/global/spinner/Spinner';
import icoClose from '@/assets/images/icoClose.png';

export default function AddMessage() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleClose = () => {
		setMenu({ type: '', func: '', dets: '', vids: menu.vids, page: menu.page });
	};

	return (
		<>
			<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>CREATE MESSAGE</div>
			<div className='p-2'>
				<div className='mb-3 flex justify-end'>
					<Image className='w-5 h-5 cursor-pointer' src={icoClose} title='Cancel' alt='Cancel' onClick={() => handleClose()} />
				</div>
			</div>
			<form onSubmit={handleSubmit}></form>
			{loading && <Spinner />}
		</>
	);
}
