'use client';
import React, { useContext, useEffect, useState } from 'react';
import './PatientProfile.css';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { getFromLocalStorage } from '@/utils/helpers/auth';
import { FixVisitDate } from '@/components/global/functions/PageFunctions';
import Vitals from './vitals/Vitals';
import Bmi from './bmi/Bmi';
import Bodycomp from './bodycomp/Bodycomp';
import Sign from './sign/Sign';
import Subjective from './soap/Subjective';
import Objective from './soap/Objective';
import Assessment from './soap/Assessment';
import Plan from './soap/Plan';
import Rx from './rx/Rx';
import Addendum from './addendum/Addendum';
import Diary from './diary/Diary';
import Procenter from './procenter/Procenter';

export default function PatientProfile() {
	const lsSelPt = process.env.SELECTED_PT;
	const [schPatients, _setSchPatients] = useContext(PatientContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [auth, _setAuth] = useContext(AuthContext);
	const [appts, setAppts] = useContext(ApptContext);
	const [curPtId, setCurPtId] = useState('');
	const [newPtId, setNewPtId] = useState('');
	const [mainAppt, setMainAppt] = useState({});
	const [mainApptId, setMainApptId] = useState('');
	const [noAppts, setNoAppts] = useState(false);

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
		if (curPtId !== newPtId && !appts.selected) {
			//set main appointment and id
			let curUnixStart = 0;
			let tmpArr = [];
			const locId = office.defLoc;
			const ofcId = auth.user.ofcObjId;
			const today = new Date().toLocaleDateString();
			let tomorrow = new Date(today);
			tomorrow.setDate(tomorrow.getDate() + 1);
			const unixTomorrow = parseInt((new Date(tomorrow).getTime() / 1000).toFixed(0));

			for (let i = 0; i < appts.all.length; i++) {
				const appt = appts.all[i];
				if (appt.patientObjId === newPtId && appt.locationObjId === locId && appt.officeObjId === ofcId) {
					tmpArr.push(appt._id);
					if (appt.unixstart <= unixTomorrow && appt.unixstart > curUnixStart) {
						curUnixStart = appt.unixstart;
						setMainApptId(appt._id);
						setMainAppt(appt);
					}
				}
			}

			if (tmpArr.length === 0) {
				setNoAppts(true);
			}
			setCurPtId(newPtId);
		} else if (appts.selected) {
			let tmpArr = [];
			for (let i = 0; i < appts.all.length; i++) {
				const appt = appts.all[i];
				if (appt._id === appts.selected) {
					tmpArr.push(appt._id);
					setMainApptId(appt._id);
					setMainAppt(appt);
				}
			}

			if (tmpArr.length === 0) {
				setNoAppts(true);
			}

			setAppts({ all: appts.all, todays: appts.todays, prev: [], selected: '' });
		}
	}, [curPtId, newPtId, appts, auth, office, setAppts]);

	return (
		<>
			{Object.keys(mainAppt).length !== 0 && (
				<>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='ppCompHdng mb-2'>
								Appointment For <span className='ppVstDate'>{FixVisitDate(mainAppt.date)}</span>
							</div>
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col-12 col-xl-4 px-4 py-2'>
							<div className='ppColData p-3'>
								<Vitals apptId={mainApptId} />
								<Bmi apptId={mainApptId} />
								<Bodycomp />
								{(auth.user.perm === 'provider' || auth.user.perm === 'pa') && <Sign apptId={mainApptId} />}
							</div>
						</div>
						<div className='col-12 col-xl-4 px-4 py-2'>
							<div className='ppColData p-3'>
								<Subjective apptId={mainApptId} />
								<Objective apptId={mainApptId} />
								<Assessment apptId={mainApptId} />
								<Plan apptId={mainApptId} />
							</div>
						</div>
						<div className='col-12 col-xl-4 px-4 py-2'>
							<div className='ppColData p-3'>
								<Rx />
								<Addendum apptId={mainApptId} />
								{(auth.user.perm === 'provider' || auth.user.perm === 'pa') && <Diary patientId={newPtId} />}
								<Procenter />
							</div>
						</div>
					</div>
				</>
			)}
			{Object.keys(mainAppt).length === 0 && noAppts && (
				<div className='row mt-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No Appointments Found For This Patient</div>
					</div>
				</div>
			)}
			{Object.keys(mainAppt).length === 0 && !noAppts && (
				<div className='row mt-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>Only Future Appointments Found For This Patient</div>
					</div>
				</div>
			)}
		</>
	);
}
