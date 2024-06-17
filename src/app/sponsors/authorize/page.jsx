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
	const [sucomplete, setSuComplete] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/sponsors/users/get/byusername?uname=${svdUname}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setUser(data.sponsor);
				setSuComplete(data.setupcomplete);
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
			router.push('/sponsors/login');
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
						spnid: user.spns3xid,
						locObjId: user.spnlocObjId,
						spnObjId: user.spnObjId,
					};
					setAuth({ user: userObj });
					saveInLocalStorage(lsUserData, userObj);

					if (!sucomplete) {
						router.push('/sponsors/setup');
					} else {
						router.push('/sponsors/sphere');
					}
				} else {
					if (user.permission !== 'sponsor') {
						router.push('/sponsors/login');
					} else {
						signOut({ callbackUrl: `/sponsors/login/resetcreds/${user.resetcode}` });
					}
				}
			}
		}
	}, [svdUname, user, auth, setAuth, lsUserData, sucomplete, router]);

	return <>{loading && <Spinner />}</>;
}
