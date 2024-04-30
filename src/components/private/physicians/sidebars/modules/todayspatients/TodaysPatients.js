import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import icoMin from '@/assets/images/icoMinimize.png';
import icoShow from '@/assets/images/icoShow.png';
import icoClose from '@/assets/images/icoClose.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function TodaysPatients() {
	const dbName = process.env.REALM_DB;
	const router = useRouter();
	const [misc] = useContext(MiscContext);
	const [schPatients, setSchPatients] = useContext(PatientSearchContext);
	const [ptsToday, setPtsToday] = useState([]);
	const [shwPatients, setShwPatients] = useState(false);
	const [close, setClose] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPtsToday = useCallback(async () => {
		//set current machine timezone offset
		const dt = new Date();
		const diffTZ = dt.getTimezoneOffset();
		const offset = diffTZ * 60;

		try {
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/get/todays?locid=${misc.defLocId}&offset=${offset}`, {
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
	const handleShow = () => {
		setShwPatients(!shwPatients);
	};

	const handleClose = () => {
		setClose(true);
	};

	const handlePatient = (e, ptId) => {
		e.preventDefault();
		setSchPatients({ patients: schPatients.patients, selected: ptId, filtered: [] });
		const lsSelPt = process.env.SELECTED_PT;
		saveInLocalStorage(lsSelPt, ptId);
		router.push('/physicians/patient');
	};

	const handleInits = (fname, lname) => {
		const str = fname + ' ' + lname;
		const matches = str.match(/\b(\w)/g);
		const ptInits = matches.join('');
		return ptInits;
	};

	return (
		<>
			{!close && (
				<>
					{!shwPatients ? (
						<div className='sbButton'>
							<div className='row d-flex align-items-center'>
								<div className='col-9 d-flex justify-content-start'>
									<div>Today&apos;s Patients</div>
								</div>
								<div className='col-3'>
									<div className='row d-flex align-items-center'>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoShow}
												width={15}
												height={15}
												title='Show'
												alt='Show'
												onClick={() => handleShow()}
											/>
										</div>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoClose}
												width={15}
												height={15}
												title='Close'
												alt='Close'
												onClick={() => handleClose()}
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className='sbButton active'>
							<div className='row d-flex align-items-center'>
								<div className='col-9 d-flex justify-content-start'>
									<div>Today&apos;s Patients</div>
								</div>
								<div className='col-3'>
									<div className='row d-flex align-items-center'>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoMin}
												width={15}
												height={5}
												title='Minimize'
												alt='Min'
												onClick={() => handleShow()}
											/>
										</div>
										<div className='col-6 d-flex justify-content-center'>
											<Image
												className='sbIcoImg'
												src={icoClose}
												width={15}
												height={15}
												title='Close'
												alt='Close'
												onClick={() => handleClose()}
											/>
										</div>
									</div>
								</div>
							</div>
							<div className='row'>
								{ptsToday.length !== 0 ? (
									<div className='col-12 d-flex justify-content-start align-items-center'>
										{ptsToday.map((pt) => (
											<Link className='sbLink' href='/physicians/patient' key={pt._id}>
												{pt.photo ? (
													<Image
														className='sbPhoto mx-2'
														src={pt.photo}
														width={40}
														height={40}
														alt='img'
														onClick={(e) => handlePatient(e, pt._id)}
													/>
												) : (
													<div className='sbInits mx-2' onClick={(e) => handlePatient(e, pt._id)}>
														{handleInits(pt.fname, pt.lname)}
													</div>
												)}
											</Link>
										))}
									</div>
								) : (
									<div className='errMsg d-flex justify-content-center'>No Patients Today</div>
								)}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}
