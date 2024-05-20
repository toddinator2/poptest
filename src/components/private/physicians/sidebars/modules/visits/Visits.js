import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { FixVisitDate } from '@/components/global/functions/Functions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import icoMin from '@/assets/images/icoMinimize.png';
import icoShow from '@/assets/images/icoShow.png';
import icoClose from '@/assets/images/icoClose.png';

export default function Visits() {
	const router = useRouter();
	const [misc, setMisc] = useContext(MiscContext);
	const [schPatients] = useContext(PatientSearchContext);
	const [newPtId, setNewPtId] = useState('');
	const [curPtId, setCurPtId] = useState('');
	const [appts, setAppts] = useState([]);
	const [noAppts, setNoAppts] = useState(false);
	const [shwVisits, setShwVisits] = useState(false);
	const [close, setClose] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadAppts = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/get/forlist?locid=${misc.defLocId}&ptid=${newPtId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 400) {
				setAppts([]);
				setNoAppts(true);
			}

			if (data.status === 200) {
				setAppts(data.appts);
				setNoAppts(false);
			}
			setCurPtId(newPtId);
		} catch (err) {
			toast.error(err);
		}
	}, [misc, newPtId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (schPatients.selected) {
			if (schPatients.selected !== newPtId) {
				setNewPtId(schPatients.selected);
			}
		}
	}, [schPatients, newPtId]);

	useEffect(() => {
		if (curPtId !== newPtId) {
			loadAppts();
		}
	}, [curPtId, newPtId, loadAppts]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleShow = () => {
		setShwVisits(!shwVisits);
	};

	const handleClose = () => {
		setClose(true);
	};

	const chgAppt = (apptId) => {
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: apptId });
		router.push('/physicians/patient');
	};

	return (
		<>
			{!close && (
				<>
					{!shwVisits ? (
						<div className='sbButton'>
							<div className='row d-flex align-items-center'>
								<div className='col-9 d-flex justify-content-start'>
									<div>Nova Visits</div>
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
									<div>Nova Visits</div>
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
							{appts.length !== 0 && (
								<>
									{appts.map((appt) => (
										<div className='row mb-1' key={appt._id}>
											<div className='col-11 col-xl-4 offset-1'>
												<div className='sphSideLink' onClick={(e) => chgAppt(appt._id)}>
													{FixVisitDate(appt.date)}
												</div>
											</div>
											<div className='col-11 col-xl-7 offset-1 offset-xl-0'>
												<div className='sphSideText'>{appt.description}</div>
											</div>
										</div>
									))}
								</>
							)}
							{noAppts && <div className='errMsg ps-5'>No Visits Found</div>}
						</div>
					)}
				</>
			)}
		</>
	);
}
