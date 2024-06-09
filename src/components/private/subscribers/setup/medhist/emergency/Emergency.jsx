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
			<label className='frmLabel'>Contact Name</label>
			<div className='mb-2 ps-2'>
				<Input type='text' required={true} value={name} setValue={setName} />
			</div>
			<label className='frmLabel'>Contact Phone</label>
			<div className='mb-2 ps-2'>
				<Input type='text' required={true} value={phone} funcCall={handlePhone} />
			</div>
			<label className='frmLabel'>Relation</label>
			<div className='mb-2 ps-2'>
				<Input type='text' required={true} value={relation} setValue={setRelation} />
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit' disabled={!name || !phone || !relation}>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
