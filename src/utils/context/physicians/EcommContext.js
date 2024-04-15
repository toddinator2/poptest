import React, { createContext, useState } from 'react';

const EcommContext = createContext();

const EcommProvider = ({ children }) => {
	const [ecomm, setEcomm] = useState({
		cats: [],
		selCat: {},
		services: [],
		selSvc: {},
	});

	return <EcommContext.Provider value={[ecomm, setEcomm]}>{children}</EcommContext.Provider>;
};

export { EcommContext, EcommProvider };
