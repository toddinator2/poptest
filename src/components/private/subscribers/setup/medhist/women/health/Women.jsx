import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Women({ userId }) {
	const [bhc, setBhc] = useState(false);
	const [dgp, setDgp] = useState(false);
	const [fhr, setFhr] = useState(false);
	const [hot, setHot] = useState(false);
	const [irr, setIrr] = useState(false);
	const [lsx, setLsx] = useState(false);
	const [nun, setNun] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/women/health`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					bhc,
					dgp,
					fhr,
					hot,
					irr,
					lsx,
					nun,
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
	const handleChecks = (e, chk) => {
		if (chk === 'nun') {
			setNun(true);
			setBhc(false);
			setDgp(false);
			setFhr(false);
			setHot(false);
			setIrr(false);
			setLsx(false);
		}
		if (chk === 'bhc') {
			setNun(false);
			setBhc(e.target.checked);
		}
		if (chk === 'dgp') {
			setNun(false);
			setDgp(e.target.checked);
		}
		if (chk === 'fhr') {
			setNun(false);
			setFhr(e.target.checked);
		}
		if (chk === 'hot') {
			setNun(false);
			setHot(e.target.checked);
		}
		if (chk === 'irr') {
			setNun(false);
			setIrr(e.target.checked);
		}
		if (chk === 'lsx') {
			setNun(false);
			setLsx(e.target.checked);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={nun} onChange={(e) => handleChecks(e, 'nun')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>None of These</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={bhc} onChange={(e) => handleChecks(e, 'bhc')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Bladder Habit Changes</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={dgp} onChange={(e) => handleChecks(e, 'dgp')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Difficulty Getting Pregnant</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={fhr} onChange={(e) => handleChecks(e, 'fhr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Facial Hair</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hot} onChange={(e) => handleChecks(e, 'hot')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Hot Flashes</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={irr} onChange={(e) => handleChecks(e, 'irr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Irregular/No Periods</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={lsx} onChange={(e) => handleChecks(e, 'lsx')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Loss of Interest in Sex</div>
				</div>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
