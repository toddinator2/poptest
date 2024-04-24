import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { saveInLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function PatientsToday() {
	const dbName = process.env.REALM_DB;
	const router = useRouter();
	const [misc] = useContext(MiscContext);
	const [schPatients, setSchPatients] = useContext(PatientSearchContext);
	const [ptsToday, setPtsToday] = useState([]);
	const [shwPatients, setShwPatients] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPtsToday = useCallback(async () => {
		//set current machine timezone offset
		const dt = new Date();
		const diffTZ = dt.getTimezoneOffset();
		const offset = diffTZ * 60;

		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/todays?locid=${misc.defLocId}&offset=${offset}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setPtsToday(data.todays);
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadPtsToday();
	}, [loadPtsToday]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchAppointments = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const appts = mongodb.db(dbName).collection('appointments');

			for await (const change of appts.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadPtsToday();
				}
			}
		};
		wchAppointments();
	}, [dbName, loadPtsToday]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleshow = () => {
		setShwPatients(!shwPatients);
	};

	const handlePatient = (e, ptId) => {
		e.preventDefault();
		setSchPatients({ patients: schPatients.patients, selected: ptId, filtered: [] });
		const lsSelPt = process.env.SELECTED_PT;
		saveInLocalStorage(lsSelPt, ptId);
		router.push('/physicians/patientprofile');
	};

	const handleInits = (fname, lname) => {
		const str = fname + ' ' + lname;
		const matches = str.match(/\b(\w)/g);
		const ptInits = matches.join('');
		return ptInits;
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='sphSecHdng'>Patients Today</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{shwPatients ? (
						<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => handleshow()} />
					) : (
						<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => handleshow()} />
					)}
				</div>
			</div>
			{shwPatients && (
				<div className='row mb-5 d-flex align-items-center justify-content-center'>
					<div className='col-12 d-flex justify-content-start align-items-center'>
						{ptsToday.length !== 0 ? (
							<>
								{ptsToday.map((pt) => (
									<div key={pt._id}>
										{pt.photo ? (
											<Image className='sphPtImg mx-2' src={pt.photo} alt='img' onClick={(e) => handlePatient(e, pt._id)} />
										) : (
											<div className='sphPtInits mx-2' onClick={(e) => handlePatient(e, pt._id)}>
												{handleInits(pt.fname, pt.lname)}
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
			)}
		</>
	);
}
