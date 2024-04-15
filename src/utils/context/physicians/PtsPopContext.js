import React, { createContext, useState } from 'react';

const PtPopContext = createContext();

const PtPopProvider = ({ children }) => {
	const [popPatients, setPopPatients] = useState({
		patients: [],
		selected: '',
		filtered: [],
	});

	return <PtPopContext.Provider value={[popPatients, setPopPatients]}>{children}</PtPopContext.Provider>;
};

export { PtPopContext, PtPopProvider };
