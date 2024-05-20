'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { getFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/lsSecure';
import toast from 'react-hot-toast';
import Spinner from '@/components/global/spinner/Spinner';

export default function Authorize() {
	const lsUname = process.env.UNAME_SPN;
	const lsUserData = process.env.DATA_SPN;
	const svdUname = getFromLocalStorage(lsUname);
	const router = useRouter();
	const { status } = useSession();
	const [auth, setAuth] = useContext(AuthContext);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/sponsors/get/byusername?uname=${svdUname}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setUser(data.sponsor);
			} else {
				setUser({});
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [svdUname]);

	useEffect(() => {
		//check status to make sure user is authenticated
		if (status === 'unauthenticated' || !svdUname) {
			router.push('/subscribers/login');
		}
	}, [status, svdUname, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET CONTEXT DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (user !== undefined) {
			if (Object.keys(user).length !== 0 && Object.keys(auth.user).length === 0) {
				if (!user.resetcreds && user.permission === 'sponsor') {
					const userObj = {
						_id: user._id,
						fname: user.fname,
						lname: user.lname,
						email: user.email,
						phone: user.mphone,
						phoneext: user.phoneext,
						permission: user.permission,
						role: user.role,
						spnid: user.sponsorid,
						locObjId: user.spnlocationObjId,
						spnObjId: user.sponsorObjId,
					};
					setAuth({ user: userObj });
					saveInLocalStorage(lsUserData, userObj);

					if (!user.setupdone) {
						router.push('/subscribers/setup');
					} else {
						router.push('/subscribers/sphere');
					}
				} else {
					if (user.permission !== 'patient') {
						router.push('/subscribers/login');
					} else {
						signOut({ callbackUrl: `/subscribers/login/resetcreds/${user.resetcode}` });
					}
				}
			}
		}
	}, [svdUname, user, auth, setAuth, lsUserData, router]);

	return <>{loading && <Spinner />}</>;
}
