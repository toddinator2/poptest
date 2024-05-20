import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Behavioral({ userId }) {
	const [not, setNot] = useState(false);
	const [nvr, setNvr] = useState(false);
	const [iwc, setIwc] = useState(false);
	const [may, setMay] = useState(false);
	const [ned, setNed] = useState(false);
	const [cur, setCur] = useState(false);
	const [learnmore, setLearnMore] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/behavioral`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					not,
					nvr,
					iwc,
					may,
					ned,
					cur,
					learnmore,
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
			<div className='suText mb-2'>
				Behavioral Therapy is based on the simple idea that all behaviors are learned and can be changed. It is a universal term for types of Therapy
				that treat a wide range of mental health disorders. Therapy tries to identify and help change potentially unfavorable behaviors. The focus of
				treatment is often on current problems and how to change them, including anxiety, depression, anger, and eating disorders.
			</div>
			<div className='suText mb-3'>
				IMPORTANT! Providing complete and accurate Behavioral Care information can positively impact your care and safety. Please check any that apply.
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={not} onChange={(e) => setNot(e.target.checked)} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Not interested in treatment</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={nvr} onChange={(e) => setNvr(e.target.checked)} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>I&apos;ve never received treatment</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={iwc} onChange={(e) => setIwc(e.target.checked)} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>I would consider treatment</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={may} onChange={(e) => setMay(e.target.checked)} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>I may need treatment</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={ned} onChange={(e) => setNed(e.target.checked)} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>I need treatment</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cur} onChange={(e) => setCur(e.target.checked)} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>I&apos;m currently in treatment</div>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>
						Are you interested in learning more about Behavioral Therapy during your visit? It&apos;s cost and how it helps kids and adults manage
						symptoms like stress, anxiety disorders, alcohol, and drug abuse problems, marital problems, eating disorders, and potential severe
						mental illness while providing support for self-esteem, positive thoughts, anger management, and improving communication skills.
					</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={learnmore} onChange={(e) => setLearnMore(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='y'>Yes</option>
						<option value='n'>No</option>
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
