import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
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
	const [appts, setAppts] = useContext(ApptContext);
	const [auth, _setAuth] = useContext(AuthContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [curPtId, setCurPtId] = useState('');
	const [ptAppts, setPtAppts] = useState([]);
	const [shwVisits, setShwVisits] = useState(false);

	useEffect(() => {
		if (newPtId !== curPtId) {
			//get all patient appointments from database
			const getAppts = async () => {
				try {
					const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byptid?ptid=${newPtId}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						let tmpArr = [];
						for (let i = 0; i < data.appts.length; i++) {
							const appt = data.appts[i];
							if (appt.locationObjId === office.defLoc && appt.officeObjId === auth.user.ofcObjId) {
								tmpArr.push({ _id: appt._id, date: appt.date, reason: appt.reason });
							}
						}
						setPtAppts(tmpArr);
						setCurPtId(newPtId);
					} else {
						toast.error(data.msg);
						return;
					}
				} catch (error) {
					toast.error(data.msg);
					return;
				}
			};
			getAppts();
		}
	}, [newPtId, curPtId, office, auth]);

	const handleVisits = () => {
		setShwVisits(!shwVisits);
	};

	const chgAppt = (apptId) => {
		setAppts({ all: appts.all, todays: appts.todays, prev: [], selected: apptId });
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
					{ptAppts.length !== 0 ? (
						<>
							{ptAppts.map((appt) => (
								<div className='row mb-1' key={appt._id}>
									<div className='col-11 col-xl-4 offset-1'>
										<div className='sphSideLink' onClick={(e) => chgAppt(appt._id)}>
											{FixVisitDate(appt.date)}
										</div>
									</div>
									<div className='col-11 col-xl-7 offset-1 offset-xl-0'>
										<div className='sphSideText'>{appt.reason}</div>
									</div>
								</div>
							))}
						</>
					) : (
						<div className='errMsg ps-5'>No Visits Found</div>
					)}
				</>
			)}
		</>
	);
}
