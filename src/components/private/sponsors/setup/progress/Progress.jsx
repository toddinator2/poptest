'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Profile from '../profile/Profile';
import Location from '../location/Location';
import Agreement from '../agreement/Agreement';
import Bank from '../bank/Bank';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Progress() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [type, setType] = useState('');
	const [profile, setProfile] = useState(false);
	const [location, setLocation] = useState(false);
	const [agreement, setAgreement] = useState(false);
	const [bank, setBank] = useState(false);
	const [page, setPage] = useState('');
	const [chkdSetup, setChkdSetup] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadSetup = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/setup/get/progress?spnid=${auth.user.spnObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setType(data.setup.type);
				setProfile(data.setup.profile);
				setLocation(data.setup.location);
				setAgreement(data.setup.agreement);
				setBank(data.setup.bank);
				setChkdSetup(true);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadSetup();
	}, [loadSetup]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DETERMINE PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (chkdSetup) {
			if (!profile) {
				setPage('profile');
				return;
			}
			if (!location) {
				setPage('location');
				return;
			}
			if (!agreement) {
				setPage('agreement');
				return;
			}
			if (!bank) {
				setPage('bank');
				return;
			}
		}
	}, [chkdSetup, profile, location, agreement, bank]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchSetup = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const su = mongodb.db(dbName).collection('spnsetups');

			for await (const change of su.watch()) {
				if (change.operationType === 'update') {
					loadSetup();
				}
			}
		};
		wchSetup();
	}, [dbName, loadSetup]);

	return (
		<>
			<div className='my-5 text-2xl text-center'>Sponsor Account Setup</div>
			{page === 'profile' && <Profile type={type} />}
			{page === 'location' && <Location type={type} />}
			{page === 'agreement' && <Agreement type={type} />}
			{page === 'bank' && <Bank type={type} />}
		</>
	);
}
