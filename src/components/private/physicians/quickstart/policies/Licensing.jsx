import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { Today } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';

export default function Licensing() {
	const today = Today();
	const [auth] = useContext(AuthContext);
	const [accepted, setAccepted] = useState(false);
	const [inits, setInits] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/setup/edit/policies/licensing`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					accepted,
					today,
					inits,
					userid: auth.user._id,
					ofcid: auth.user.ofcObjId,
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
		setAccepted(value);
	};

	const handleInits = async (e) => {
		const value = e.target.value;
		let fmatch = auth.user.fname.charAt(0).toUpperCase();
		let lmatch = auth.user.lname.charAt(0).toUpperCase();
		const matchInits = fmatch + lmatch;
		if (value.length === 2) {
			let compInits = value.toUpperCase();
			if (compInits === matchInits) {
				setInits(compInits);
			} else {
				toast.error('Initials yours are not, try again you must.');
				setInits('');
				document.getElementById('inits').focus();
			}
		} else {
			setInits(value.toUpperCase());
		}
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>LICENSE AGREEMENT</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex justify-center'>Agreement Goes Here</div>
				<form onSubmit={handleSubmit}>
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/4 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={accepted} onChange={(e) => handleAccepted(e)} />
						</div>
						<div className='w-3/4 ps-2'>
							<div className='text-sm'>I Accept</div>
						</div>
					</div>
					<div className='flex flex-row items-center'>
						<div className='w-1/4 flex justify-end'>
							<input
								className='inpBorder form-control'
								type='text'
								required
								id='inits'
								autoComplete='off'
								maxLength={2}
								value={inits}
								onChange={(e) => handleInits(e)}
								style={{ width: '3em', textAlign: 'center' }}
							/>
						</div>
						<div className='w-3/4 ps-2'>
							<label className='frmLabel'>Initial to Verify Acceptance</label>
						</div>
					</div>
					<div className='my-5 flex justify-center'>
						<Button type='submit' disabled={!accepted || !inits || inits.length !== 2}>
							Accept Aggrement
						</Button>
					</div>
				</form>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					<div className='mb-3 text-lg font-semibold text-center'>SN3X LICENSE AGREEMENT</div>
					<div>Please read and check the &quot;I Accept&quot; checkbox and type in your initials to accept the License Agreement.</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
