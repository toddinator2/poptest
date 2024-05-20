import React, { createContext, useState } from 'react';

const MiscContext = createContext();

const MiscProvider = ({ children }) => {
	const [misc, setMisc] = useState({
		defLocId: '',
		defLocName: '',
		editId: '',
		props: {},
	});

	return <MiscContext.Provider value={[misc, setMisc]}>{children}</MiscContext.Provider>;
};

export { MiscContext, MiscProvider };
