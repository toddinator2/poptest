import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function Checklist() {
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
	const [bank, setBank] = useState(false);
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
			const osu = mongodb.db(dbName).collection('officesetups');

			for await (const change of osu.watch()) {
				if (change.operationType === 'update') {
					loadSetup();
				}
			}
		};
		wchOfficeSetup();
	}, [dbName, loadSetup]);

	return (
		<div className='w-5/6 mx-auto py-3 flex flex-col'>
			{chkdSetup && (
				<>
					<div className='mb-1 text-lg font-semibold text-lgtppl'>Profiles &amp; Settings</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={profile} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Physician Profile</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={company} readOnly />
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
							<div className='text-sm'>Location Settings</div>
						</div>
					</div>
					<div className='mb-1 text-lg font-semibold text-lgtppl'>License Agreements</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={licensing} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Licensing Agreement</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={payment} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Payment Agreement</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={sponsor} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Sponsor Agreement</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={directory} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Directory Agreement</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={procenter} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Pro-Center Agreement</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={agora} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Agora Agreement</div>
						</div>
					</div>
					<div className='mb-4 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={merchant} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Merchant Agreement</div>
						</div>
					</div>
					<div className='mb-1 text-lg font-semibold text-lgtppl'>Acknowledgement &amp; Consent</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={terms} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Terms &amp; Conditions</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={privacy} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Privacy &amp; Security</div>
						</div>
					</div>
					<div className='mb-4 flex flex-row'>
						<div className='w-1/6 flex justify-end items-center'>
							<input className='chkBox' type='checkbox' checked={comm} readOnly />
						</div>
						<div className='ps-2'>
							<div className='text-sm'>Digital Communications</div>
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
		</div>
	);
}
