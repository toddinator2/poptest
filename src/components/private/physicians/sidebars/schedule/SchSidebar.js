import React from 'react';
import '../Sidebars.css';
import SbHeader from '../modules/header/SbHeader';
import PatientSearch from '../modules/patientsearch/PatientSearch';
import NewPatient from '../modules/newpatient/NewPatient';
import TodaysPatients from '../modules/todayspatients/TodaysPatients';
import MessageBoard from '../modules/messageboard/MessageBoard';
import ReminderBoard from '../modules/reminderboard/ReminderBoard';
import Faxes from '../modules/faxes/Faxes';
import Sign from '../modules/sign/Sign';
import Operations from '../modules/operations/Operations';

export default function SchSidebar({ page }) {
	const pg = page;

	return (
		<div className='phySideContainer'>
			<SbHeader page={pg} />
			<PatientSearch type='schSidebar' />
			<NewPatient />
			<TodaysPatients />
			<MessageBoard />
			<ReminderBoard />
			<Faxes />
			<Sign />
			<Operations />
		</div>
	);
}
