import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Obgyn({ userId }) {
	const [preg, setPreg] = useState('');
	const [test, setTest] = useState('');
	const [aps, setAps] = useState('');
	const [ape, setApe] = useState('');
	const [afp, setAfp] = useState('');
	const [alp, setAlp] = useState('');
	const [alm, setAlm] = useState('');
	const [periods, setPeriods] = useState('');
	const [numPregs, setNumPregs] = useState('');
	const [numKids, setNumkids] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/women/obgyn`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					pregnant: preg,
					pregtest: test,
					ageperstart: aps,
					ageperend: ape,
					agefirstpreg: afp,
					agelastpreg: alp,
					agelastmenses: alm,
					periods,
					numpregs: numPregs,
					numkids: numKids,
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
			<label className='frmLabel'>Are you currently pregnant</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={preg} onChange={(e) => setPreg(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			<label className='frmLabel'>Would you like a pregnancy test</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={test} onChange={(e) => setTest(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			<label className='frmLabel'>Age periods started</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={aps} setValue={setAps} />
			</div>
			<label className='frmLabel'>Age periods ended</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={ape} setValue={setApe} />
			</div>
			<label className='frmLabel'>Age first pregnancy</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={afp} setValue={setAfp} />
			</div>
			<label className='frmLabel'>Age last pregnancy</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={alp} setValue={setAlp} />
			</div>
			<label className='frmLabel'>Age last menses</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={alm} setValue={setAlm} />
			</div>
			<label className='frmLabel'>Periods are</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={periods} onChange={(e) => setPeriods(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='a'>Absent</option>
					<option value='h'>Heavy</option>
					<option value='i'>Irregular</option>
					<option value='l'>Light</option>
					<option value='n'>Normal</option>
					<option value='r'>Regular</option>
				</select>
			</div>
			<label className='frmLabel'>Number of pregnancies</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={numPregs} setValue={setNumPregs} />
			</div>
			<label className='frmLabel'>Number of children</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={numKids} setValue={setNumkids} />
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
