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
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>How did you hear about us?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' required value={hear} onChange={(e) => setHear(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='Google'>Google</option>
						<option value='Medical Referral'>Medical Referral</option>
						<option value='Friend Referral'>Friend Referral</option>
						<option value='Other'>Other</option>
					</select>
				</div>
			</div>
			{(hear === 'Medical Referral' || hear === 'Friend Referral' || hear === 'Other') && (
				<div className='row mb-2'>
					<div className='col-12'>
						<div className='frmLabel'>Please Specify:</div>
					</div>
					<div className='col-12'>
						<Input type='text' value={referrer} setValue={setReferrer} />
					</div>
				</div>
			)}
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>Marital Status</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' required value={marital} onChange={(e) => setMarital(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='s'>Single</option>
						<option value='m'>Married</option>
						<option value='d'>Divorced</option>
						<option value='w'>Widowed</option>
					</select>
				</div>
			</div>
			<div className='py-1'>The following information is for physician use only, not for SN3X representatives to contact them.</div>
			<div className='row my-2'>
				<div className='col-12'>
					<div className='frmLabel'>Current PCP Name</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={pcpName} setValue={setPcpName} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>Current PCP Phone</div>
				</div>
				<div className='col-12'>
					<Input type='tel' value={pcpPhone} funcCall={handlePcpPhone} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>Employer</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={employer} setValue={setEmployer} />
				</div>
			</div>
			<div className='row'>
				<div className='col-12'>
					<div className='frmLabel'>Employer Phone</div>
				</div>
				<div className='col-12'>
					<Input type='tel' value={empPhone} funcCall={handleEmpPhone} />
				</div>
			</div>
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555' disabled={!hear || !marital}>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
