import React, { useState } from 'react';
import { FormatPhoneNumber } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Emergency({ userId }) {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [relation, setRelation] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/emergency`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: userId,
					emergencycontact: name,
					emergencyphone: phone,
					emergencyrelation: relation,
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
	const handlePhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Contact Name</div>
				</div>
				<div className='col-12'>
					<Input type='text' required value={name} setValue={setName} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Contact Phone</div>
				</div>
				<div className='col-12'>
					<Input type='tel' required value={phone} funcCall={handlePhone} />
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Relation</div>
				</div>
				<div className='col-12'>
					<Input type='text' required value={relation} setValue={setRelation} />
				</div>
			</div>
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555' disabled={!name || !phone || !relation}>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
