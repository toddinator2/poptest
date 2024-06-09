import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Men() {
	const [erd, setErd] = useState(false);
	const [sex, setSex] = useState(false);
	const [mus, setMus] = useState(false);
	const [nun, setNun] = useState(false);
	const [tst, setTst] = useState(false);
	const [exc, setExc] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/men/health`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					erd,
					sex,
					mus,
					nun,
					tst,
					exc,
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
		if (chk === 'nun') {
			setNun(true);
			setErd(false);
			setSex(false);
			setMus(false);
			setTst(false);
			setExc(false);
		}
		if (chk === 'erd') {
			setNun(false);
			setErd(e.target.checked);
		}
		if (chk === 'sex') {
			setNun(false);
			setSex(e.target.checked);
		}
		if (chk === 'mus') {
			setNun(false);
			setMus(e.target.checked);
		}
		if (chk === 'tst') {
			setNun(false);
			setTst(e.target.checked);
		}
		if (chk === 'exc') {
			setNun(false);
			setExc(e.target.checked);
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
					<input className='chkBox' type='checkbox' checked={erd} onChange={(e) => handleChecks(e, 'erd')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Erection Difficulties</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={sex} onChange={(e) => handleChecks(e, 'sex')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Loss of Interest in Sex</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={mus} onChange={(e) => handleChecks(e, 'mus')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Loss of Muscle</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={tst} onChange={(e) => handleChecks(e, 'tst')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Low Testosterone</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={exc} onChange={(e) => handleChecks(e, 'exc')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Poor Post Exercise Recovery</div>
				</div>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
