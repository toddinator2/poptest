'use client';
import React, { createContext, useState } from 'react';

const OfficeContext = createContext();

const OfficeProvider = ({ children }) => {
	const [office, setOffice] = useState({
		locations: [],
		selLoc: {},
		locOptions: [],
		defLoc: '',
		users: [],
		selUser: {},
		resources: [],
		selRscs: [],
		rscOptions: [],
	});

	return <OfficeContext.Provider value={[office, setOffice]}>{children}</OfficeContext.Provider>;
};

export { OfficeContext, OfficeProvider };
