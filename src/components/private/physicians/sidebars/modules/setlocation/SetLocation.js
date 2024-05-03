'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './SetLocation.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Spinner from '@/components/global/spinner/Spinner';
import chgloc from '@/assets/images/icoChgLoc.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function SetLocation() {
	const dbName = process.env.REALM_DB;
	const lsDefLoc = process.env.DEFAULT_LOCATION;
	const [auth] = useContext(AuthContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [locId, setLocId] = useState('');
	const [locName, setLocName] = useState('');
	const [locOptions, setLocOptions] = useState([]);
	const [hideLoc, setHideLoc] = useState(true);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocationOptions = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/forselect?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLocOptions(data.locs);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		} finally {
			setLoading(false);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadLocationOptions();
	}, [loadLocationOptions]);

	useEffect(() => {
		if (!locId && misc.defLocId) {
			setLocId(misc.defLocId);
		}
	}, [locId, misc]);

	useEffect(() => {
		if (!locName && misc.defLocName) {
			setLocName(misc.defLocName);
		}
	}, [locName, misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchLocations = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const loc = mongodb.db(dbName).collection('officelocations');

			for await (const change of loc.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadLocationOptions();
				}
			}
		};
		wchLocations();
	}, [dbName, loadLocationOptions]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleLocation = async (e) => {
		e.preventDefault();
		const value = e.target.value;
		setLocId(value);
		saveInLocalStorage(lsDefLoc, value);

		//get location for name
		let locName = '';
		const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/byid?locid=${value}`, {
			method: 'GET',
		});
		const data = await response.json();

		if (data.status === 200) {
			locName = data.loc.name;
		}

		setLocName(locName);
		setMisc({ defLocId: value, defLocName: locName, editId: '' });
		handleHideLoc();
	};

	const handleHideLoc = () => {
		setHideLoc(!hideLoc);
	};

	return (
		<>
			{auth.user.locObjId.length >= 2 && (
				<div className='row mb-2 d-flex align-items-center'>
					<div className='col-4'>Location:</div>
					<div className='col-6 d-flex justify-content-end'>
						<div className='sphLocText'>{locName}</div>
					</div>
					<div className='col-2 d-flex justify-content-end'>
						<Image className='icoChgLoc' src={chgloc} title='Change Location' alt='loc' onClick={() => handleHideLoc()} />
					</div>
				</div>
			)}
			{!hideLoc && (
				<>
					{locOptions.length > 1 && (
						<div className='col-10 mb-5 offset-1'>
							<label className='frmLabel'>Select Location</label>
							<select className='inpBorder form-control' value={locId} onChange={(e) => handleLocation(e)}>
								<option value=''>Select One...</option>
								{locOptions.map((loc) => (
									<option value={loc.value} key={loc.value}>
										{loc.label}
									</option>
								))}
							</select>
						</div>
					)}
				</>
			)}
			{loading && <Spinner />}
		</>
	);
}
