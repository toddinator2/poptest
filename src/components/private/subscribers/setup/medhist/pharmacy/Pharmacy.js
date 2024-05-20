import React, { useState } from 'react';
import { FormatPhoneNumber } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Pharmacy({ userId }) {
	const [lclpharm, setLclPharm] = useState('');
	const [lclpharmphone, setLclPharmPhone] = useState('');
	const [lclpharmfax, setLclPharmFax] = useState('');
	const [lclpharmaddress, setLclPharmAddress] = useState('');
	const [onlpharm, setOnlPharm] = useState('');
	const [onlpharmphone, setOnlPharmPhone] = useState('');
	const [onlpharmfax, setOnlPharmFax] = useState('');
	const [onlpharmaddress, setOnlPharmAddress] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/pharmacy`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					lclpharm,
					lclpharmphone,
					lclpharmfax,
					lclpharmaddress,
					onlpharm,
					onlpharmphone,
					onlpharmfax,
					onlpharmaddress,
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
	const handleLclPhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setLclPharmPhone(formattedPhoneNumber);
	};

	const handleLclFax = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setLclPharmFax(formattedPhoneNumber);
	};

	const handleOnlPhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setOnlPharmPhone(formattedPhoneNumber);
	};

	const handleOnlFax = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setOnlPharmFax(formattedPhoneNumber);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Local Pharmacy Name</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={lclpharm} setValue={setLclPharm} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Local Pharmacy Phone</div>
				</div>
				<div className='col-12'>
					<Input type='tel' value={lclpharmphone} funcCall={handleLclPhone} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Local Pharmacy Fax</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={lclpharmfax} funcCall={handleLclFax} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Local Pharmacy Address</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={lclpharmaddress} setValue={setLclPharmAddress} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Online Pharmacy Name</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={onlpharm} setValue={setOnlPharm} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Online Pharmacy Phone</div>
				</div>
				<div className='col-12'>
					<Input type='tel' value={onlpharmphone} funcCall={handleOnlPhone} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Online Pharmacy Fax</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={onlpharmfax} funcCall={handleOnlFax} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Online Pharmacy Address</div>
				</div>
				<div className='col-12'>
					<Input type='text' value={onlpharmaddress} setValue={setOnlPharmAddress} />
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
