'use client';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { getFromLocalStorage } from '@/utils/helpers/auth';
import Spinner from '@/components/global/spinner/Spinner';

export default function Setup() {
	const lsUserData = process.env.DATA_PHY;
	const lsDefLoc = process.env.DEFAULT_LOCATION;
	const svdUser = getFromLocalStorage(lsUserData);
	const svdDefLoc = getFromLocalStorage(lsDefLoc);
	const router = useRouter();
	const { status } = useSession();
	const [auth, setAuth] = useContext(AuthContext);
	const [_misc, setMisc] = useContext(MiscContext);
	const [chkdUser, setChkdUser] = useState(false);
	const [chkdLoc, setChkdLoc] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		//check status to make sure user is authenticated
		if (status !== 'authenticated' || !svdUser) {
			router.push('/physicians/login');
		}
	}, [status, router]);

	useEffect(() => {
		//set auth user context
		if (svdUser && !chkdUser) {
			const parseUser = async () => {
				const user = await JSON.parse(svdUser);
				setAuth({ user: user });
			};
			parseUser();
			setChkdUser(true);
		}
	}, [svdUser, chkdUser]);

	useEffect(() => {
		//set default location
		if (!chkdLoc) {
			if (svdDefLoc) {
				const getLoc = async () => {
					let locName = '';

					//get location name
					const response = await fetch(`${process.env.API_URL}/private/physicians/office/locations/get/byid?locid=${svdDefLoc}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						locName = data.loc.name;
					}
					setMisc({ defLocId: svdDefLoc, defLocName: locName, editId: '' });
				};
				getLoc();
			}
			setChkdLoc(true);
		}
	}, [svdDefLoc, chkdLoc]);

	useEffect(() => {
		if (Object.keys(auth.user).length !== 0 && chkdUser && chkdLoc) {
			setLoading(false);
			router.push('/physicians/schedule');
		}
	}, [auth.user, chkdUser, chkdLoc]);

	return <>{loading && <Spinner />}</>;
}
