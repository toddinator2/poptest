import React, { useState } from 'react';
import Button from '@/components/global/forms/buttons/Button';

export default function WmnPrevent({ userId }) {
	const [clg, setClg] = useState(false);
	const [clgDate, setClgDate] = useState('');
	const [cls, setCls] = useState(false);
	const [clsDate, setClsDate] = useState('');
	const [dex, setDex] = useState(false);
	const [dexDate, setDexDate] = useState('');
	const [eye, setEye] = useState(false);
	const [eyeDate, setEyeDate] = useState('');
	const [mam, setMam] = useState(false);
	const [mamDate, setMamDate] = useState('');
	const [pap, setPap] = useState(false);
	const [papDate, setPapDate] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/women/prevent`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					clg,
					clgdate: clgDate,
					cls,
					clsdate: clsDate,
					dex,
					dexdate: dexDate,
					eye,
					eyedate: eyeDate,
					mam,
					mamdate: mamDate,
					pap,
					papdate: papDate,
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
		if (chk === 'dex') {
			setDex(e.target.checked);
			if (!e.target.checked) {
				setDexDate('');
			}
		}
		if (chk === 'eye') {
			setEye(e.target.checked);
			if (!e.target.checked) {
				setEyeDate('');
			}
		}
		if (chk === 'mam') {
			setMam(e.target.checked);
			if (!e.target.checked) {
				setMamDate('');
			}
		}
		if (chk === 'pap') {
			setPap(e.target.checked);
			if (!e.target.checked) {
				setPapDate('');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={clg} onChange={(e) => handleChecks(e, 'clg')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cologuard</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-4 d-flex justify-content-end'>
					<div className='fs-6'>Date:</div>
				</div>
				<div className='col-6 ps-0'>
					{clg && <input className='inpMonth' type='month' value={clgDate} onChange={(e) => setClgDate(e.target.value)} />}
					{!clg && <input className='inpMonth' type='month' readOnly value={clgDate} />}
				</div>
			</div>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cls} onChange={(e) => handleChecks(e, 'cls')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Colonoscopy</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-4 d-flex justify-content-end'>
					<div className='fs-6'>Date:</div>
				</div>
				<div className='col-6 ps-0'>
					{cls && <input className='inpMonth' type='month' value={clsDate} onChange={(e) => setClsDate(e.target.value)} />}
					{!cls && <input className='inpMonth' type='month' readOnly value={clsDate} />}
				</div>
			</div>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={dex} onChange={(e) => handleChecks(e, 'dex')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Dexa/Bone Density</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-4 d-flex justify-content-end'>
					<div className='fs-6'>Date:</div>
				</div>
				<div className='col-6 ps-0'>
					{dex && <input className='inpMonth' type='month' value={dexDate} onChange={(e) => setDexDate(e.target.value)} />}
					{!dex && <input className='inpMonth' type='month' readOnly value={dexDate} />}
				</div>
			</div>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={eye} onChange={(e) => handleChecks(e, 'eye')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Eye Exam</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-4 d-flex justify-content-end'>
					<div className='fs-6'>Date:</div>
				</div>
				<div className='col-6 ps-0'>
					{eye && <input className='inpMonth' type='month' value={eyeDate} onChange={(e) => setEyeDate(e.target.value)} />}
					{!eye && <input className='inpMonth' type='month' readOnly value={eyeDate} />}
				</div>
			</div>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={mam} onChange={(e) => handleChecks(e, 'mam')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Mammogram</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-4 d-flex justify-content-end'>
					<div className='fs-6'>Date:</div>
				</div>
				<div className='col-6 ps-0'>
					{mam && <input className='inpMonth' type='month' value={mamDate} onChange={(e) => setMamDate(e.target.value)} />}
					{!mam && <input className='inpMonth' type='month' readOnly value={mamDate} />}
				</div>
			</div>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={pap} onChange={(e) => handleChecks(e, 'pap')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Pap Smear</div>
				</div>
			</div>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-4 d-flex justify-content-end'>
					<div className='fs-6'>Date:</div>
				</div>
				<div className='col-6 ps-0'>
					{pap && <input className='inpMonth' type='month' value={papDate} onChange={(e) => setPapDate(e.target.value)} />}
					{!pap && <input className='inpMonth' type='month' readOnly value={papDate} />}
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
