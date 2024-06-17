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
					subObjId: userId,
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
			<div className='mb-3 text-sm'>On a scale of 1-10 tell us what&apos;s important to you</div>
			<div className='mb-1 text-sm'>1 &ndash; Not Important</div>
			<div className='mb-3 text-sm'>10 &ndash; Very Important</div>
			<label className='frmLabel'>Time with your doctor to discuss all your healthcare needs</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>Out of pocket costs</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>Exploring health improvement options</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>A provider who is on time for your appointments</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>Timely communications with assistance from technology</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>Care options and medical services not covered by insurance</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>Quality supplements and foods</label>
			<div className='mb-2 ps-2'>
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
			<label className='frmLabel'>Exercise &amp; Fitness programs</label>
			<div className='mb-2 ps-2'>
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
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
