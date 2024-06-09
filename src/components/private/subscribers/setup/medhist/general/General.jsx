'use client';
import React, { useState } from 'react';
import { FormatPhoneNumber } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function General({ userId }) {
	const [hear, setHear] = useState('');
	const [referrer, setReferrer] = useState('');
	const [marital, setMarital] = useState('');
	const [pcpName, setPcpName] = useState('');
	const [pcpPhone, setPcpPhone] = useState('');
	const [employer, setEmployer] = useState('');
	const [empPhone, setEmpPhone] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/general`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: userId,
					hearabout: hear,
					referredby: referrer,
					marital,
					pcpname: pcpName,
					pcpphone: pcpPhone,
					employer,
					employerphone: empPhone,
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
	const handlePcpPhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPcpPhone(formattedPhoneNumber);
	};

	const handleEmpPhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setEmpPhone(formattedPhoneNumber);
	};
	return (
		<form onSubmit={handleSubmit}>
			<label className='frmLabel'>How did you hear about us?</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' required value={hear} onChange={(e) => setHear(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='Google'>Google</option>
					<option value='Medical Referral'>Medical Referral</option>
					<option value='Friend Referral'>Friend Referral</option>
					<option value='Other'>Other</option>
				</select>
				{(hear === 'Medical Referral' || hear === 'Friend Referral' || hear === 'Other') && (
					<div className='mt-1'>
						<Input type='text' placeholder='Please Specify' value={referrer} setValue={setReferrer} />
					</div>
				)}
			</div>
			<label className='frmLabel'>Marital status</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' required value={marital} onChange={(e) => setMarital(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='s'>Single</option>
					<option value='m'>Married</option>
					<option value='d'>Divorced</option>
					<option value='w'>Widowed</option>
				</select>
			</div>
			<div className='mt-4 mb-2 text-sm text-center'>
				The following information is for physician use only, not for SN3X representatives to contact them.
			</div>
			<label className='frmLabel'>Current PCP Name</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={pcpName} setValue={setPcpName} />
			</div>
			<label className='frmLabel'>Current PCP Phone</label>
			<div className='mb-2 ps-2'>
				<Input type='tel' value={pcpPhone} funcCall={handlePcpPhone} />
			</div>
			<label className='frmLabel'>Employer</label>
			<div className='mb-2 ps-2'>
				<Input type='text' value={employer} setValue={setEmployer} />
			</div>
			<label className='frmLabel'>Employer Phone</label>
			<div className='mb-2 ps-2'>
				<Input type='tel' value={empPhone} funcCall={handleEmpPhone} />
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit' disabled={!hear || !marital}>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
