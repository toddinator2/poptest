import React, { createContext, useState } from 'react';

const MenuContext = createContext();

const MenuProvider = ({ children }) => {
	const [menu, setMenu] = useState({
		type: '',
		func: '',
	});

	return <MenuContext.Provider value={[menu, setMenu]}>{children}</MenuContext.Provider>;
};

export { MenuContext, MenuProvider };
