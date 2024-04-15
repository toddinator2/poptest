'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { CalcBFat, IsNumeric } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';

export default function Bmi(apptId) {
	const id = apptId.apptId;
	const [appts, setAppts] = useContext(ApptContext);
	const [appt, setAppt] = useState({});
	const [stop, setStop] = useState(false);
	const [weight, setWeight] = useState('');
	const [feet, setFeet] = useState('');
	const [inches, setInches] = useState('');
	const [waist, setWaist] = useState('');
	const [neck, setNeck] = useState('');
	const [bFat, setBFat] = useState('');
	const [goal, setGoal] = useState('');

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
			if (appt.weight !== null && appt.weight !== undefined) {
				setWeight(appt.weight);
			} else {
				setWeight('');
			}
			if (appt.feet !== null && appt.feet !== undefined) {
				setFeet(appt.feet);
			} else {
				setFeet('');
			}
			if (appt.inches !== null && appt.inches !== undefined) {
				setInches(appt.inches);
			} else {
				setInches('');
			}
			if (appt.neck !== null && appt.neck !== undefined) {
				setNeck(appt.neck);
			} else {
				setNeck('');
			}
			if (appt.waist !== null && appt.waist !== undefined) {
				setWaist(appt.waist);
			} else {
				setWaist('');
			}
			if (appt.bfat !== null && appt.bfat !== undefined) {
				setBFat(appt.bfat);
			} else {
				setBFat('');
			}
			if (appt.goal !== null && appt.goal !== undefined) {
				setGoal(appt.goal);
			} else {
				setGoal('');
			}
			setStop(true);
		}
	}, [appt, id, stop]);

	const handleWeight = (e) => {
		const value = e.target.value;
		setWeight(IsNumeric(value));
		if (feet && inches && value) {
			setBFat(CalcBFat(value, feet, inches));
		} else {
			setBFat('');
		}
	};
	const handleFeet = (e) => {
		const value = e.target.value;
		setFeet(IsNumeric(value));
		if (weight && inches && value) {
			setBFat(CalcBFat(weight, value, inches));
		} else {
			setBFat('');
		}
	};
	const handleInches = (e) => {
		const value = e.target.value;
		setInches(IsNumeric(value));
		if (weight && feet && value) {
			setBFat(CalcBFat(weight, feet, value));
		} else {
			setBFat('');
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// Handle Quick Saves
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const submitWeight = async (e) => {
		e.preventDefault();
		//update the weight in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/weight`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				weight: weight,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			if (bFat) {
				//update the body fat in database
				await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/bfat`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						_id: id,
						bfat: bFat,
					}),
				});
			}

			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.weight = weight;
				apptAll.bfat = bFat;
			}
			if (idxApptTdy) {
				apptTdy.weight = weight;
				apptTdy.bfat = bFat;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Weight did not save, please try again');
			setWeight('');
			document.getElementById('weight').focus();
			return;
		}
	};

	const submitHeight = async (e) => {
		e.preventDefault();
		//update the height in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/height`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				feet: feet,
				inches: inches,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			if (bFat) {
				//update the body fat in database
				await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/bfat`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						_id: id,
						bfat: bFat,
					}),
				});
			}

			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.feet = feet;
				apptAll.inches = inches;
				apptAll.bfat = bFat;
			}
			if (idxApptTdy) {
				apptTdy.feet = feet;
				apptTdy.inches = inches;
				apptTdy.bfat = bFat;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Height did not save, please try again');
			setFeet('');
			setInches('');
			document.getElementById('feet').focus();
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

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.waist = waist;
			}
			if (idxApptTdy) {
				apptTdy.waist = waist;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
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

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.neck = neck;
			}
			if (idxApptTdy) {
				apptTdy.neck = neck;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
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

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.goal = goal;
			}
			if (idxApptTdy) {
				apptTdy.goal = goal;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
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
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.weight}</div>}
					{!appt.pasigned && !appt.prsigned && (
						<input
							className='form-control inpBorder'
							type='text'
							id='weight'
							value={weight}
							onChange={(e) => handleWeight(e)}
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
				{(appt.pasigned || appt.prsigned) && (
					<div className='col-4 ps-1'>
						<div className='ppDataText'>
							{appt.feet}&apos; {appt.inches}&quot;
						</div>
					</div>
				)}
				{!appt.pasigned && !appt.prsigned && (
					<>
						<div className='col-3 col-xl-2 px-1'>
							<input
								className='form-control inpBorder'
								type='text'
								placeholder='ft'
								id='feet'
								value={feet}
								onChange={(e) => handleFeet(e)}
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
								onChange={(e) => handleInches(e)}
								onBlur={submitHeight}
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
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.waist}</div>}
					{!appt.pasigned && !appt.prsigned && (
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
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.neck}</div>}
					{!appt.pasigned && !appt.prsigned && (
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
					{(appt.pasigned || appt.prsigned) && <div className='ppDataText'>{appt.bfat}</div>}
					{!appt.pasigned && !appt.prsigned && (
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
					{(appt.pasigned || appt.prsigned) && <textarea className='form-control inpBorder' rows={2} readOnly defaultValue={appt.goal} />}
					{!appt.pasigned && !appt.prsigned && (
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
