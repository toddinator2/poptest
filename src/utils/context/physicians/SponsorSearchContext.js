import React, { createContext, useState } from 'react';

const SponsorSearchContext = createContext();

const SponsorSearchProvider = ({ children }) => {
	const [schSponsors, setSchSponsors] = useState({
		sponsors: [],
		selected: '',
		filtered: [],
	});

	return <SponsorSearchContext.Provider value={[schSponsors, setSchSponsors]}>{children}</SponsorSearchContext.Provider>;
};

export { SponsorSearchContext, SponsorSearchProvider };
