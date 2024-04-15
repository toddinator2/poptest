import React, { createContext, useState } from 'react';

const ApptContext = createContext();

const ApptProvider = ({ children }) => {
	const [appts, setAppts] = useState({
		all: [],
		todays: [],
		prev: [],
		selected: '',
	});

	return <ApptContext.Provider value={[appts, setAppts]}>{children}</ApptContext.Provider>;
};

export { ApptContext, ApptProvider };
