import React from 'react';
import MblSbHeader from '../mblsbheader/MblSbHeader';
import SetLocation from '../../modules/setlocation/SetLocation';
import PatientSearch from '../../modules/patientsearch/PatientSearch';
import NewPatient from '../../modules/newpatient/NewPatient';
import TodaysPatients from '../../modules/todayspatients/TodaysPatients';

export default function MblSchSidebar() {
	return (
		<div className='menu w-5/6 sm:w-2/3 lg:w-1/2 mx-auto'>
			<div className='bg-menubg mt-2 px-3 pt-3 pb-10 border-4 border-drkgry rounded-2xl flex-auto'>
				<MblSbHeader />
				<div className='mb-3'>
					<SetLocation />
				</div>
				<div className='mb-3'>
					<PatientSearch type='sidebar' />
				</div>
				<NewPatient />
				<TodaysPatients />
			</div>
		</div>
	);
}
