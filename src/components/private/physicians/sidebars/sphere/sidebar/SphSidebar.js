'use client';
import React, { useContext, useState } from 'react';
import '../../Sidebars.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import SetLocation from '../../shared/setlocation/SetLocation';
import QuickStart from '../quickstart/QuickStart';
import PatientSearch from '../../shared/patientsearch/PatientSearch';
import PatientsToday from '../../shared/patientstoday/PatientsToday';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';
import users from '@/assets/images/icoUsers.png';
import locations from '@/assets/images/icoLocations.png';
import basic from '@/assets/images/icoBasic.png';
import calcols from '@/assets/images/icoCalCols.png';
import categories from '@/assets/images/icoCategories.png';
import services from '@/assets/images/icoServices.png';
import template from '@/assets/images/icoTemplate.png';

export default function SphSidebar() {
	const [_menu, setMenu] = useContext(MenuContext);
	const [sideMenuSettings, setSideMenuSettings] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setDiv = (type) => {
		setMenu({ type: type, func: '' });
	};

	const openSideMenu = (openMenu) => {
		if (openMenu === 'settings') {
			setSideMenuSettings('settings');
			document.getElementById('divSettings').style.display = 'block';
			document.getElementById('divEcomm').style.display = 'none';
			document.getElementById('divCustom').style.display = 'none';
		}
		if (openMenu === 'ecomm') {
			setSideMenuSettings('ecomm');
			document.getElementById('divSettings').style.display = 'none';
			document.getElementById('divEcomm').style.display = 'block';
			document.getElementById('divCustom').style.display = 'none';
		}
		if (openMenu === 'custom') {
			setSideMenuSettings('custom');
			document.getElementById('divSettings').style.display = 'none';
			document.getElementById('divEcomm').style.display = 'none';
			document.getElementById('divCustom').style.display = 'block';
		}
	};

	const closeSideMenu = (closeMenu) => {
		setSideMenuSettings('');
		setDiv('');
		document.getElementById('divSettings').style.display = 'none';
		document.getElementById('divEcomm').style.display = 'none';
		document.getElementById('divCustom').style.display = 'none';
	};

	return (
		<>
			<SetLocation />
			<QuickStart />
			<div className='row mb-3 mt-1'>
				<div className='col-12 d-flex justify-content-center'>
					<PatientSearch type='sidebar' />
				</div>
			</div>
			<PatientsToday />
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
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyBasic')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={basic} title='Basic Settings' alt='Basic' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Office</div>
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
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyUsers')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={users} title='Manage Users' alt='Users' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Users</div>
						</div>
					</div>
				</div>
				<div className='row mb-5 d-flex align-items-center'>
					<div className='sphSideLink col-4 d-flex justify-content-center' onClick={() => setDiv('phyResources')}>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Image className='sphSideLinkIcon' src={calcols} title='Manage Calendar Columns' alt='Calendar' />
							</div>
							<div className='col-12 d-none d-md-flex justify-content-center'>Calendar</div>
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
