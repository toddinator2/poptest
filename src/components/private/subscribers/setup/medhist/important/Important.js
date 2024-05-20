import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Important({ userId }) {
	const [time, setTime] = useState('');
	const [cost, setCost] = useState('');
	const [opts, setOpts] = useState('');
	const [appt, setAppt] = useState('');
	const [tech, setTech] = useState('');
	const [services, setServices] = useState('');
	const [foods, setFoods] = useState('');
	const [exercise, setExercise] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/important`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					time,
					cost,
					opts,
					appt,
					tech,
					services,
					foods,
					exercise,
					patientObjId: userId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='suText mb-2'>On a scale of 1-10 tell us what&apos;s important to you</div>
			<div className='row mb-3'>
				<div className='col-6 d-flex justify-content-center'>
					<div className='suText'>1 &ndash; Not Important</div>
				</div>
				<div className='col-6 d-flex justify-content-center'>
					<div className='suText'>10 &ndash; Very Important</div>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Time with your doctor to discuss all your healthcare needs.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={time} onChange={(e) => setTime(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Out of pocket costs.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={cost} onChange={(e) => setCost(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Exploring health improvement options.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={opts} onChange={(e) => setOpts(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>A provider who is on time for your appointments.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={appt} onChange={(e) => setAppt(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Timely communications with assistance from technology.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={tech} onChange={(e) => setTech(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Care options and medical services not covered by insurance.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={services} onChange={(e) => setServices(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Quality supplements and foods.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={foods} onChange={(e) => setFoods(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Exercise &amp; Fitness programs.</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={exercise} onChange={(e) => setExercise(e.target.value)}>
						<option value=''>Select One...</option>
						{[...Array(10)]
							.map((_, i) => i + 1)
							.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
					</select>
				</div>
			</div>
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
