'use client';
import React, { useEffect, useState } from 'react';
import { IsNumeric } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';

export default function Vitals({ props }) {
	const newApptId = props._id;
	const [curApptId, setCurApptId] = useState('');
	const [id, setId] = useState('');
	const [temp, setTemp] = useState('');
	const [pulse, setPulse] = useState('');
	const [pressure, setPressure] = useState('');
	const [resp, setResp] = useState('');
	const [oxygen, setOxygen] = useState('');
	const [pasigned, setPaSigned] = useState(false);
	const [prsigned, setPrSigned] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (curApptId !== newApptId) {
			setId(props._id);
			setTemp(props.temp);
			setPulse(props.pulse);
			setPressure(props.bp);
			setResp(props.resp);
			setOxygen(props.oxy);
			setPaSigned(props.pa);
			setPrSigned(props.pr);
			setCurApptId(newApptId);
		}
	}, [props, curApptId, newApptId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Handle Quick Saves
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const submitTemp = async (e) => {
		e.preventDefault();
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

		if (data.status !== 200) {
			toast.error('Temperature did not save, please try again');
			setTemp('');
			document.getElementById('temp').focus();
			return;
		}
	};

	const submitPulse = async (e) => {
		e.preventDefault();
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

		if (data.status !== 200) {
			toast.error('Pulse did not save, please try again');
			setPulse('');
			document.getElementById('pulse').focus();
			return;
		}
	};

	const submitBp = async (e) => {
		e.preventDefault();
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

		if (data.status !== 200) {
			toast.error('Blood Pressure did not save, please try again');
			setPressure('');
			document.getElementById('pressure').focus();
			return;
		}
	};

	const submitResp = async (e) => {
		e.preventDefault();
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

		if (data.status !== 200) {
			toast.error('Respiratrion did not save, please try again');
			setResp('');
			document.getElementById('resp').focus();
			return;
		} else {
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

		if (data.status !== 200) {
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
					{(pasigned || prsigned) && <div className='ppDataText'>{temp}</div>}
					{!pasigned && !prsigned && (
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
					{(pasigned || prsigned) && <div className='ppDataText'>{pulse}</div>}
					{!pasigned && !prsigned && (
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
					{(pasigned || prsigned) && <div className='ppDataText'>{pressure}</div>}
					{!pasigned && !prsigned && (
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
					{(pasigned || prsigned) && <div className='ppDataText'>{resp}</div>}
					{!pasigned && !prsigned && (
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
					{(pasigned || prsigned) && <div className='ppDataText'>{oxygen}</div>}
					{!pasigned && !prsigned && (
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
