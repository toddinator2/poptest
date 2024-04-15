'use client';
import React, { useContext, useState } from 'react';
import './PatientSearch.css';
import { useRouter } from 'next/navigation';
import { saveInLocalStorage } from '@/utils/helpers/auth';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { PtPopContext } from '@/utils/context/physicians/PtsPopContext';
import { FilterPtSearch, FormatDob } from '@/components/global/functions/PageFunctions';

export default function PatientSearch({ type }) {
	const router = useRouter();
	const [schPatients, setSchPatients] = useContext(PatientContext);
	const [popPatients, setPopPatients] = useContext(PtPopContext);
	const [searchText, setSearchText] = useState('');

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
								placeholder='Patient Search'
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
