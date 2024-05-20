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
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Are you currently pregnant?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={preg} onChange={(e) => setPreg(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='y'>Yes</option>
						<option value='n'>No</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Would you like a pregnancy test?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={test} onChange={(e) => setTest(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='y'>Yes</option>
						<option value='n'>No</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Age periods started</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={aps} setValue={setAps} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Age periods ended</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={ape} setValue={setApe} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Age first pregnancy</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={afp} setValue={setAfp} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Age last pregnancy</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={alp} setValue={setAlp} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Age last menses</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={alm} setValue={setAlm} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Periods are</div>
				</div>
				<div className='col-12'>
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
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Number of pregnancies</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={numPregs} setValue={setNumPregs} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Number of children</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={numKids} setValue={setNumkids} />
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
