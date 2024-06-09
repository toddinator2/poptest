import React from 'react';
import SetLocation from '../../modules/setlocation/SetLocation';
import PatientSearch from '../../modules/patientsearch/PatientSearch';
import MblSbHeader from '../mblsbheader/MblSbHeader';

export default function MblSphSidebar() {
	return (
		<div className='menu w-5/6 sm:w-2/3 lg:w-1/2 mx-auto mb-3'>
			<div className='bg-menubg mt-2 px-3 pt-3 pb-10 border-4 border-drkgry rounded-2xl flex-auto'>
				<MblSbHeader />
				<SetLocation />
				<PatientSearch type='sidebar' />
			</div>
		</div>
	);
}
