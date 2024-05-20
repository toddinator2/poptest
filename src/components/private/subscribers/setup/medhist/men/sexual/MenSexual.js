import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function MenSexual({ userId }) {
	const [keep, setKeep] = useState('');
	const [hard, setHard] = useState('');
	const [after, setAfter] = useState('');
	const [comp, setComp] = useState('');
	const [satfy, setSatfy] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/men/sexual`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					keep,
					hard,
					after,
					comp,
					satfy,
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
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>How do you rate your confidence that you could get and keep an erection?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={keep} onChange={(e) => setKeep(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='vl'>Very Low</option>
						<option value='lw'>Low</option>
						<option value='mo'>Moderate</option>
						<option value='hi'>High</option>
						<option value='vh'>Very High</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>When you had erections with sexual stimulation, how often were your erections hard enough for penetration?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={hard} onChange={(e) => setHard(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>Almost never or never</option>
						<option value='l'>Less than half of the time</option>
						<option value='h'>About half of the time</option>
						<option value='m'>Most times</option>
						<option value='a'>Almost always or always</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>
						During sexual intercourse, how often were you able to maintain your erection after you had penetrated your partner?
					</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={after} onChange={(e) => setAfter(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>Almost never or never</option>
						<option value='l'>Less than half of the time</option>
						<option value='h'>About half of the time</option>
						<option value='m'>Most times</option>
						<option value='a'>Almost always or always</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>During sexual intercourse, how difficult was it to maintain your erection to completion of intercourse?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={comp} onChange={(e) => setComp(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='e'>Extremely Difficult</option>
						<option value='v'>Very Difficult</option>
						<option value='d'>Difficult</option>
						<option value='s'>Slightly Difficult</option>
						<option value='n'>Not Difficult</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>When you attempted sexual intercourse, how often was it satisfactory for you?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={satfy} onChange={(e) => setSatfy(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>Almost never or never</option>
						<option value='l'>Less than half of the time</option>
						<option value='h'>About half of the time</option>
						<option value='m'>Most times</option>
						<option value='a'>Almost always or always</option>
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
