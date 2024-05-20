import React, { useContext } from 'react';
import '../../Sidebar.css';
import { MenuContext } from '@/utils/context/global/MenuContext';

export default function VirtualButton() {
	const [menu, setMenu] = useContext(MenuContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleMenu = () => {
		setMenu({ type: menu.type, func: menu.func, dets: 'joinCall', vids: false });
	};

	return (
		<div className='sbButton' onClick={() => handleMenu()}>
			NOVA VIRTUAL
		</div>
	);
}
