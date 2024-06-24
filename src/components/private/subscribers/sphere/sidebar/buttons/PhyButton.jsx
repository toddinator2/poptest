import React, { useContext, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import SbOfcList from '../btnmodules/SbOfcList';
import search from '@/assets/images/icoSearch.png';

export default function PhyButton() {
	const [menu, setMenu] = useContext(MenuContext);
	const [shwOfcDiv, setShwOfcDiv] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const shwOffice = () => {
		let curShow = shwOfcDiv;
		setShwOfcDiv(!shwOfcDiv);
		if (curShow) {
			setMenu({ type: '', func: '', dets: '', vids: menu.vids, page: menu.page });
		}
	};

	const handleMenu = () => {
		setMenu({ type: 'phySearch', func: '', dets: '', vids: menu.vids, page: menu.page });
	};

	return (
		<>
			{!shwOfcDiv ? (
				<div className='sbButton' onClick={() => shwOffice()}>
					PHYSICIANS
				</div>
			) : (
				<>
					<div className='sbButton active' onClick={() => shwOffice()}>
						PHYSICIANS
					</div>
					<div className='mt-1 mb-7'>
						<div className='sbBox p-3'>
							<div className='mb-2 flex justify-end'>
								<Image className='cursor-pointer' src={search} width={27} height='auto' alt='Search' onClick={() => handleMenu()} />
							</div>
							<SbOfcList />
						</div>
					</div>
				</>
			)}
		</>
	);
}
