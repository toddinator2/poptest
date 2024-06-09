'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PatientSearch.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { PatientPopupContext } from '@/utils/context/physicians/PatientPopupContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import { FilterPtSearch, FormatDob } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import PatientData from '../patientdata/PatientData';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function PatientSearch({ type }) {
	const dbName = process.env.REALM_DB;
	const lsSelPt = process.env.SELECTED_PT;
	const [auth] = useContext(AuthContext);
	const [schPatients, setSchPatients] = useContext(PatientSearchContext);
	const [popPatients, setPopPatients] = useContext(PatientPopupContext);
	const [searchText, setSearchText] = useState('');
	const [placeholder, setPlaceholder] = useState('');
	const [shwDataDiv, setShwDataDiv] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPatients = useCallback(async () => {
		try {
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
			toast.error('Network Error: Please try again');
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
		if (type === 'sidebar') {
			setSchPatients({ patients: schPatients.patients, selected: schPatients.selected, filtered: newData });
		} else {
			setPopPatients({ patients: popPatients.patients, selected: popPatients.selected, filtered: newData });
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
		<>
			{type === 'sidebar' ? (
				<div className='flex flex-col'>
					<input className='srchBox' type='text' placeholder={placeholder} autoComplete='off' value={searchText} onChange={handleChange} />
					{schPatients.filtered.length !== 0 && (
						<>
							<div className={schPatients.filtered ? 'resContainer' : 'hide'}>
								{schPatients.filtered.map((pt) => (
									<div className='mb-1.5 flex flex-row items-center' key={pt._id}>
										<div className='w-2/3'>
											<div
												className='w-auto text-sm font-semibold text-txtclr hover:text-txtblu cursor-pointer'
												onClick={(e) => handleSchPatient(e, pt._id)}
											>
												{pt.fname} {pt.lname}
											</div>
										</div>
										<div className='w-1/3 flex justify-end'>
											<div className='text-sm font-semibold text-txtclr'>{FormatDob(pt.dob)}</div>
										</div>
									</div>
								))}
							</div>
						</>
					)}
					{shwDataDiv && <PatientData />}
				</div>
			) : (
				<>
					<div className='flex flex-col'>
						<input className='srchBox' type='text' autoComplete='off' value={searchText} onChange={handleChange} />
						{popPatients.filtered.length !== 0 && (
							<div className={popPatients.filtered ? 'resContainer' : 'hide'}>
								{popPatients.filtered.map((pt) => (
									<div className='mb-1.5 flex flex-row items-center' key={pt._id}>
										<div className='w-2/3'>
											<div
												className='w-auto text-sm font-semibold text-txtclr hover:text-txtblu cursor-pointer'
												onClick={(e) => handlePopPatient(e, pt._id)}
											>
												{pt.fname} {pt.lname}
											</div>
										</div>
										<div className='w-1/3 flex justify-end'>
											<div className='text-sm font-semibold text-txtclr'>{FormatDob(pt.dob)}</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
