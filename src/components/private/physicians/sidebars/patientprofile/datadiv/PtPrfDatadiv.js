import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import PatientData from '../patientdata/PatientData';
import NewPatient from '../../shared/newpatient/NewPatient';
import Visits from '../visits/Visits';

export default function PtPrfDatadiv(patient) {
	const pt = patient.patient;
	const [menu, setMenu] = useContext(MenuContext);
	const [shwData, setShwData] = useState('');

	useEffect(() => {
		if (menu.type && !shwData) {
			setShwData(menu.type);
		}
	}, [menu, shwData]);

	const closeDivs = () => {
		setShwData('');
		setMenu({ type: '', func: '' });
	};

	return (
		<>
			<div className='row'>
				<div className='col-12 d-flex justify-content-center'>{shwData === 'newpatient' && <NewPatient funcClose={closeDivs} />}</div>
			</div>
			<PatientData
				props={{
					fname: pt.fname,
					lname: pt.lname,
					dob: pt.dob,
					sex: pt.sex,
					phone: pt.mphone,
					photo: pt.photo,
					email: pt.email,
					emgName: pt.emergencycontact,
					emgPhone: pt.emergencyphone,
					emgRelation: pt.emergencyrelation,
				}}
			/>
			<Visits patient={pt} />
		</>
	);
}
