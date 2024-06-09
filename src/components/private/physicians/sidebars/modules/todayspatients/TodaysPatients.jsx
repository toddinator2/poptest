import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { saveInLocalStorage } from '@/utils/helpers/lsSecure';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

export default function TodaysPatients() {
	const dbName = process.env.REALM_DB;
	const router = useRouter();
	const [misc] = useContext(MiscContext);
	const [schPatients, setSchPatients] = useContext(PatientSearchContext);
	const [ptsToday, setPtsToday] = useState([]);
	const [shwPts, setShwPts] = useState(false);

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
			{!shwPts ? (
				<div className='sbButton mb-3' onClick={() => setShwPts(!shwPts)}>
					TODAYS PATIENTS
				</div>
			) : (
				<>
					<div className='sbButton active mb-1' onClick={() => setShwPts(!shwPts)}>
						TODAYS PATIENTS
					</div>
					<div className='mb-7 p-3 mx-auto border-4 border-drkbrd bg-black rounded-xl'>
						{ptsToday.length !== 0 ? (
							<div className='flex flex-row justify-center items-center'>
								<div className='w-full flex gap-3'>
									{ptsToday.map((pt) => (
										<Link href='/physicians/patient' key={pt._id}>
											{pt.photo ? (
												<div className='w-auto'>
													<Image
														src={pt.photo}
														width={40}
														height={40}
														alt='Patient Photo'
														onClick={(e) => handlePatient(e, pt._id)}
													/>
												</div>
											) : (
												<div
													className='w-auto text-3xl font-bold text-drkred hover:text-lgtred cursor-pointer'
													onClick={(e) => handlePatient(e, pt._id)}
												>
													{handleInits(pt.fname, pt.lname)}
												</div>
											)}
										</Link>
									))}
								</div>
							</div>
						) : (
							<div className='text-base text-center font-semibold text-drkred'>No Patients Today</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
