import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../../Sidebars.css';
import { useRouter } from 'next/navigation';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import Image from 'next/image';
import PtPrfDatadiv from '../datadiv/PtPrfDatadiv';
import SetLocation from '../../shared/setlocation/SetLocation';
import PatientSearch from '../../shared/patientsearch/PatientSearch';
import PatientsToday from '../../shared/patientstoday/PatientsToday';
import icoPt from '@/assets/images/icoNewPatient.png';
import messages from '@/assets/images/icoMessages.png';
import chat from '@/assets/images/icoChat.png';

export default function PtPrfSidebar() {
	const router = useRouter();
	const [menu, setMenu] = useContext(MenuContext);
	const [schPatients] = useContext(PatientSearchContext);
	const [curPtId, setCurPtId] = useState('');
	const [newPtId, setNewPtId] = useState('');
	const [patient, setPatient] = useState({});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPatient = useCallback(async () => {
		if (newPtId) {
			try {
				const response = await fetch(`${process.env.API_URL}/private/physicians/patients/get/byid?id=${newPtId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (!response.ok) {
					toast.error(data.msg);
					router('/schedule');
				} else {
					setPatient(data.user);
					setCurPtId(newPtId);
				}
			} catch (err) {
				toast.error(err);
			}
		}
	}, [newPtId, router]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (schPatients.selected !== '') {
			setNewPtId(schPatients.selected);
		}
	}, [schPatients]);

	useEffect(() => {
		if (curPtId !== newPtId) {
			loadPatient();
		}
	}, [curPtId, newPtId, loadPatient]);

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
							<Image className='sphSideLinkIcon' src={icoPt} title='New Patient' alt='New Patient' />
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
			<div className='row my-3'>
				<div className='col-12'>{Object.keys(patient).length !== 0 && <PtPrfDatadiv patient={patient} />}</div>
			</div>
		</>
	);
}
