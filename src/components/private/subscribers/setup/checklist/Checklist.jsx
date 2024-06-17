'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Checklist() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [profile, setProfile] = useState(false);
	const [docForm, setDocForm] = useState(false);
	const [empForm, setEmpForm] = useState(false);
	const [medHist, setMedHist] = useState(false);
	const [agreement, setAgreement] = useState(false);
	const [chkdSetup, setChkdSetup] = useState(false);

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
		<div className='w-5/6 mx-auto py-3 flex flex-col'>
			{chkdSetup && (
				<>
					<div className='mb-1 text-lg text-lgtblu'>Profile &amp; Contact Forms</div>
					<div className=' mb-1 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={profile} readOnly />
						</div>
						<div className='ps-1'>
							<div className='text-sm'>Subscriber Profile</div>
						</div>
					</div>
					<div className='mb-1 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={docForm} readOnly />
						</div>
						<div className='ps-1'>
							<div className='text-sm'>My Physician Form</div>
						</div>
					</div>
					<div className='flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={empForm} readOnly />
						</div>
						<div className='ps-1'>
							<div className='text-sm'>My Employer Form</div>
						</div>
					</div>
					<div className='mt-5 mb-1 text-lg text-lgtblu'>Comprehensive Medical History</div>
					<div className='flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={medHist} readOnly />
						</div>
						<div className='ps-1'>
							<div className='text-sm'>Medical History</div>
						</div>
					</div>
					<div className='mt-5 mb-1 text-lg text-lgtblu'>Acknowledge &amp; Consent</div>
					<div className='flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={agreement} readOnly />
						</div>
						<div className='ps-1'>
							<div className='text-sm'>Acknowledge &amp; Consent</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
