import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function WmnSexual({ userId }) {
	const [desire, setDesire] = useState('');
	const [lubrication, setLubrication] = useState('');
	const [overall, setOverall] = useState('');
	const [discomfort, setDiscomfort] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/women/sexual`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					desire,
					lubrication,
					overall,
					discomfort,
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
			<label className='frmLabel'>Are you satisfied with your level of sexual desire or interest</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={desire} onChange={(e) => setDesire(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='a'>Always</option>
					<option value='m'>Most Times</option>
					<option value='s'>Sometimes</option>
					<option value='n'>Never</option>
				</select>
			</div>
			<label className='frmLabel'>Are you satisfied with your level of lubrication during sexual activity or intercourse</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={lubrication} onChange={(e) => setLubrication(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='a'>Always</option>
					<option value='m'>Most Times</option>
					<option value='s'>Sometimes</option>
					<option value='n'>Never</option>
				</select>
			</div>
			<label className='frmLabel'>Are you satisfied with your overall sexual life</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={overall} onChange={(e) => setOverall(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='s'>Satisfied</option>
					<option value='n'>Neutral</option>
					<option value='d'>Dissatisfied</option>
				</select>
			</div>
			<label className='frmLabel'>Do you experience discomfort or pain during sexual activity or intercourse</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={discomfort} onChange={(e) => setDiscomfort(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
