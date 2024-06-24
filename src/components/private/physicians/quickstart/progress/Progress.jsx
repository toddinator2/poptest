'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Profile from '../profile/Profile';
import Company from '../company/Company';
import Location from '../location/Location';
import Policy from '@/components/global/policies/Policy';
import Bank from '../bank/Bank';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Progress() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [profile, setProfile] = useState(false);
	const [company, setCompany] = useState(false);
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
			const response = await fetch(`${process.env.API_URL}/physicians/office/setup/get/progress?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setProfile(data.setup.profile);
				setCompany(data.setup.company);
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
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchOfficeSetup = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const osu = mongodb.db(dbName).collection('ofcsetups');

			for await (const change of osu.watch()) {
				if (change.operationType === 'update') {
					loadSetup();
				}
			}
		};
		wchOfficeSetup();
	}, [dbName, loadSetup]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DETERMINE PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (chkdSetup) {
			if (!profile || !company || !location || !agreement || !bank) {
				if (!profile) {
					setPage('profile');
					return;
				}
				if (!company) {
					setPage('company');
					return;
				}
				if (!location) {
					setPage('location');
					return;
				}
				if (!agreement) {
					setPage('S3xPhyLicenseAgreement');
					return;
				}
				if (!bank) {
					setPage('bank');
					return;
				}
			}
		}
	}, [chkdSetup, profile, company, location, agreement, bank]);

	return (
		<>
			<div className='my-5 text-2xl text-center'>Physician Quick Start</div>
			{page === 'profile' && <Profile />}
			{page === 'company' && <Company />}
			{page === 'location' && <Location />}
			{page === 'S3xPhyLicenseAgreement' && <Policy pol={page} reqType='s3x' su='phy' suFld='agreement' suFin={false} />}
			{page === 'bank' && <Bank />}
		</>
	);
}
