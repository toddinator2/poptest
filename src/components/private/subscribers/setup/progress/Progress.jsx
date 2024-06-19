'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';
import Profile from '../profile/Profile';
import DocForm from '../docform/DocForm';
import EmpForm from '../empform/EmpForm';
import MedHist from '../medhist/MedHist';
import Agreement from '../agreement/Agreement';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Progress() {
	const dbName = process.env.REALM_DB;
	const router = useRouter();
	const [auth] = useContext(AuthContext);
	const [profile, setProfile] = useState(false);
	const [docform, setDocForm] = useState(false);
	const [empform, setEmpForm] = useState(false);
	const [medhist, setMedHist] = useState(false);
	const [agreement, setAgreement] = useState(false);
	const [chkdSetup, setChkdSetup] = useState(false);
	const [page, setPage] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// GENERAL FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setupDone = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/done`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					subid: auth.user._id,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
				router.push('/subscribers/sphere');
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadProgress = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/progress/overall?subid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setProfile(data.setup.profile);
				setDocForm(data.setup.docform);
				setEmpForm(data.setup.empform);
				setMedHist(data.setup.medhist);
				setAgreement(data.setup.agreement);
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
		loadProgress();
	}, [loadProgress]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DETERMINE PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (chkdSetup) {
			if (!profile) {
				setPage('profile');
				return;
			}
			if (!docform) {
				setPage('docform');
				return;
			}
			if (!empform) {
				setPage('empform');
				return;
			}
			if (!medhist) {
				setPage('medhist');
				return;
			}
			if (!agreement) {
				setPage('agreement');
				return;
			}

			if (profile && docform && empform && medhist && agreement) {
				setupDone();
			}
		}
	}, [chkdSetup, profile, docform, empform, medhist, agreement]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchSetup = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const su = mongodb.db(dbName).collection('subsetups');

			for await (const change of su.watch()) {
				if (change.operationType === 'update') {
					loadProgress();
				}
			}
		};
		wchSetup();
	}, [dbName, loadProgress]);

	return (
		<>
			{page === 'profile' && <Profile />}
			{page === 'docform' && <DocForm />}
			{page === 'empform' && <EmpForm />}
			{page === 'medhist' && <MedHist />}
			{page === 'agreement' && <Agreement />}
		</>
	);
}
