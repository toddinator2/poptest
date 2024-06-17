import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Checklist() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [type, setType] = useState('');
	const [profile, setProfile] = useState(false);
	const [location, setLocation] = useState(false);
	const [agreement, setAgreement] = useState(false);
	const [bank, setBank] = useState(false);
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
		<div className='w-5/6 mx-auto py-3 flex flex-col'>
			{chkdSetup && (
				<>
					{type === 'private' ? (
						<>
							<div className='mb-1 text-lg font-semibold text-lgtppl'>Account Settings</div>
							<div className='mb-2 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={profile} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Personal Profiles</div>
								</div>
							</div>
							<div className='mb-4 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={location} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Responsible Party Address</div>
								</div>
							</div>
							<div className='mb-1 text-lg font-semibold text-lgtppl'>Agreements</div>
							<div className='mb-4 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={agreement} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Sponsor Agreement</div>
								</div>
							</div>
							<div className='mb-1 text-lg font-semibold text-lgtppl'>Payment Information</div>
							<div className='mb-2 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={bank} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Payment Information</div>
								</div>
							</div>
						</>
					) : (
						<>
							<div className='mb-1 text-lg font-semibold text-lgtppl'>Company Settings</div>
							<div className='mb-2 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={profile} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Company Profile</div>
								</div>
							</div>
							<div className='mb-4 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={location} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Company Location</div>
								</div>
							</div>
							<div className='mb-1 text-lg font-semibold text-lgtppl'>Agreements</div>
							<div className='mb-2 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={agreement} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Sponsor Agreement</div>
								</div>
							</div>
							<div className='mb-1 text-lg font-semibold text-lgtppl'>Payment Info & Payment</div>
							<div className='mb-2 flex flex-row'>
								<div className='w-1/6 flex justify-end items-center'>
									<input className='chkBox' type='checkbox' checked={bank} readOnly />
								</div>
								<div className='ps-2'>
									<div className='text-sm'>Payment Information</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
}
