import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function AlgMeds({ userId }) {
	const [any, setAny] = useState('');
	const [bio, setBio] = useState(false);
	const [con, setCon] = useState(false);
	const [asp, setAsp] = useState(false);
	const [bpm, setBpm] = useState(false);
	const [che, setChe] = useState(false);
	const [pen, setPen] = useState(false);
	const [udd, setUdd] = useState(false);
	const [oth, setOth] = useState(false);
	const [other, setOther] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/allergies/meds`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					any,
					bio,
					con,
					asp,
					bpm,
					che,
					pen,
					udd,
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
			setBio(false);
			setCon(false);
			setAsp(false);
			setBpm(false);
			setChe(false);
			setPen(false);
			setUdd(false);
			setOth(false);
			setOther('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Are you allergic to any Medications (drugs)?</div>
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
							<input className='chkBox' type='checkbox' checked={bio} onChange={(e) => setBio(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Antibiotics containing sulfonamides (sulfa drugs)</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={con} onChange={(e) => setCon(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Anticonvulsants</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={asp} onChange={(e) => setAsp(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Aspirin, ibuprofen, another nonsteroidal anti-inflammatory</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={bpm} onChange={(e) => setBpm(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Blood pressure medication</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={che} onChange={(e) => setChe(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Chemotherapy drugs</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={pen} onChange={(e) => setPen(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Penicillin and related antibiotics</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={udd} onChange={(e) => setUdd(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>*Underwent drug desensitization*</div>
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
							<div className='col-9 mb-1'>
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
