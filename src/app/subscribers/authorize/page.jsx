'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { getFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/lsSecure';
import toast from 'react-hot-toast';
import Spinner from '@/components/global/spinner/Spinner';

export default function Authorize() {
	const lsUname = process.env.UNAME_SUB;
	const lsUserData = process.env.DATA_SUB;
	const svdUname = getFromLocalStorage(lsUname);
	const router = useRouter();
	const { status } = useSession();
	const [auth, setAuth] = useContext(AuthContext);
	const [_misc, setMisc] = useContext(MiscContext);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);
	const [offices, setOffices] = useState([]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			setLoading(true);
			//try getting saved data first
			const response = await fetch(`${process.env.API_URL}/subscribers/get/forauthorize?uname=${svdUname}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setUser(data.subscriber);
			} else {
				setUser({});
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [svdUname]);

	const loadOffices = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/get/offices?subid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setOffices(data.ofcs);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (svdUname) {
			loadUser();
		}
	}, [loadUser]);

	useEffect(() => {
		loadOffices();
	}, [loadOffices]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK AUTHENTICATION
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		//check status to make sure user is authenticated
		if (status === 'unauthenticated' || !svdUname) {
			router.push('/subscribers/login');
		}
	}, [status, svdUname, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET CONTEXT DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (offices.length !== 0) {
			setMisc({ defLocId: offices[0].locObjId, defLocName: offices[0].locName, editId: '', props: {} });
		}
	}, [offices, setMisc]);

	useEffect(() => {
		if (user !== undefined) {
			if (Object.keys(user).length !== 0 && Object.keys(auth.user).length === 0) {
				if (!user.resetcreds && user.permission === 'subscriber') {
					const userObj = {
						_id: user._id,
						fname: user.fname,
						lname: user.lname,
						dob: user.dob,
						email: user.email,
						phone: user.phone,
						photo: user.photo,
						sex: user.sex,
						s3xid: user.subs3xid,
						perm: user.permission,
						role: user.role,
						offices: offices,
					};
					setAuth({ user: userObj });
					saveInLocalStorage(lsUserData, userObj);

					if (!user.setupcomplete) {
						router.push('/subscribers/setup');
					} else {
						router.push('/subscribers/sphere');
					}
				} else {
					if (user.permission !== 'subscriber') {
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
