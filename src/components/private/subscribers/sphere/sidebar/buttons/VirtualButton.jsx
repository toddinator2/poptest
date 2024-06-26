import React, { useContext } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';

export default function VirtualButton() {
	const [menu, setMenu] = useContext(MenuContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleMenu = () => {
		setMenu({ type: menu.type, func: menu.func, dets: menu.dets, vids: true, page: '' });
	};

	return (
		<div className='sbButton' onClick={() => handleMenu()}>
			NOVA VIRTUAL
		</div>
	);
}
