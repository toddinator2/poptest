import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Medications({ userId }) {
	const [meds, setMeds] = useState([]);
	const [medType, setMedType] = useState('');
	const [medName, setMedName] = useState('');
	const [medDosage, setMedDosage] = useState('');
	const [medFrequency, setMedFrequency] = useState('');
	const [medReason, setMedReason] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		//get last data submitted from form before done
		let medObj = {};
		if (medType === 'pre') {
			medObj = { type: medType, name: medName, dosage: medDosage, frequency: medFrequency };
		} else {
			medObj = { type: medType, name: medName, reason: medReason };
		}
		meds.push(medObj);

		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/medications`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					meds,
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
	const addMed = (e) => {
		let medObj = {};
		if (medType === 'pre') {
			medObj = { type: medType, name: medName, dosage: medDosage, frequency: medFrequency };
		} else {
			medObj = { type: medType, name: medName, reason: medReason };
		}
		setMeds([...meds, medObj]);
		setMedType('');
		setMedName('');
		setMedDosage('');
		setMedFrequency('');
		setMedReason('');
	};

	return (
		<>
			<div className='mb-3 text-sm text-center'>
				<strong>IMPORTANT!</strong> Providing complete and accurate reporting about your current Prescription Medications, Over The Counter Medications
				(OTC), Supplements, and Cannabidiol (CBD) may greatly and positively impact your care and safety. Please be thorough in this section.
			</div>
			<form onSubmit={handleSubmit}>
				<label className='frmLabel'>Medication Type</label>
				<div className='mb-2 ps-2'>
					<select className='inpBorder form-control' required={true} value={medType} onChange={(e) => setMedType(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='nun'>No Medications</option>
						<option value='pre'>Prescription</option>
						<option value='otc'>Over The Counter</option>
						<option value='sup'>Supplement</option>
						<option value='cbd'>Cannabidiol</option>
					</select>
				</div>
				<label className='frmLabel'>Name</label>
				<div className='mb-2 ps-2'>
					<Input type='text' required={true} value={medName} setValue={setMedName} />
				</div>
				{medType === 'pre' && (
					<>
						<label className='frmLabel'>Dosage</label>
						<div className='mb-2 ps-2'>
							<Input type='text' required={true} value={medDosage} setValue={setMedDosage} />
						</div>
						<label className='frmLabel'>Frequency</label>
						<div className='mb-2 ps-2'>
							<Input type='text' required={true} value={medFrequency} setValue={setMedFrequency} />
						</div>
					</>
				)}
				{medType !== 'pre' && medType !== '' && medType !== 'nun' && (
					<>
						<label className='frmLabel'>Reason</label>
						<div className='mb-2 ps-2'>
							<Input type='text' required={true} value={medReason} setValue={setMedReason} />
						</div>
					</>
				)}
				<div className='mt-5 flex-auto'>
					<div className='mb-3 flex justify-center'>
						{medType === 'pre' && (
							<Button type='button' disabled={!medType || !medName || !medDosage || !medFrequency} onClick={addMed}>
								Save Changes
							</Button>
						)}
						{medType !== 'pre' && (
							<Button type='button' disabled={!medType || !medName || !medReason} onClick={addMed}>
								Save & Add Another
							</Button>
						)}
					</div>
					<div className='flex justify-center'>
						{medType === 'pre' && (
							<Button type='submit' disabled={!medType || !medName || !medDosage || !medFrequency}>
								Save & Done
							</Button>
						)}
						{medType !== 'pre' && medType !== 'nun' && (
							<Button type='submit' disabled={!medType || !medName || !medReason}>
								Save & Done
							</Button>
						)}
						{medType === 'nun' && <Button type='submit'>Save & Done</Button>}
					</div>
				</div>
			</form>
		</>
	);
}
