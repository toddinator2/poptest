'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PatientSearch.css';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { PatientPopupContext } from '@/utils/context/physicians/PatientPopupContext';
import { saveInLocalStorage } from '@/utils/helpers/auth';
import { FilterPtSearch, FormatDob } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function PatientSearch({ type }) {
	const dbName = process.env.REALM_DB;
	const router = useRouter();
	const [auth] = useContext(AuthContext);
	const [schPatients, setSchPatients] = useContext(PatientSearchContext);
	const [popPatients, setPopPatients] = useContext(PatientPopupContext);
	const [searchText, setSearchText] = useState('');
	const [placeholder, setPlaceholder] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPatients = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/patients/get/forsearch?ofcid=${auth.user.ofcObjId}`, {
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
			toast.error(data.msg);
		}
	}, [auth]);

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
		const lsSelPt = process.env.SELECTED_PT;
		saveInLocalStorage(lsSelPt, ptId);
		router.push('/physicians/patientprofile');
	};

	const handlePopPatient = (e, ptId) => {
		e.preventDefault();
		setSearchText('');
		setPopPatients({ patients: popPatients.patients, selected: ptId, filtered: [] });
	};

	return (
		<>
			<div className='row'>
				{type === 'sidebar' ? (
					<>
						<div className='col-12 mb-1 d-flex justify-content-center'>
							<input
								className='srchBox ps-2'
								type='text'
								placeholder={placeholder}
								autoComplete='off'
								value={searchText}
								onChange={handleChange}
							/>
						</div>
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
					</>
				) : (
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
			</div>
		</>
	);
}
