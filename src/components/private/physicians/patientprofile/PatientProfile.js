'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PatientProfile.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { getFromLocalStorage } from '@/utils/helpers/auth';
import { FixVisitDate } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
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
import Spinner from '@/components/global/spinner/Spinner';

export default function PatientProfile() {
	const lsSelPt = process.env.SELECTED_PT;
	const [auth] = useContext(AuthContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [schPatients, _setSchPatients] = useContext(PatientSearchContext);
	const [curPtId, setCurPtId] = useState('');
	const [newPtId, setNewPtId] = useState('');
	const [appt, setAppt] = useState({});
	const [curApptId, setCurApptId] = useState('');
	const [newApptId, setNewApptId] = useState('');
	const [noAppts, setNoAppts] = useState(false);
	const [loading, setLoading] = useState(false);
	//common
	const [id, setId] = useState('');
	const [pa, setPa] = useState('');
	const [pr, setPr] = useState('');
	//vitals
	const [temp, setTemp] = useState('');
	const [pulse, setPulse] = useState('');
	const [bp, setBp] = useState('');
	const [resp, setResp] = useState('');
	const [oxy, setOxy] = useState('');
	//BMI
	const [weight, setWeight] = useState('');
	const [feet, setFeet] = useState('');
	const [inches, setInches] = useState('');
	const [waist, setWaist] = useState('');
	const [neck, setNeck] = useState('');
	const [bmi, setBmi] = useState('');
	const [goal, setGoal] = useState('');
	//Sign
	const [paSignReqId, setPaSignRegId] = useState('');
	const [paSignReqName, setPaSignRegName] = useState('');
	const [paSignDate, setPaSignDate] = useState('');
	const [paSignBy, setPaSignBy] = useState('');
	const [prSignReqId, setPrSignRegId] = useState('');
	const [prSignReqName, setPrSignRegName] = useState('');
	const [prSignDate, setPrSignDate] = useState('');
	const [prSignBy, setPrSignBy] = useState('');
	//SOAP
	const [subj, setSubj] = useState('');
	const [obj, setObj] = useState('');
	const [ass, setAss] = useState('');
	const [plan, setPlan] = useState('');
	//Addendum
	const [add, setAdd] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLatestAppt = useCallback(async () => {
		setLoading(true);
		//set current machine timezone offset
		const dt = new Date();
		const diffTZ = dt.getTimezoneOffset();
		const offset = diffTZ * 60;

		try {
			const response = await fetch(
				`${process.env.API_URL}/private/physicians/appointments/get/latest?locid=${misc.defLocId}&offset=${offset}&ptid=${newPtId}`,
				{
					method: 'GET',
				}
			);
			const data = await response.json();

			if (data.status === 400) {
				setNewApptId('');
				setAppt({});
				setNoAppts(true);
			}

			if (data.status === 200) {
				setNewApptId(data.appt._id);
				setAppt(data.appt);
				setNoAppts(false);
			}
			setCurPtId(newPtId);
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [misc, newPtId]);

	const loadSelectAppt = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byid?id=${misc.editId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setNewApptId(data.appt._id);
				setAppt(data.appt);
				setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '' });
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		if (curPtId !== newPtId) {
			loadLatestAppt();
		}
	}, [curPtId, newPtId, loadLatestAppt]);

	useEffect(() => {
		if (misc.editId) {
			loadSelectAppt();
		}
	}, [misc, loadSelectAppt]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VARIABLES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (curApptId !== newApptId) {
			//Common
			setId(appt._id);
			setPa(appt.pasigned);
			setPr(appt.prsigned);
			//Vitals
			if (appt.temperature !== '' && appt.temperature !== undefined) {
				setTemp(appt.temperature);
			} else {
				setTemp('');
			}
			if (appt.pulse !== '' && appt.pulse !== undefined) {
				setPulse(appt.pulse);
			} else {
				setPulse('');
			}
			if (appt.bloodpressure !== '' && appt.bloodpressure !== undefined) {
				setBp(appt.bloodpressure);
			} else {
				setBp('');
			}
			if (appt.respiration !== '' && appt.respiration !== undefined) {
				setResp(appt.respiration);
			} else {
				setResp('');
			}
			if (appt.oxygen !== '' && appt.oxygen !== undefined) {
				setOxy(appt.oxygen);
			} else {
				setOxy('');
			}
			//BMI
			if (appt.weight !== '' && appt.weight !== undefined) {
				setWeight(appt.weight);
			} else {
				setWeight('');
			}
			if (appt.feet !== '' && appt.feet !== undefined) {
				setFeet(appt.feet);
			} else {
				setFeet('');
			}
			if (appt.inches !== '' && appt.inches !== undefined) {
				setInches(appt.inches);
			} else {
				setInches('');
			}
			if (appt.waist !== '' && appt.waist !== undefined) {
				setWaist(appt.waist);
			} else {
				setWaist('');
			}
			if (appt.neck !== '' && appt.neck !== undefined) {
				setNeck(appt.neck);
			} else {
				setNeck('');
			}
			if (appt.bfat !== '' && appt.bfat !== undefined) {
				setBmi(appt.bfat);
			} else {
				setBmi('');
			}
			if (appt.goal !== '' && appt.goal !== undefined) {
				setGoal(appt.goal);
			} else {
				setGoal('');
			}
			//Sign
			if (appt.pasignreqId !== '' && appt.pasignreqId !== undefined) {
				setPaSignRegId(appt.pasignreqId);
			} else {
				setPaSignRegId(null);
			}
			if (appt.pasignreqname !== '' && appt.pasignreqname !== undefined) {
				setPaSignRegName(appt.pasignreqname);
			} else {
				setPaSignRegName('');
			}
			if (appt.pasigneddate !== '' && appt.pasigneddate !== undefined) {
				setPaSignDate(appt.pasigneddate);
			} else {
				setPaSignDate('');
			}
			if (appt.pasignedby !== '' && appt.pasignedby !== undefined) {
				setPaSignBy(appt.pasignedby);
			} else {
				setPaSignDate('');
			}
			if (appt.prsignreqId !== '' && appt.prsignreqId !== undefined) {
				setPrSignRegId(appt.prsignreqId);
			} else {
				setPrSignRegId(null);
			}
			if (appt.prsignreqname !== '' && appt.prsignreqname !== undefined) {
				setPrSignRegName(appt.prsignreqname);
			} else {
				setPrSignRegName('');
			}
			if (appt.prsigneddate !== '' && appt.prsigneddate !== undefined) {
				setPrSignDate(appt.prsigneddate);
			} else {
				setPrSignDate('');
			}
			if (appt.prsignedby !== '' && appt.prsignedby !== undefined) {
				setPrSignBy(appt.prsignedby);
			} else {
				setPrSignDate('');
			}
			//SOAP
			if (appt.subjective !== '' && appt.subjective !== undefined) {
				setSubj(appt.subjective);
			} else {
				setSubj('');
			}
			if (appt.objective !== '' && appt.objective !== undefined) {
				setObj(appt.objective);
			} else {
				setObj('');
			}
			if (appt.assessment !== '' && appt.assessment !== undefined) {
				setAss(appt.assessment);
			} else {
				setAss('');
			}
			if (appt.plan !== '' && appt.plan !== undefined) {
				setPlan(appt.plan);
			} else {
				setPlan('');
			}
			//Addendum
			if (appt.addendum !== '' && appt.addendum !== undefined) {
				setAdd(appt.addendum);
			} else {
				setAdd('');
			}

			setCurApptId(newApptId);
		}
	}, [curApptId, newApptId, appt]);

	return (
		<>
			{Object.keys(appt).length !== 0 && (
				<>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='ppCompHdng mb-2'>
								Appointment For <span className='ppVstDate'>{FixVisitDate(appt.date)}</span>
							</div>
						</div>
					</div>
					<div className='row d-flex justify-content-center'>
						<div className='col-12 col-xl-4 px-4 py-2'>
							<div className='ppColData p-3'>
								<Vitals
									props={{
										_id: id,
										temp: temp,
										pulse: pulse,
										bp: bp,
										resp: resp,
										oxy: oxy,
										pa: pa,
										pr: pr,
									}}
								/>
								<Bmi
									props={{
										_id: id,
										weight: weight,
										feet: feet,
										inches: inches,
										waist: waist,
										neck: neck,
										bmi: bmi,
										goal: goal,
										pa: pa,
										pr: pr,
									}}
								/>
								<Bodycomp />
								{(auth.user.perm === 'provider' || auth.user.perm === 'pa') && (
									<Sign
										props={{
											_id: id,
											pa: pa,
											pr: pr,
											paSignReqId: paSignReqId,
											paSignReqName: paSignReqName,
											paSignBy: paSignBy,
											paSignDate: paSignDate,
											prSignReqId: prSignReqId,
											prSignReqName: prSignReqName,
											prSignDate: prSignDate,
											prSignBy: prSignBy,
										}}
									/>
								)}
							</div>
						</div>
						<div className='col-12 col-xl-4 px-4 py-2'>
							<div className='ppColData p-3'>
								<Subjective props={{ _id: id, subj: subj, pa: pa, pr: pr }} />
								<Objective props={{ _id: id, obj: obj, pa: pa, pr: pr }} />
								<Assessment props={{ _id: id, ass: ass, pa: pa, pr: pr }} />
								<Plan props={{ _id: id, plan: plan, pa: pa, pr: pr }} />
							</div>
						</div>
						<div className='col-12 col-xl-4 px-4 py-2'>
							<div className='ppColData p-3'>
								<Rx />
								<Addendum props={{ _id: id, add: add, pa: pa, pr: pr }} />
								{(auth.user.perm === 'provider' || auth.user.perm === 'pa') && <Diary patientId={newPtId} />}
								<Procenter />
							</div>
						</div>
					</div>
				</>
			)}
			{Object.keys(appt).length === 0 && noAppts && !loading && (
				<div className='row mt-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No Appointments Found For This Patient</div>
					</div>
				</div>
			)}
			{Object.keys(appt).length === 0 && !noAppts && !loading && (
				<div className='row mt-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>Only Future Appointments Found For This Patient</div>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</>
	);
}
