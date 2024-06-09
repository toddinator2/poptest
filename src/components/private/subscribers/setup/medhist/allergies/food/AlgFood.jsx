import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function AlgFood({ userId }) {
	const [any, setAny] = useState('');
	const [dai, setDai] = useState(false);
	const [egg, setEgg] = useState(false);
	const [fsh, setFsh] = useState(false);
	const [glu, setGlu] = useState(false);
	const [pea, setPea] = useState(false);
	const [shl, setShl] = useState(false);
	const [soy, setSoy] = useState(false);
	const [trn, setTrn] = useState(false);
	const [whe, setWhe] = useState(false);
	const [oth, setOth] = useState(false);
	const [other, setOther] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/allergies/food`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					any,
					dai,
					egg,
					fsh,
					glu,
					pea,
					shl,
					soy,
					trn,
					whe,
					oth,
					other,
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
	const handleAny = (e) => {
		const value = e.target.value;
		setAny(value);
		if (value === 'n') {
			setDai(false);
			setEgg(false);
			setFsh(false);
			setGlu(false);
			setPea(false);
			setShl(false);
			setSoy(false);
			setTrn(false);
			setWhe(false);
			setOth(false);
			setOther('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<label className='frmLabel'>Are you allergic to any foods</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={any} onChange={(e) => handleAny(e)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			{any === 'y' && (
				<>
					<div className='row mb-1'>
						<div className='col-12'>
							<div className='frmLabel'>Please select all that apply or add others:</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={dai} onChange={(e) => setDai(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Dairy</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={egg} onChange={(e) => setEgg(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Eggs</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={fsh} onChange={(e) => setFsh(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Fish</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={glu} onChange={(e) => setGlu(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Gluten</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={pea} onChange={(e) => setPea(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Peanuts</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={shl} onChange={(e) => setShl(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Shellfish</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={soy} onChange={(e) => setSoy(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Soy</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={trn} onChange={(e) => setTrn(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Tree Nuts</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={whe} onChange={(e) => setWhe(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Wheat</div>
						</div>
					</div>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={oth} onChange={(e) => setOth(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Other</div>
						</div>
					</div>
					{oth && (
						<div className='flex flex-row'>
							<div className='w-1/6 flex justify-end'>&nbsp;</div>
							<div className='w-5/6 mt-1 ps-2'>
								<Input type='text' placeholder='Please Specify' value={other} setValue={setOther} />
							</div>
						</div>
					)}
				</>
			)}
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
