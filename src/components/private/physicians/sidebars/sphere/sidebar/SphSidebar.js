'use client';
import React, { useContext, useEffect, useState } from 'react';
import '../../Sidebars.css';
import { useRouter } from 'next/navigation';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import SetLocation from '../../shared/setlocation/SetLocation';
import PatientSearch from '../../shared/patientsearch/PatientSearch';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';
import users from '@/assets/images/icoUsers.png';
import locations from '@/assets/images/icoLocations.png';
import chgloc from '@/assets/images/icoChgLoc.png';
import basic from '@/assets/images/icoBasic.png';
import calcols from '@/assets/images/icoCalCols.png';
import categories from '@/assets/images/icoCategories.png';
import services from '@/assets/images/icoServices.png';
import template from '@/assets/images/icoTemplate.png';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';

export default function SphSidebar() {
	let chkRefresh = getFromLocalStorage('qsRefresh');
	const router = useRouter();
	const [office, _setOffice] = useContext(OfficeContext);
	const [appts, _setAppts] = useContext(ApptContext);
	const [auth, _setAuth] = useContext(AuthContext);
	const [_menu, setMenu] = useContext(MenuContext);
	const [schPatients, setSchPatients] = useContext(PatientContext);
	const [hideLoc, setHideLoc] = useState(true);
	const [hideSetup, setHideSetup] = useState(false);
	const [sideMenuSettings, setSideMenuSettings] = useState('');
	const [ptsToday, setPtsToday] = useState([]);
	const [chkdToday, setChkdToday] = useState(false);
	const [qsBasic, setQsBasic] = useState(false);
	const [qsLocs, setQsLocs] = useState(false);
	const [qsUsers, setQsUsers] = useState(false);
	const [qsCols, setQsCols] = useState(false);
	const [qsComp, setQsComp] = useState(false);
	const [chkdSetup, setChkdSetup] = useState(false);
	const [qsRefresh, setQsRefresh] = useState(false);

	useEffect(() => {
		if (chkRefresh === null) {
			setQsRefresh(false);
		} else {
			setQsRefresh(chkRefresh);
		}
	}, [chkRefresh]);

	useEffect(() => {
		//see if initial office setup is complete
		if ((!qsComp && !chkdSetup) || qsRefresh) {
			const chkSetup = async () => {
				const response = await fetch(`${process.env.API_URL}/private/physicians/office/setup/get?ofcid=${auth.user.ofcObjId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					if (data.setup.complete) {
						setHideSetup(true);
					} else {
						setQsBasic(data.setup.basic);
						setQsLocs(data.setup.locations);
						setQsUsers(data.setup.users);
						setQsCols(data.setup.calcols);
						setQsComp(data.setup.complete);
					}
				}

				setQsRefresh(false);
				removeFromLocalStorage('qsRefresh');
				setChkdSetup(true);
			};
			chkSetup();
		}
	}, [qsComp, chkdSetup, qsRefresh, auth]);

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

	const openSideMenu = (openMenu) => {
		if (openMenu === 'setup') {
			setSideMenuSettings('setup');
			document.getElementById('divSetup').style.display = 'block';
			document.getElementById('divPatients').style.display = 'none';
			document.getElementById('divSettings').style.display = 'none';
			document.getElementById('divEcomm').style.display = 'none';
			document.getElementById('divCustom').style.display = 'none';
		}
		if (openMenu === 'patients') {
			setSideMenuSettings('patients');
			document.getElementById('divSetup').style.display = 'none';
			document.getElementById('divPatients').style.display = 'block';
			document.getElementById('divSettings').style.display = 'none';
			document.getElementById('divEcomm').style.display = 'none';
			document.getElementById('divCustom').style.display = 'none';
		}
		if (openMenu === 'settings') {
			setSideMenuSettings('settings');
			document.getElementById('divSetup').style.display = 'none';
			document.getElementById('divPatients').style.display = 'none';
			document.getElementById('divSettings').style.display = 'block';
			document.getElementById('divEcomm').style.display = 'none';
			document.getElementById('divCustom').style.display = 'none';
		}
		if (openMenu === 'ecomm') {
			setSideMenuSettings('ecomm');
			document.getElementById('divSetup').style.display = 'none';
			document.getElementById('divPatients').style.display = 'none';
			document.getElementById('divSettings').style.display = 'none';
			document.getElementById('divEcomm').style.display = 'block';
			document.getElementById('divCustom').style.display = 'none';
		}
		if (openMenu === 'custom') {
			setSideMenuSettings('custom');
			document.getElementById('divSetup').style.display = 'none';
			document.getElementById('divPatients').style.display = 'none';
			document.getElementById('divSettings').style.display = 'none';
			document.getElementById('divEcomm').style.display = 'none';
			document.getElementById('divCustom').style.display = 'block';
		}
	};

	const closeSideMenu = (closeMenu) => {
		setSideMenuSettings('');
		setDiv('');
		if (closeMenu === 'setup') {
			document.getElementById('divSetup').style.display = 'none';
		}
		if (closeMenu === 'patients') {
			document.getElementById('divPatients').style.display = 'none';
		}
		if (closeMenu === 'settings') {
			document.getElementById('divSettings').style.display = 'none';
		}
		if (closeMenu === 'ecomm') {
			document.getElementById('divEcomm').style.display = 'none';
		}
		if (closeMenu === 'custom') {
			document.getElementById('divCustom').style.display = 'none';
		}
	};

	const handlePatient = (e, ptId) => {
		e.preventDefault();
		setSchPatients({ patients: schPatients.patients, selected: ptId, filtered: [] });
		const lsSelPt = process.env.SELECTED_PT;
		saveInLocalStorage(lsSelPt, ptId);
		router.push('/physicians/patientprofile');
	};

	const handleHideLoc = (value) => {
		setHideLoc(value);
	};

	return (
		<>
			{!hideSetup && (
				<>
					<div className='row mb-3 d-flex align-items-center'>
						<div className='col-10'>
							<div className='sphSecHdng'>Quick Start</div>
						</div>
						<div className='col-2 d-flex justify-content-center'>
							{sideMenuSettings === 'setup' ? (
								<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => closeSideMenu('setup')} />
							) : (
								<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => openSideMenu('setup')} />
							)}
						</div>
					</div>
					<div id='divSetup' style={{ display: 'none' }}>
						<div className='row mb-2 d-flex align-items-center'>
							<div className='col-2 pe-1 d-flex justify-content-end'>
								<CheckBox check={qsBasic} />
							</div>
							<div className='sphSideLink col-10' onClick={() => setDiv('phyBasic')}>
								<div className='col-10 ps-1'>Basic Settings</div>
							</div>
						</div>
						<div className='row mb-2 d-flex align-items-center'>
							<div className='col-2 pe-1 d-flex justify-content-end'>
								<CheckBox check={qsLocs} />
							</div>
							<div className='sphSideLink col-10' onClick={() => setDiv('phyLocations')}>
								<div className='col-10 ps-1'>Locations</div>
							</div>
						</div>
						<div className='row mb-2 d-flex align-items-center'>
							<div className='col-2 pe-1 d-flex justify-content-end'>
								<CheckBox check={qsUsers} />
							</div>
							<div className='sphSideLink col-10' onClick={() => setDiv('phyUsers')}>
								<div className='col-10 ps-1'>Users</div>
							</div>
						</div>
						<div className='row mb-2 d-flex align-items-center'>
							<div className='col-2 pe-1 d-flex justify-content-end'>
								<CheckBox check={qsCols} />
							</div>
							<div className='sphSideLink col-10' onClick={() => setDiv('phyResources')}>
								<div className='col-10 ps-1'>Calendar Columns</div>
							</div>
						</div>
					</div>
				</>
			)}
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
			<div className='row mb-3 mt-1'>
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
											<Image className='sphPtImg mx-2' src={pt.photo} alt='img' onClick={(e) => handlePatient(e, pt.id)} />
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
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='sphSecHdng'>Office Settings</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{sideMenuSettings === 'settings' ? (
						<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => closeSideMenu('settings')} />
					) : (
						<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => openSideMenu('settings')} />
					)}
				</div>
			</div>
			<div id='divSettings' style={{ display: 'none' }}>
				<div className='row mb-3 d-flex align-items-center justify-content-center'>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyUsers')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={users} title='Manage Users' alt='Users' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Users</div>
						</div>
					</div>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyResources')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={calcols} title='Manage Calendar Columns' alt='Calendar' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Calendar</div>
						</div>
					</div>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyLocations')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={locations} title='Manage Locataions' alt='Locations' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Locations</div>
						</div>
					</div>
				</div>
				<div className='row mb-5 d-flex align-items-center'>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyBasic')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={basic} title='Basic Settings' alt='Basic' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Office</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='sphSecHdng'>Ecommerce</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{sideMenuSettings === 'ecomm' ? (
						<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => closeSideMenu('ecomm')} />
					) : (
						<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => openSideMenu('ecomm')} />
					)}
				</div>
			</div>
			<div id='divEcomm' style={{ display: 'none' }}>
				<div className='row mb-5 d-flex align-items-center'>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyCategories')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={categories} title='Manage Categories' alt='Categories' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Categories</div>
						</div>
					</div>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyServices')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={services} title='Manage Items' alt='Services' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Services</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='sphSecHdng'>Custom Settings</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{sideMenuSettings === 'custom' ? (
						<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => closeSideMenu('custom')} />
					) : (
						<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => openSideMenu('custom')} />
					)}
				</div>
			</div>
			<div id='divCustom' style={{ display: 'none' }}>
				<div className='row mb-5 d-flex align-items-center'>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyTemplates')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={template} title='Manage Templates' alt='Templates' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Templates</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
