import React from 'react';
import SbHeader from '../modules/sbheader/SbHeader';
import PatientSearch from '../modules/patientsearch/PatientSearch';
import NewPatient from '../modules/newpatient/NewPatient';
import TodaysPatients from '../modules/todayspatients/TodaysPatients';

export default function SchSidebar() {
	return (
		<div className='p-3'>
			<SbHeader page='schedule' />
			<div className='mb-3'>
				<PatientSearch type='sidebar' />
			</div>
			<NewPatient />
			<TodaysPatients />
		</div>
	);
}
