import React from 'react';
import '../Sidebars.css';
import SbHeader from '../modules/header/SbHeader';
import PatientSearch from '../modules/patientsearch/PatientSearch';
import NewPatient from '../modules/newpatient/NewPatient';
import TodaysPatients from '../modules/todayspatients/TodaysPatients';
import Visits from '../modules/visits/Visits';

export default function PtSidebar({ page }) {
	const pg = page;

	return (
		<div className='phySideContainer'>
			<SbHeader page={pg} />
			<PatientSearch type='ptSidebar' />
			<NewPatient />
			<TodaysPatients />
			<Visits />
		</div>
	);
}
