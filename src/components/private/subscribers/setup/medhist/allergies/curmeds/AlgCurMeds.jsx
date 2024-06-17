import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function AlgCurMeds({ userId }) {
	const [any, setAny] = useState('');
	const [ant, setAnt] = useState('');
	const [ast, setAst] = useState('');
	const [eye, setEye] = useState('');
	const [nas, setNas] = useState('');
	const [orl, setOrl] = useState('');
	const [learnmore, setLearnMore] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/allergies/curmeds`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					any,
					ant,
					ast,
					eye,
					nas,
					orl,
					learnmore,
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleAny = (e) => {
		const value = e.target.value;
		setAny(value);
		if (value === 'n') {
			setAnt('');
			setAst('');
			setEye('');
			setNas('');
			setOrl('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className='frmLabel'>Are you currently taking any Allergy Medications</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={any} onChange={(e) => handleAny(e)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			{any === 'y' && (
				<>
					<div className='flex flex-col'>
						<label className='frmLabel'>
							<span className='text-lgtred'>Please fill out the form</span>
						</label>
					</div>
					<label className='frmLabel'>Antihistamines</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={ant} onChange={(e) => setAnt(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='n'>Never</option>
							<option value='o'>Occasionally (several times a month or less)</option>
							<option value='f'>Frequently (several times a week)</option>
							<option value='d'>Daily</option>
						</select>
					</div>
					<label className='frmLabel'>Asthma Inhalar (Advair, Singular, Ventolin)</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={ast} onChange={(e) => setAst(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='n'>Never</option>
							<option value='o'>Occasionally (several times a month or less)</option>
							<option value='f'>Frequently (several times a week)</option>
							<option value='d'>Daily</option>
						</select>
					</div>
					<label className='frmLabel'>Eye Drops</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={eye} onChange={(e) => setEye(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='n'>Never</option>
							<option value='o'>Occasionally (several times a month or less)</option>
							<option value='f'>Frequently (several times a week)</option>
							<option value='d'>Daily</option>
						</select>
					</div>
					<label className='frmLabel'>Nasal Steroids</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={nas} onChange={(e) => setNas(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='n'>Never</option>
							<option value='o'>Occasionally (several times a month or less)</option>
							<option value='f'>Frequently (several times a week)</option>
							<option value='d'>Daily</option>
						</select>
					</div>
					<label className='frmLabel'>Oral Steroids (Prednisone)</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={orl} onChange={(e) => setOrl(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='n'>Never</option>
							<option value='o'>Occasionally (several times a month or less)</option>
							<option value='f'>Frequently (several times a week)</option>
							<option value='d'>Daily</option>
						</select>
					</div>
				</>
			)}
			<div className='mt-2'>
				<label className='frmLabel'>
					Are you interested in learning more about the Testing and Treatment of Allergy and Immunological Conditions during your next visit? Their
					cost and how treatment can reduce sensitivity, get allergies under control, reduce the need for medications, and regain freedom from
					triggers while making sufferers feel better and improving quality of life with a 90% success rate.
				</label>
				<div className='ps-2'>
					<select className='inpBorder form-control' value={learnmore} onChange={(e) => setLearnMore(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='y'>Yes</option>
						<option value='n'>No</option>
					</select>
				</div>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
