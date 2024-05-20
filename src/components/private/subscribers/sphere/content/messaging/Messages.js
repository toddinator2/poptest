import React, { useContext } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import close from '@/assets/images/icoClose.png';

export default function Messages() {
	const [auth] = useContext(AuthContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [menu, setMenu] = useContext(MenuContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleClose = () => {
		setMenu({ type: '', func: '', dets: '', vids: menu.vids });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: {} });
	};
	return (
		<>
			<div className='sphContHdrDiv red'>Messages</div>
			<div className='sphSubContainer'>
				<div className='row mb-2'>
					<div className='col-12 d-flex justify-content-end'>
						<Image className='sphIcon' src={close} alt='close' onClick={() => handleClose()} />
					</div>
				</div>
			</div>
		</>
	);
}
