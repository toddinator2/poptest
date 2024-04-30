'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PatientSearch.css';
import { AuthContext } from '@/utils/context/physicians/AuthContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { PatientPopupContext } from '@/utils/context/physicians/PatientPopupContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import { FilterPtSearch, FormatDob } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import PatientData from '../patientdata/PatientData';
import Spinner from '@/components/global/spinner/Spinner';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function PatientSearch({ type }) {
	const dbName = process.env.REALM_DB;
	const lsSelPt = process.env.SELECTED_PT;
	const [auth] = useContext(AuthContext);
	const [schPatients, setSchPatients] = useContext(PatientSearchContext);
	const [popPatients, setPopPatients] = useContext(PatientPopupContext);
	const [searchText, setSearchText] = useState('');
	const [placeholder, setPlaceholder] = useState('');
	const [shwDataDiv, setShwDataDiv] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPatients = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/patients/get/forsearch?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setSchPatients({ patients: data.ptArr, selected: '', filtered: [] });
				setPopPatients({ patients: data.ptArr, selected: '', filtered: [] });
				setPlaceholder('Patient Search');
			} else {
				setPlaceholder('No Patients Found');
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [auth, setSchPatients, setPopPatients]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadPatients();
	}, [loadPatients]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchOffice = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const office = mongodb.db(dbName).collection('offices');

			for await (const change of office.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadPatients();
				}
			}
		};
		wchOffice();
	}, [dbName, loadPatients]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleChange = (e) => {
		const value = e.target.value;
		setSearchText(value);
		const newData = FilterPtSearch(value, schPatients.patients);
		if (type === 'popup') {
			setPopPatients({ patients: popPatients.patients, selected: popPatients.selected, filtered: newData });
		} else {
			setSchPatients({ patients: schPatients.patients, selected: schPatients.selected, filtered: newData });
		}
	};

	const handleSchPatient = (e, ptId) => {
		e.preventDefault();
		setSearchText('');
		setSchPatients({ patients: schPatients.patients, selected: ptId, filtered: [] });
		saveInLocalStorage(lsSelPt, ptId);
		setShwDataDiv(true);
	};

	const handlePopPatient = (e, ptId) => {
		e.preventDefault();
		setSearchText('');
		setPopPatients({ patients: popPatients.patients, selected: ptId, filtered: [] });
	};

	return (
		<div className='row my-3'>
			{(type === 'schSidebar' || type === 'sphSidebar') && (
				<>
					<input className='sbSearch' type='text' placeholder={placeholder} autoComplete='off' value={searchText} onChange={handleChange} />
					{schPatients.filtered && (
						<div className={schPatients.filtered ? 'resContainer' : 'hide'}>
							{schPatients.filtered.map((pt) => (
								<div className='row px-2 py-1 d-flex align-items-center' key={pt._id}>
									<div className='col-8'>
										<div className='listLinkText' onClick={(e) => handleSchPatient(e, pt._id)}>
											{pt.fname} {pt.lname}
										</div>
									</div>
									<div className='col-4 d-flex justify-content-end'>
										<div className='listInfoText'>{FormatDob(pt.dob)}</div>
									</div>
								</div>
							))}
						</div>
					)}
					{shwDataDiv && <PatientData />}
				</>
			)}
			{type === 'ptSidebar' && (
				<>
					<input className='sbSearch' type='text' placeholder={placeholder} autoComplete='off' value={searchText} onChange={handleChange} />
					{schPatients.filtered && (
						<div className={schPatients.filtered ? 'resContainer' : 'hide'}>
							{schPatients.filtered.map((pt) => (
								<div className='row px-2 py-1 d-flex align-items-center' key={pt._id}>
									<div className='col-8'>
										<div className='listLinkText' onClick={(e) => handleSchPatient(e, pt._id)}>
											{pt.fname} {pt.lname}
										</div>
									</div>
									<div className='col-4 d-flex justify-content-end'>
										<div className='listInfoText'>{FormatDob(pt.dob)}</div>
									</div>
								</div>
							))}
						</div>
					)}
					<PatientData />
				</>
			)}
			{type === 'popup' && (
				<>
					<div className='col-12 mb-2'>
						<input
							className='inpBorder ps-2'
							type='text'
							autoComplete='off'
							value={searchText}
							onChange={handleChange}
							style={{ width: '80%', height: '36px' }}
						/>
					</div>
					<div className='col-12'>
						<div className={popPatients.filtered ? 'resContainer' : 'hide'}>
							{popPatients.filtered.map((pt) => (
								<div className='row px-2 py-1 d-flex align-items-center' key={pt._id}>
									<div className='col-8'>
										<div className='listLinkText' onClick={(e) => handlePopPatient(e, pt._id)}>
											{pt.fname} {pt.lname}
										</div>
									</div>
									<div className='col-4 d-flex justify-content-end'>
										<div className='listInfoText'>{FormatDob(pt.dob)}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
			{loading && <Spinner />}
		</div>
	);
}
