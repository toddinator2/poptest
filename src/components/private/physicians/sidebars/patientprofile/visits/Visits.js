import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { FixVisitDate } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';

export default function Visits({ patient }) {
	let newPtId = '';
	if (patient !== undefined) {
		if (Object.keys(patient).length !== 0) {
			newPtId = patient._id;
		}
	}
	const router = useRouter();
	const [misc, setMisc] = useContext(MiscContext);
	const [curPtId, setCurPtId] = useState('');
	const [appts, setAppts] = useState([]);
	const [noAppts, setNoAppts] = useState(false);
	const [shwVisits, setShwVisits] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadAppts = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/forlist?locid=${misc.defLocId}&ptid=${newPtId}`, {
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
		if (curPtId !== newPtId) {
			loadAppts();
		}
	}, [curPtId, newPtId, loadAppts]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleVisits = () => {
		setShwVisits(!shwVisits);
	};

	const chgAppt = (apptId) => {
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: apptId });
		router.push('/physicians/patientprofile');
	};

	return (
		<>
			<div className='row mb-1 mt-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='sphSecHdng'>Patient Visits</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{shwVisits ? (
						<Image className='sphSideMenuIcon' src={sidemenuclose} title='Close Visits' alt='Close' onClick={() => handleVisits()} />
					) : (
						<Image className='sphSideMenuIcon' src={sidemenuopen} title='Open Visits' alt='Open' onClick={() => handleVisits()} />
					)}
				</div>
			</div>
			{shwVisits && (
				<>
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
				</>
			)}
		</>
	);
}
