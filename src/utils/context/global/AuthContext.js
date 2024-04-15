import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: {},
	});

	return <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
