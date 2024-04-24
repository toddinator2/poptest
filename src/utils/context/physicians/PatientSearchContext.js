import React, { createContext, useState } from 'react';

const PatientSearchContext = createContext();

const PatientSearchProvider = ({ children }) => {
	const [schPatients, setSchPatients] = useState({
		patients: [],
		selected: '',
		filtered: [],
	});

	return <PatientSearchContext.Provider value={[schPatients, setSchPatients]}>{children}</PatientSearchContext.Provider>;
};

export { PatientSearchContext, PatientSearchProvider };
