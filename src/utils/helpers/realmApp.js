import { useEffect, useState } from 'react';
import * as Realm from 'realm-web';

export function realmApp() {
	const [app, setApp] = useState(null);

	// Run in useEffect so that App is not created in server-side environment
	useEffect(() => {
		setApp(Realm.getApp(process.env.REALM_ID));
	}, []);

	return app;
}
