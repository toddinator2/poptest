import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function MenPrevent({ userId }) {
	const [clg, setClg] = useState(false);
	const [clgDate, setClgDate] = useState('');
	const [cls, setCls] = useState(false);
	const [clsDate, setClsDate] = useState('');
	const [eye, setEye] = useState(false);
	const [eyeDate, setEyeDate] = useState('');
	const [psa, setPsa] = useState(false);
	const [psaDate, setPsaDate] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/men/prevent`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clg,
					clgdate: clgDate,
					cls,
					clsdate: clsDate,
					eye,
					eyedate: eyeDate,
					psa,
					psadate: psaDate,
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleChecks = (e, chk) => {
		if (chk === 'clg') {
			setClg(e.target.checked);
			if (!e.target.checked) {
				setClgDate('');
			}
		}
		if (chk === 'cls') {
			setCls(e.target.checked);
			if (!e.target.checked) {
				setClsDate('');
			}
		}
		if (chk === 'eye') {
			setEye(e.target.checked);
			if (!e.target.checked) {
				setEyeDate('');
			}
		}
		if (chk === 'psa') {
			setPsa(e.target.checked);
			if (!e.target.checked) {
				setPsaDate('');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={clg} onChange={(e) => handleChecks(e, 'clg')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cologuard</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{clg && <input className='inpMonth' type='month' value={clgDate} onChange={(e) => setClgDate(e.target.value)} />}
					{!clg && <input className='inpMonth' type='month' readOnly value={clgDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cls} onChange={(e) => handleChecks(e, 'cls')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Colonoscopy</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{cls && <input className='inpMonth' type='month' value={clsDate} onChange={(e) => setClsDate(e.target.value)} />}
					{!cls && <input className='inpMonth' type='month' readOnly value={clsDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={eye} onChange={(e) => handleChecks(e, 'eye')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Eye Exam</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{eye && <input className='inpMonth' type='month' value={eyeDate} onChange={(e) => setEyeDate(e.target.value)} />}
					{!eye && <input className='inpMonth' type='month' readOnly value={eyeDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={psa} onChange={(e) => handleChecks(e, 'psa')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Prostate Exam (PSA)</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{psa && <input className='inpMonth' type='month' value={psaDate} onChange={(e) => setPsaDate(e.target.value)} />}
					{!psa && <input className='inpMonth' type='month' readOnly value={psaDate} />}
				</div>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
