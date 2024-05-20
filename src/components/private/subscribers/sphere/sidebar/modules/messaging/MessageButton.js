import React, { useContext } from 'react';
import '../../Sidebar.css';
import { MenuContext } from '@/utils/context/global/MenuContext';

export default function MessageButton() {
	const [menu, setMenu] = useContext(MenuContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleMenu = () => {
		setMenu({ type: 'messages', func: '', dets: '', vids: menu.vids });
	};

	return (
		<div className='sbButton' onClick={() => handleMenu()}>
			MESSAGES
		</div>
	);
}
