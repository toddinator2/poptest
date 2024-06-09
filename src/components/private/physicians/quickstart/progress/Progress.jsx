'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Profile from '../profile/Profile';
import Company from '../company/Company';
import Location from '../location/Location';
import Licensing from '../policies/Licensing';
import Payment from '../policies/Payment';
import Sponsor from '../policies/Sponsor';
import Directory from '../policies/Directory';
import Procenter from '../policies/Procenter';
import Agora from '../policies/Agora';
import Merchant from '../policies/Merchant';
import Terms from '../policies/Terms';
import Privacy from '../policies/Privacy';
import Comm from '../policies/Comm';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Progress() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [profile, setProfile] = useState(false);
	const [company, setCompany] = useState(false);
	const [location, setLocation] = useState(false);
	const [licensing, setLicensing] = useState(false);
	const [payment, setPayment] = useState(false);
	const [sponsor, setSponsor] = useState(false);
	const [directory, setDirectory] = useState(false);
	const [procenter, setProcenter] = useState(false);
	const [agora, setAgora] = useState(false);
	const [merchant, setMerchant] = useState(false);
	const [terms, setTerms] = useState(false);
	const [privacy, setPrivacy] = useState(false);
	const [comm, setComm] = useState(false);
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
				setLicensing(data.setup.licensing);
				setPayment(data.setup.payment);
				setSponsor(data.setup.sponsor);
				setDirectory(data.setup.directory);
				setProcenter(data.setup.procenter);
				setAgora(data.setup.agora);
				setMerchant(data.setup.merchant);
				setTerms(data.setup.terms);
				setPrivacy(data.setup.privacy);
				setComm(data.setup.comm);
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
			const osu = mongodb.db(dbName).collection('officesetups');

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
			if (!profile || !company || !location) {
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
				if (!licensing) {
					setPage('licensing');
					return;
				}
				if (!payment) {
					setPage('payment');
					return;
				}
				if (!sponsor) {
					setPage('sponsor');
					return;
				}
				if (!directory) {
					setPage('directory');
					return;
				}
				if (!procenter) {
					setPage('procenter');
					return;
				}
				if (!agora) {
					setPage('agora');
					return;
				}
				if (!merchant) {
					setPage('merchant');
					return;
				}
				if (!terms) {
					setPage('terms');
					return;
				}
				if (!privacy) {
					setPage('privacy');
					return;
				}
				if (!comm) {
					setPage('comm');
					return;
				}
			}
		}
	}, [chkdSetup, profile, company, location, licensing, payment, sponsor, directory, procenter, agora, merchant, terms, privacy, comm]);

	return (
		<>
			<div className='my-5 text-2xl text-center'>Physician Quick Start</div>
			{page === 'profile' && <Profile />}
			{page === 'company' && <Company />}
			{page === 'location' && <Location />}
			{page === 'licensing' && <Licensing />}
			{page === 'payment' && <Payment />}
			{page === 'sponsor' && <Sponsor />}
			{page === 'directory' && <Directory />}
			{page === 'procenter' && <Procenter />}
			{page === 'agora' && <Agora />}
			{page === 'merchant' && <Merchant />}
			{page === 'terms' && <Terms />}
			{page === 'privacy' && <Privacy />}
			{page === 'comm' && <Comm />}
		</>
	);
}
