import React, { createContext, useState } from 'react';

const PatientPopupContext = createContext();

const PatientPopupProvider = ({ children }) => {
	const [popPatients, setPopPatients] = useState({
		patients: [],
		selected: '',
		filtered: [],
	});

	return <PatientPopupContext.Provider value={[popPatients, setPopPatients]}>{children}</PatientPopupContext.Provider>;
};

export { PatientPopupContext, PatientPopupProvider };
