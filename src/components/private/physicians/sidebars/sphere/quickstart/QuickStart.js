import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';

import * as Realm from 'realm-web';
import { MenuContext } from '@/utils/context/global/MenuContext';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function QuickStart() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [hideSetup, setHideSetup] = useState(true);
	const [shwStart, setShwStart] = useState(false);
	const [qsBasic, setQsBasic] = useState(false);
	const [qsLocs, setQsLocs] = useState(false);
	const [qsUsers, setQsUsers] = useState(false);
	const [qsCols, setQsCols] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadOfficeSetup = useCallback(async () => {
		//check on quick start progress
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/setup?ofcid=${auth.user.ofcObjId}`, {
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
					setHideSetup(false);
				}
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadOfficeSetup();
	}, [loadOfficeSetup]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchOfficeSetup = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const setup = mongodb.db(dbName).collection('officesetups');

			for await (const change of setup.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadOfficeSetup();
				}
			}
		};
		wchOfficeSetup();
	}, [dbName, loadOfficeSetup]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setDiv = (type) => {
		setMenu({ type: type, func: '' });
	};

	const handleshow = () => {
		setShwStart(!shwStart);
	};

	return (
		<>
			{!hideSetup && (
				<>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-10'>
							<div className='sphSecHdng'>Quick Start</div>
						</div>
						<div className='col-2 d-flex justify-content-center'>
							{shwStart ? (
								<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => handleshow()} />
							) : (
								<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => handleshow()} />
							)}
						</div>
					</div>
					{shwStart && (
						<>
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
							<div className='row mb-5 d-flex align-items-center'>
								<div className='col-2 pe-1 d-flex justify-content-end'>
									<CheckBox check={qsCols} />
								</div>
								<div className='sphSideLink col-10' onClick={() => setDiv('phyResources')}>
									<div className='col-10 ps-1'>Calendar Columns</div>
								</div>
							</div>
						</>
					)}
				</>
			)}
		</>
	);
}
