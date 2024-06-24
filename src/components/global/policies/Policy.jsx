import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { Today } from '../functions/Functions';
import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import Input from '../forms/input/Input';
import Button from '../forms/buttons/Button';
import Checklist from '@/components/private/physicians/quickstart/checklist/Checklist';

export default function Policy({ pol, reqType, su, suFld, suFin }) {
	const today = Today();
	const [auth] = useContext(AuthContext);
	const [polId, setPolId] = useState('');
	const [title, setTitle] = useState('');
	const [type, setType] = useState('');
	const [agree, setAgree] = useState(false);
	const [sign, setSign] = useState('');

	const Agreement = dynamic(() => import(`./contents/${pol}`));

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPolicy = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/policy/get/bycompname?cname=${pol}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setPolId(data.pol._id);
				setTitle(data.pol.name);
				setType(data.pol.type);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [pol]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadPolicy();
	}, [loadPolicy]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		let signerType = '';
		let suObjId = '';

		//test typed name
		if (sign.toLowerCase() !== (fname + ' ' + lname).toLowerCase()) {
			toast.error('Typed name yours is not, try again you must...');
			setSign('');
			document.getElementById('sign').focus();
			return;
		}

		//set signer type and check to make sure can sign
		const perm = auth.user.perm;
		if (perm === 'physician' || perm === 'npp' || perm === 'staff') {
			if (auth.user.role === 'admin') {
				signerType = 'phy';
				suObjId = auth.user.ofcObjId;
			} else {
				toast.error('You are not authorized to sign');
				return;
			}
		} else if (perm === 'sponsor') {
			if (auth.user.role === 'admin' || auth.user.role === 'financial') {
				signerType = 'spn';
				suObjId = auth.user.spnObjId;
			} else {
				toast.error('You are not authorized to sign');
				return;
			}
		} else {
			signerType = 'sub';
			suObjId = auth.user._id;
		}

		try {
			const response = await fetch(`${process.env.API_URL}/policy/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					agree,
					agreedate: today,
					agreesign: sign,
					signertype: signerType,
					requesttype: reqType,
					signerObjId: auth.user._id,
					requestObjId: '',
					policyObjId: polId,
					setup: su,
					sufld: suFld,
					suObjId,
					sufin: suFin,
				}),
			});
			data = await response.json();

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
	const handleAgree = async (e) => {
		const value = e.target.checked;
		setAgree(value);
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 2xl:w-3/4 lg:mx-auto flex flex-col xl:flex-row xl:justify-center gap-3 2xl:gap-6'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>{title}</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex justify-center'>
					<Agreement />
				</div>
				<form onSubmit={handleSubmit}>
					<div className='w-5/6 mx-auto px-2'>
						<div className='mb-2 flex flex-row items-center'>
							<div className='w-1/6 flex justify-end'>
								<input className='chkBox' type='checkbox' checked={agree} onChange={(e) => handleAgree(e)} />
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
					<div className='mb-3 text-lg font-semibold text-center'>{title}</div>
					<div>Please read and check the &quot;I Accept&quot; checkbox and type in your first and last name to accept the agreement.</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
