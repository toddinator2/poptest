'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { CalcBFat, IsNumeric } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';

export default function Bmi({ props }) {
	const newApptId = props._id;
	const [curApptId, setCurApptId] = useState('');
	const [id, setId] = useState('');
	const [weight, setWeight] = useState('');
	const [feet, setFeet] = useState('');
	const [inches, setInches] = useState('');
	const [waist, setWaist] = useState('');
	const [neck, setNeck] = useState('');
	const [bFat, setBFat] = useState('');
	const [goal, setGoal] = useState('');
	const [pasigned, setPaSigned] = useState(false);
	const [prsigned, setPrSigned] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (curApptId !== newApptId) {
			setId(props._id);
			setWeight(props.weight);
			setFeet(props.feet);
			setInches(props.inches);
			setWaist(props.waist);
			setNeck(props.neck);
			setBFat(props.bmi);
			setGoal(props.goal);
			setPaSigned(props.pa);
			setPrSigned(props.pr);
			setCurApptId(newApptId);
		}
	}, [props, curApptId, newApptId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Handle Quick Saves
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const submitWeight = async (e) => {
		e.preventDefault();
		let bfat = '';
		//make sure weight is numeric
		const wgt = IsNumeric(weight);
		setWeight(wgt);
		//calculate body fat
		if (wgt && feet && inches) {
			bfat = CalcBFat(wgt, feet, inches);
			setBFat(bfat);
		} else {
			setBFat('');
		}

		//update the weight in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/weight`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				weight: weight,
				bfat: bfat,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Weight did not save, please try again');
			setWeight('');
			document.getElementById('weight').focus();
			return;
		}
	};

	const submitFeet = async (e) => {
		e.preventDefault();
		let bfat = '';
		//make sure feet is numeric
		const ft = IsNumeric(feet);
		setFeet(ft);
		//calculate body fat
		if (weight && ft && inches) {
			bfat = CalcBFat(weight, ft, inches);
			setBFat(bfat);
		} else {
			setBFat('');
		}

		//update feet in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/feet`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				feet: feet,
				bfat: bfat,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Feet did not save, please try again');
			setFeet('');
			document.getElementById('feet').focus();
			return;
		}
	};

	const submitInches = async (e) => {
		e.preventDefault();
		let bfat = '';
		//make sure inches is numeric
		const inch = IsNumeric(inches);
		setInches(inch);
		//calculate body fat
		if (weight && feet && inch) {
			bfat = CalcBFat(weight, feet, inch);
			setBFat(bfat);
		} else {
			setBFat('');
		}

		//update inches in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/inches`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				inches: inches,
				bfat: bfat,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Inches did not save, please try again');
			setInches('');
			document.getElementById('inches').focus();
			return;
		}
	};

	const submitWaist = async (e) => {
		e.preventDefault();
		//update the waist in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/waist`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				waist: waist,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Waist did not save, please try again');
			setWaist('');
			document.getElementById('waist').focus();
			return;
		}
	};

	const submitNeck = async (e) => {
		e.preventDefault();
		//update the neck in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/neck`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				neck: neck,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Neck did not save, please try again');
			setNeck('');
			document.getElementById('neck').focus();
			return;
		}
	};

	const submitGoal = async (e) => {
		e.preventDefault();
		//update the goal in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/goal`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				goal: goal,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Goal did not save, please try again');
			setGoal('');
			document.getElementById('goal').focus();
			return;
		}
	};

	return (
		<div className='ppDivData mb-3 py-3'>
			<div className='row mb-2'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='ppCompHdng'>BMI</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>Weight:</div>
				</div>
				<div className='col-4 ps-1'>
					{(pasigned || prsigned) && <div className='ppDataText'>{weight}</div>}
					{!pasigned && !prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='weight'
							value={weight}
							onChange={(e) => setWeight(e.target.value)}
							onBlur={submitWeight}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>Height:</div>
				</div>
				{(pasigned || prsigned) && (
					<div className='col-4 ps-1'>
						<div className='ppDataText'>
							{feet}&apos; {inches}&quot;
						</div>
					</div>
				)}
				{!pasigned && !prsigned && (
					<>
						<div className='col-3 col-xl-2 px-1'>
							<input
								className='form-control inpBorder'
								type='text'
								placeholder='ft'
								id='feet'
								value={feet}
								onChange={(e) => setFeet(e.target.value)}
								onBlur={submitFeet}
								style={{ height: '30px' }}
							/>
						</div>
						<div className='col-3 col-xl-2 ps-1'>
							<input
								className='form-control inpBorder'
								type='text'
								placeholder='in'
								id='inches'
								value={inches}
								onChange={(e) => setInches(e.target.value)}
								onBlur={submitInches}
								style={{ height: '30px' }}
							/>
						</div>
					</>
				)}
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>Waist:</div>
				</div>
				<div className='col-4 ps-1'>
					{(pasigned || prsigned) && <div className='ppDataText'>{waist}</div>}
					{!pasigned && !prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='waist'
							value={waist}
							onChange={(e) => setWaist(e.target.value)}
							onBlur={submitWaist}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>Neck:</div>
				</div>
				<div className='col-4 ps-1'>
					{(pasigned || prsigned) && <div className='ppDataText'>{neck}</div>}
					{!pasigned && !prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='neck'
							value={neck}
							onChange={(e) => setNeck(e.target.value)}
							onBlur={submitNeck}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-6 pe-1 d-flex justify-content-end'>
					<div className='frmLabel'>BMI:</div>
				</div>
				<div className='col-4 ps-1'>
					{(pasigned || prsigned) && <div className='ppDataText'>{bFat}</div>}
					{!pasigned && !prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							readOnly
							value={bFat}
							onChange={(e) => setBFat(e.target.value)}
							style={{ height: '30px' }}
						/>
					)}
				</div>
			</div>
			<div className='row'>
				<div className='col-10 mb-1 offset-1'>
					<div className='frmLabel'>Goal:</div>
				</div>
				<div className='col-10 offset-1'>
					{(pasigned || prsigned) && <textarea className='form-control inpBorder' rows={2} readOnly defaultValue={goal} />}
					{!pasigned && !prsigned && (
						<textarea
							className='form-control inpBorder'
							id='goal'
							rows={2}
							value={goal}
							onChange={(e) => setGoal(e.target.value)}
							onBlur={submitGoal}
						/>
					)}
				</div>
			</div>
		</div>
	);
}
