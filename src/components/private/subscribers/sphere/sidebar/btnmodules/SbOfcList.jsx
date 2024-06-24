import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import toast from 'react-hot-toast';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function SbOfcList() {
	const dbName = process.env.REALM_DB;
	const lsUserData = process.env.DATA_SUB;
	const [auth, setAuth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [_misc, setMisc] = useContext(MiscContext);
	const [offices, setOffices] = useState([]);
	const [chkdOffices, setChkdOffices] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadOffices = useCallback(async () => {
		try {
			let ofcData = [];
			const response = await fetch(`${process.env.API_URL}/subscribers/get/offices?subid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.ofcs === null || data.ofcs === undefined) {
				ofcData = [];
			} else {
				ofcData = data.ofcs;
			}

			const userObj = {
				_id: auth.user._id,
				fname: auth.user.fname,
				lname: auth.user.lname,
				dob: auth.user.dob,
				email: auth.user.email,
				phone: auth.user.phone,
				photo: auth.user.photo,
				sex: auth.user.sex,
				s3xid: auth.user.s3xid,
				perm: auth.user.permission,
				role: auth.user.role,
				offices: ofcData,
			};
			setAuth({ user: userObj });
			saveInLocalStorage(lsUserData, userObj);
			setOffices(ofcData);
			setChkdOffices(true);
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	}, [auth, setAuth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (!chkdOffices) {
			loadOffices();
		}
	}, [chkdOffices, loadOffices]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchOfficeRelation = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const rel = mongodb.db(dbName).collection('relphysubs');

			for await (const change of rel.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadOffices();
				}
			}
		};
		wchOfficeRelation();
	}, [dbName, loadOffices]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleMenu = (locId, phyId, locName) => {
		setMenu({ type: 'ofcInfo', func: '', dets: '', vids: menu.vids, page: menu.page });
		setMisc({ defLocId: locId, defLocName: locName, editId: '', props: { phyId: phyId } });
	};

	return (
		<>
			{offices.length === 0 && chkdOffices ? (
				<div className='text-sm text-center font-semibold text-drkred'>No Physicians Found</div>
			) : (
				<>
					{offices.map((ofc) => (
						<div
							className='mb-1 text-sm text-txtblu hover:text-lgtblu cursor-pointer'
							key={ofc.relObjId}
							onClick={() => handleMenu(ofc.locObjId, ofc.phyObjId, ofc.locName)}
						>
							{ofc.ofcName}
						</div>
					))}
				</>
			)}
		</>
	);
}
