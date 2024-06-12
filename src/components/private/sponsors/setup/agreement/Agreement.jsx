import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { Today } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';

export default function Agreement() {
	const today = Today();
	const [auth] = useContext(AuthContext);
	const [agree, setAgree] = useState(false);
	const [sign, setSign] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();

		//test typed name
		if (sign.toLowerCase() !== (auth.user.fname + ' ' + auth.user.lname).toLowerCase()) {
			toast.error('Typed name yours is not, try again you must...');
			setSign('');
			document.getElementById('sign').focus();
			return;
		}

		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/setup/edit/agreement`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					agreement: agree,
					agreementdate: today,
					agreementsign: sign,
					userid: auth.user._id,
					spnid: auth.user.spnObjId,
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
	const handleAccepted = async (e) => {
		const value = e.target.checked;
		setAgree(value);
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>SPONSOR AGREEMENT</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex justify-center'>Agreement Goes Here</div>
				<form onSubmit={handleSubmit}>
					<div className='w-5/6 mx-auto px-2 py-3'>
						<div className='mb-2 flex flex-row items-center'>
							<div className='w-1/6 flex justify-end'>
								<input className='chkBox' type='checkbox' checked={agree} onChange={(e) => handleAccepted(e)} />
							</div>
							<div className='w-5/6 ps-2'>
								<div className='text-sm'>I Accept</div>
							</div>
						</div>
						<label className='frmLabel'>Type Name to Sign &amp; Accept</label>
						<Input type='text' id='sign' required autocomplete='off' value={sign} setValue={setSign} />
						<div className='my-5 flex justify-center'>
							<Button type='submit' disabled={!agree || !sign}>
								Accept Agreement
							</Button>
						</div>
					</div>
				</form>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					<div className='mb-3 text-lg font-semibold text-center'>SPONSOR AGREEMENT</div>
					<div>Please read and check the &quot;I Accept&quot; checkbox and type in your first and last name to accept the Sponsor Agreement.</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
