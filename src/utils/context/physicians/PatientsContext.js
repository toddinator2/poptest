import React, { createContext, useState } from 'react';

const PatientContext = createContext();

const PatientProvider = ({ children }) => {
	const [schPatients, setSchPatients] = useState({
		patients: [],
		selected: '',
		filtered: [],
	});

	return <PatientContext.Provider value={[schPatients, setSchPatients]}>{children}</PatientContext.Provider>;
};

export { PatientContext, PatientProvider };
