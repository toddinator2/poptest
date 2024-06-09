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
	const lsUname = process.env.UNAME_PHY;
	const lsDefLoc = process.env.DEFAULT_LOCATION;
	const svdUname = getFromLocalStorage(lsUname);
	const svdLocId = getFromLocalStorage(lsDefLoc);
	const router = useRouter();
	const { status } = useSession();
	const [auth, setAuth] = useContext(AuthContext);
	const [_misc, setMisc] = useContext(MiscContext);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/office/users/get/byusername?uname=${svdUname}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setUser(data.user);
			} else {
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
			router.push('/physicians/login');
		}
	}, [status, svdUname, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(user).length === 0 && svdUname) {
			loadUser();
		}
	}, [user, svdUname, loadUser]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET CONTEXT DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(user).length !== 0 && Object.keys(auth.user).length === 0) {
			if (!user.resetcreds && (user.permission === 'physician' || user.permission === 'npp' || user.permission === 'staff')) {
				const userObj = {
					_id: user._id,
					fname: user.fname,
					lname: user.lname,
					email: user.email,
					phone: user.phone,
					photo: user.photo,
					perm: user.permission,
					role: user.role,
					supervisor: user.supervisor,
					paid: user.paid,
					title: user.title,
					license: user.license,
					npi: user.npi,
					specialty: user.specialty,
					ofcid: user.officeid,
					locObjId: user.locationObjId,
					ofcObjId: user.officeObjId,
				};
				setAuth({ user: userObj });

				//set location name & id
				try {
					setLoading(true);
					let locId = '';
					let locName = '';
					if (svdLocId) {
						locId = svdLocId;
					} else {
						locId = user.locationObjId[0];
					}

					const getLoc = async () => {
						//set location data
						const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/byid?locid=${locId}`, {
							method: 'GET',
						});
						const data = await response.json();

						if (data.status === 200) {
							locName = data.loc.name;
						}

						//find out if office setup has been completed
						const setup = await fetch(`${process.env.API_URL}/physicians/office/data/get/setupcomplete?id=${user.officeObjId}`, {
							method: 'GET',
						});
						const setupData = await setup.json();

						setMisc({ defLocId: locId, defLocName: locName, editId: '', props: {} });
						saveInLocalStorage(lsDefLoc, locId);
						if (setupData.complete) {
							router.push('/physicians/schedule');
						} else {
							router.push('/physicians/quickstart');
						}
					};
					getLoc();
				} catch (err) {
					toast.error(err);
				} finally {
					setLoading(false);
				}
			} else {
				if (user.permission !== 'physician' && user.permission !== 'npp' && user.permission !== 'staff') {
					router.push('/physicians/login');
				} else {
					signOut({ callbackUrl: `/physicians/login/resetcreds/${user.resetcode}` });
				}
			}
		}
	}, [user, auth, lsDefLoc, svdLocId, setAuth, setMisc, router]);

	return <>{loading && <Spinner />}</>;
}
