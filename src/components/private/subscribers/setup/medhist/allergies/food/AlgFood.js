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
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>Are you allergic to any foods?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={any} onChange={(e) => handleAny(e)}>
						<option value=''>Select One...</option>
						<option value='y'>Yes</option>
						<option value='n'>No</option>
					</select>
				</div>
			</div>
			{any === 'y' && (
				<>
					<div className='row mb-1'>
						<div className='col-12'>
							<div className='frmLabel'>Please select all that apply or add others:</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={dai} onChange={(e) => setDai(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Dairy</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={egg} onChange={(e) => setEgg(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Eggs</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={fsh} onChange={(e) => setFsh(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Fish</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={glu} onChange={(e) => setGlu(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Gluten</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={pea} onChange={(e) => setPea(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Peanuts</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={shl} onChange={(e) => setShl(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Shellfish</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={soy} onChange={(e) => setSoy(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Soy</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={trn} onChange={(e) => setTrn(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Tree Nuts</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={whe} onChange={(e) => setWhe(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Wheat</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={oth} onChange={(e) => setOth(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Other</div>
						</div>
					</div>
					{oth && (
						<div className='row'>
							<div className='col-2'></div>
							<div className='col-9'>
								<div className='frmLabel'>Please Specify:</div>
							</div>
							<div className='col-2'></div>
							<div className='col-9'>
								<Input type='text' value={other} setValue={setOther} />
							</div>
						</div>
					)}
				</>
			)}
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
