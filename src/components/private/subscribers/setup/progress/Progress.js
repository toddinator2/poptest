'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../Setup.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Profile from '../profile/Profile';
import DocForm from '../docform/DocForm';
import EmpForm from '../empform/EmpForm';
import MedHist from '../medhist/MedHist';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Progress() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [user, setUser] = useState({});
	const [page, setPage] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/get/byid?id=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setUser(data.patient);
			} else {
				setUser({});
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
		loadUser();
	}, [loadUser]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DETERMINE PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (user !== undefined) {
			if (Object.keys(user).length !== 0) {
				if (user.setupprogress.length === 0 || user.setupprogress === undefined) {
					setPage('profile');
				} else {
					for (let i = 0; i < user.setupprogress.length; i++) {
						const pg = user.setupprogress[i];
						if (pg === 'profile') {
							setPage('docform');
						}
						if (pg === 'docform') {
							setPage('empform');
						}
						if (pg === 'empform') {
							setPage('medhist');
						}
					}
				}
			}
		}
	}, [user, page]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchPatients = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const pts = mongodb.db(dbName).collection('patients');

			for await (const change of pts.watch()) {
				if (change.operationType === 'update') {
					loadUser();
				}
			}
		};
		wchPatients();
	}, [dbName, loadUser]);

	return (
		<>
			{page === 'profile' && <Profile user={user} />}
			{page === 'docform' && <DocForm user={user} />}
			{page === 'empform' && <EmpForm user={user} />}
			{page === 'medhist' && <MedHist user={user} />}
		</>
	);
}
