import React, { useContext } from 'react';
import '../../Sidebars.css';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import SchDatadiv from '../datadiv/SchDatadiv';
import SetLocation from '../../shared/setlocation/SetLocation';
import PatientSearch from '../../shared/patientsearch/PatientSearch';
import PatientsToday from '../../shared/patientstoday/PatientsToday';
import patient from '@/assets/images/icoNewPatient.png';
import messages from '@/assets/images/icoMessages.png';
import chat from '@/assets/images/icoChat.png';

export default function SchSidebar() {
	const [menu, setMenu] = useContext(MenuContext);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setDiv = (type) => {
		setMenu({ type: type, func: '' });
	};

	return (
		<>
			<SetLocation />
			<div className='row mb-3'>
				<div className='col-12 d-flex justify-content-center'>
					<PatientSearch type='sidebar' />
				</div>
			</div>
			<PatientsToday />
			<div className='row my-2 d-flex align-items-center justify-content-center'>
				<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('newpatient')}>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='sphSideLinkIcon' src={patient} title='New Patient' alt='New Patient' />
						</div>
						<div className='col-12 d-none d-md-flex justify-content-center'>New Patient</div>
					</div>
				</div>
				<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('messages')}>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='sphSideLinkIcon' src={messages} title='Messages' alt='Messages' />
						</div>
						<div className='col-12 d-none d-md-flex justify-content-center'>Messages</div>
					</div>
				</div>
				<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('chat')}>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<Image className='sphSideLinkIcon' src={chat} title='Chat' alt='Chat' />
						</div>
						<div className='col-12 d-none d-md-flex justify-content-center'>Chat</div>
					</div>
				</div>
			</div>
			<div className='sidebarBorder' />
			<div className='row'>
				<div className='col-12'>
					<SchDatadiv dataType={menu.type} />
				</div>
			</div>
		</>
	);
}
