'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { IsNumeric } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';

export default function Vitals(apptId) {
	const id = apptId.apptId;
	const [appts, setAppts] = useContext(ApptContext);
	const [appt, setAppt] = useState({});
	const [stop, setStop] = useState(false);
	const [temp, setTemp] = useState('');
	const [pulse, setPulse] = useState('');
	const [pressure, setPressure] = useState('');
	const [resp, setResp] = useState('');
	const [oxygen, setOxygen] = useState('');

	useEffect(() => {
		//get initial appointment data
		if (Object.keys(appt).length === 0 && id !== '') {
			const getAppt = async () => {
				try {
					const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byid?id=${id}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						setAppt(data.appt);
					}
				} catch (error) {
					toast.error(data.msg);
					return;
				}
			};
			getAppt();
		}
	}, [appt, id, setAppt]);

	useEffect(() => {
		//get appointment data if another appointment is clicked on
		if (Object.keys(appt).length !== 0 && id !== appt._id) {
			const getAppt = async () => {
				try {
					const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byid?id=${id}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						setAppt(data.appt);
						setStop(false);
					}
				} catch (error) {
					toast.error(data.msg);
					return;
				}
			};
			getAppt();
		}
	}, [appt, id, setAppt]);

	useEffect(() => {
		if (Object.keys(appt).length !== 0 && !stop && id === appt._id) {
			if (appt.temperature !== null && appt.temperature !== undefined) {
				setTemp(appt.temperature);
			} else {
				setTemp('');
			}
			if (appt.pulse !== null && appt.pulse !== undefined) {
				setPulse(appt.pulse);
			} else {
				setPulse('');
			}
			if (appt.bloodpressure !== null && appt.bloodpressure !== undefined) {
				setPressure(appt.bloodpressure);
			} else {
				setPressure('');
			}
			if (appt.respiration !== null && appt.respiration !== undefined) {
				setResp(appt.respiration);
			} else {
				setResp('');
			}
			if (appt.oxygen !== null && appt.oxygen !== undefined) {
				setOxygen(appt.oxygen);
			} else {
				setOxygen('');
			}
			setStop(true);
		}
	}, [appt, id, stop]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Handle Quick Saves
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const submitTemp = async (e) => {
		e.preventDefault();
		//update the database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/temperature`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				temperature: temp,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.temperature = temp;
			}
			if (idxApptTdy) {
				apptTdy.temperature = temp;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Temperature did not save, please try again');
			setTemp('');
			document.getElementById('temp').focus();
			return;
		}
	};

	const submitPulse = async (e) => {
		e.preventDefault();
		//update the database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/pulse`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				pulse: pulse,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.pulse = pulse;
			}
			if (idxApptTdy) {
				apptTdy.pulse = pulse;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Pulse did not save, please try again');
			setPulse('');
			document.getElementById('pulse').focus();
			return;
		}
	};

	const submitBp = async (e) => {
		e.preventDefault();
		//update the database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/bloodpressure`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				bloodpressure: pressure,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.bloodpressure = pressure;
			}
			if (idxApptTdy) {
				apptTdy.bloodpressure = pressure;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Blood Pressure did not save, please try again');
			setPressure('');
			document.getElementById('pressure').focus();
			return;
		}
	};

	const submitResp = async (e) => {
		e.preventDefault();
		//update the database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/respiration`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				respiration: resp,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.respiration = resp;
			}
			if (idxApptTdy) {
				apptTdy.respiration = resp;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Respiratrion did not save, please try again');
			setResp('');
			document.getElementById('resp').focus();
			return;
		}
	};
	const submitOxygen = async (e) => {
		e.preventDefault();
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/oxygen`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				oxygen: oxygen,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.oxygen = oxygen;
			}
			if (idxApptTdy) {
				apptTdy.oxygen = oxygen;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Oxygen did not save, please try again');
			setOxygen('');
			document.getElementById('oxygen').focus();
			return;
		}
	};

	return (
		<div className='ppDivData mb-3 py-3'>
			<div className='row mb-2'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='ppCompHdng'>VITALS</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>Temperature:</div>
				</div>
				<div className='col-4 ps-1'>
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.temperature}</div>}
					{!appt.pasigned && !appt.prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='temp'
							value={temp}
							onChange={(e) => setTemp(e.target.value)}
							onBlur={submitTemp}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>Pulse:</div>
				</div>
				<div className='col-4 ps-1'>
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.pulse}</div>}
					{!appt.pasigned && !appt.prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='pulse'
							value={pulse}
							onChange={(e) => setPulse(IsNumeric(e.target.value))}
							onBlur={submitPulse}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<label className='frmLabel'>Blood Pressure:</label>
				</div>
				<div className='col-4 ps-1'>
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.bloodpressure}</div>}
					{!appt.pasigned && !appt.prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='pressure'
							value={pressure}
							onChange={(e) => setPressure(e.target.value)}
							onBlur={submitBp}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 d-flex justify-content-end'>
					<label className='frmLabel'>Respiration:</label>
				</div>
				<div className='col-4 ps-1'>
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.respiration}</div>}
					{!appt.pasigned && !appt.prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='resp'
							value={resp}
							onChange={(e) => setResp(IsNumeric(e.target.value))}
							onBlur={submitResp}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row d-flex align-items-center'>
				<div className='col-6 d-flex justify-content-end'>
					<label className='frmLabel'>Oxygen:</label>
				</div>
				<div className='col-4 ps-1'>
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.oxygen}</div>}
					{!appt.pasigned && !appt.prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='oxygen'
							value={oxygen}
							onChange={(e) => setOxygen(IsNumeric(e.target.value))}
							onBlur={submitOxygen}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
