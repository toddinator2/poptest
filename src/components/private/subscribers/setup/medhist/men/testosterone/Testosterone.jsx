import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Testosterone({ userId }) {
	const [nrt, setNrt] = useState(false);
	const [wct, setWct] = useState(false);
	const [may, setMay] = useState(false);
	const [int, setInt] = useState(false);
	const [cur, setCur] = useState(false);
	const [learnmore, setLearnMore] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/men/testosterone`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					nrt,
					wct,
					may,
					int,
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
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={nrt} onChange={(e) => setNrt(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Never Received Treatment</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={wct} onChange={(e) => setWct(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Would Consider Treatment</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={may} onChange={(e) => setMay(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I May Need Treatment</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={int} onChange={(e) => setInt(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I Need Treatment</div>
				</div>
			</div>
			<div className='mb-4 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cur} onChange={(e) => setCur(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Currently in Treatment</div>
				</div>
			</div>
			<label className='frmLabel'>
				Are you interested in learning more about Testosterone Replacement Therapy during your visit? It&apos;s cost and how it restores libido and
				vitality, increases lean muscle mass, strength, and bone density, decreases fat, sharpens cognition and memory, enhances mood and sense of
				well-being, and boosts energy.
			</label>
			<div className='ps-2'>
				<select className='inpBorder form-control' value={learnmore} onChange={(e) => setLearnMore(e.target.value)}>
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
