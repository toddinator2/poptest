import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../../Sidebars.css';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { getFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import PtPrfDatadiv from '../datadiv/PtPrfDatadiv';
import SetLocation from '../../shared/setlocation/SetLocation';
import PatientSearch from '../../shared/patientsearch/PatientSearch';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';
import chgloc from '@/assets/images/icoChgLoc.png';
import icoPt from '@/assets/images/icoNewPatient.png';
import messages from '@/assets/images/icoMessages.png';
import chat from '@/assets/images/icoChat.png';

export default function PtPrfSidebar() {
	const lsSelPt = process.env.SELECTED_PT;
	const router = useRouter();
	const [office, _setOffice] = useContext(OfficeContext);
	const [appts, _setAppts] = useContext(ApptContext);
	const [auth, _setAuth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [schPatients, setSchPatients] = useContext(PatientContext);
	const [curPtId, setCurPtId] = useState('');
	const [newPtId, setNewPtId] = useState('');
	const [patient, setPatient] = useState({});
	const [hideLoc, setHideLoc] = useState(true);
	const [sideMenuSettings, setSideMenuSettings] = useState('');
	const [ptsToday, setPtsToday] = useState([]);
	const [chkdToday, setChkdToday] = useState(false);

	//load patient data
	const loadPatient = useCallback(async () => {
		if (newPtId) {
			try {
				const response = await fetch(`${process.env.API_URL}/private/physicians/patients/get/byid?id=${newPtId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (!response.ok) {
					toast.error(data?.msg);
					router('/schedule');
				} else {
					setPatient(data?.user);
					setCurPtId(newPtId);
				}
			} catch (err) {
				toast.error('Network Error: Please try again');
			}
		}
	}, [newPtId, router]);

	useEffect(() => {
		let getPtId = '';
		if (schPatients.selected === '') {
			getPtId = getFromLocalStorage(lsSelPt);
		} else {
			getPtId = schPatients.selected;
		}
		setNewPtId(getPtId);
	}, [schPatients, lsSelPt]);

	useEffect(() => {
		if (curPtId !== newPtId) {
			loadPatient();
		}
	}, [curPtId, newPtId, loadPatient]);

	useEffect(() => {
		//set todays patients
		if ((appts.todays.length !== 0 && ptsToday.length === 0 && !chkdToday) || ptsToday.length !== appts.todays.length) {
			let tmpArr = [];
			const defLoc = office.defLoc;
			for (let i = 0; i < appts.todays.length; i++) {
				const appt = appts.todays[i];
				if (appt.locationObjId === defLoc) {
					const pt = schPatients.patients.find((item) => item._id === appt.patientObjId);
					const name = pt.fname + ' ' + pt.lname;
					const matches = name.match(/\b(\w)/g);
					const ptInits = matches.join('');

					const ptObj = {
						id: pt._id,
						photo: pt.photo,
						inits: ptInits,
					};
					tmpArr.push(ptObj);
				}
			}
			setPtsToday(tmpArr);
			setChkdToday(true);
		}
	}, [appts, ptsToday, chkdToday, office, schPatients]);

	const setDiv = (type) => {
		setMenu({ type: type, func: '' });
	};

	const handleHideLoc = (value) => {
		setHideLoc(value);
	};

	const openSideMenu = (openMenu) => {
		if (openMenu === 'patients') {
			setSideMenuSettings('patients');
			document.getElementById('divPatients').style.display = 'block';
		}
	};

	const closeSideMenu = (closeMenu) => {
		setSideMenuSettings('');
		setDiv('');
		document.getElementById('divPatients').style.display = 'none';
	};

	const handlePatient = (e, ptId) => {
		e.preventDefault();
		setSchPatients({ patients: schPatients.patients, selected: ptId, filtered: [] });
		const lsSelPt = process.env.SELECTED_PT;
		saveInLocalStorage(lsSelPt, ptId);
		router.push('/physicians/patientprofile');
	};

	return (
		<>
			{auth.user.locObjId?.length >= 2 && (
				<div className='row mb-2'>
					{!hideLoc ? (
						<div className='col-12 d-flex justify-content-center'>
							<SetLocation funcCall={handleHideLoc} />
						</div>
					) : (
						<div className='col-12 d-flex justify-content-end'>
							<Image className='icoChgLoc' src={chgloc} alt='change location' onClick={() => handleHideLoc(false)} />
						</div>
					)}
				</div>
			)}
			<div className='row mb-3'>
				<div className='col-12 d-flex justify-content-center'>
					<PatientSearch type='sidebar' />
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='sphSecHdng'>Patients Today</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{sideMenuSettings === 'patients' ? (
						<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => closeSideMenu('patients')} />
					) : (
						<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => openSideMenu('patients')} />
					)}
				</div>
			</div>
			<div id='divPatients' style={{ display: 'none' }}>
				<div className='row mb-5 d-flex align-items-center justify-content-center'>
					<div className='col-12 d-flex justify-content-start align-items-center'>
						{ptsToday.length !== 0 ? (
							<>
								{ptsToday.map((pt) => (
									<div key={pt.id}>
										{pt.photo ? (
											<img className='sphPtImg mx-2' src={pt.photo} alt='img' onClick={(e) => handlePatient(e, pt.id)} />
										) : (
											<div className='sphPtInits mx-2' onClick={(e) => handlePatient(e, pt.id)}>
												{pt.inits}
											</div>
										)}
									</div>
								))}
							</>
						) : (
							<div className='errMsg ps-5'>No Patients Today</div>
						)}
					</div>
				</div>
			</div>
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
				<div className='col-12'>{Object.keys(patient).length !== 0 && <PtPrfDatadiv dataType={menu.type} patient={patient} />}</div>
			</div>
		</>
	);
}
