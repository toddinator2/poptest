'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { getFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/lsSecure';
import toast from 'react-hot-toast';
import Spinner from '@/components/global/spinner/Spinner';

export default function Authorize() {
	const lsUname = process.env.UNAME_SUB;
	const lsUserData = process.env.DATA_SUB;
	const svdUname = getFromLocalStorage(lsUname);
	const svdUser = getFromLocalStorage(lsUserData);
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
			//try getting saved data first
			if (svdUser) {
				setUser(svdUser);
			} else {
				const response = await fetch(`${process.env.API_URL}/subscribers/get/byusername?uname=${svdUname}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					setUser(data.patient);
				} else {
					setUser({});
					toast.error(data.msg);
				}
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [svdUser, svdUname]);

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
				if (!user.resetcreds && user.permission === 'patient') {
					const userObj = {
						_id: user._id,
						fname: user.fname,
						lname: user.lname,
						dob: user.dob,
						email: user.email,
						phone: user.mphone,
						photo: user.photo,
						s3xid: user.s3xid,
						permission: user.permission,
						role: user.role,
						offices: user.offices,
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
