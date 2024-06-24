import React, { useContext } from 'react';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import noImg from '@/assets/images/noProfile.png';

export default function PhyResultsCard({ phy }) {
	const [misc, setMisc] = useContext(MiscContext);
	const [menu, setMenu] = useContext(MenuContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleChange = (props) => {
		setMenu({ type: menu.type, func: '', dets: '', vids: false, page: menu.page });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: {} });
		setTimeout(() => {
			handleMenu(props);
		}, 300);
	};

	const handleMenu = (props) => {
		setMenu({ type: menu.type, func: 'phySchOfcInfo', dets: 'phySchOfcDets', vids: false, page: menu.page });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: props });
	};

	return (
		<div className='mb-4 flex flex-col border-b-2 border-drkbrd' key={phy._id}>
			{phy.photo ? (
				<Image className='w-12 h-12 mb-1 rounded-full' src={phy.photo} alt='Photo' />
			) : (
				<Image className='w-12 h-12 mb-1 rounded-full' src={noImg} alt='No Photo' />
			)}
			<div className='text-sm text-txtblu hover:text-lgtblu cursor-pointer' onClick={() => handleChange({ locId: phy.locId, phyId: phy.phyId })}>
				{phy.title}
			</div>
			<div className='text-sm'>
				<strong>{phy.ofcName.toUpperCase()}</strong>
			</div>
			<div className='mb-4 text-sm'>{phy.locName}</div>
		</div>
	);
}
