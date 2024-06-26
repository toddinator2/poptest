'use client';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { FormatPhoneNumber, FormatZip } from '@/components/global/functions/Functions';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Checklist from '../checklist/Checklist';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function EmpForm({ user }) {
	const env = process.env.ENVIRONMENT;
	const [auth] = useContext(AuthContext);
	const [name, setName] = useState('');
	const [company, setCompany] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [add, setAdd] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/empform`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					company,
					name,
					phone,
					email,
					address: add,
					address2: add2,
					city,
					state,
					zip,
					subObjId: auth.user._id,
				}),
			});
			const data = await response.json();

			if (data.status === 400) {
				toast.error(data.msg);
				return;
			}

			if (data.status === 200) {
				//prepare data and send email to chad
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const emlTemplate = 'ptContactEmpForm';
				let toEmail = '';

				if (env === 'dev' || env === 'tst') {
					toEmail = 'todd@zaxxiss.com';
				} else {
					toEmail = 'chad@supernova3x.com';
				}

				//Set welcome email data
				const emlData = {
					toEmail: toEmail,
					company: company,
					name: name,
					phone: phone,
					email: email,
					address: add,
					address2: add2,
					city: city,
					state: state,
					zip: zip,
					patientname: auth.user.fname + ' ' + auth.user.lname,
				};

				//Send email
				emailjs.send(emlService, emlTemplate, emlData, emlUser);
				toast.success(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	const handleSkip = async (e) => {
		e.preventDefault();

		try {
			await fetch(`${process.env.API_URL}/subscribers/setup/skip`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					subid: auth.user._id,
					type: 'empform',
				}),
			});
		} catch (err) {
			toast.error(err);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	function handleZip(e) {
		const value = e.target.value;
		const formattedZip = FormatZip(value);
		setZip(formattedZip);
	}

	return (
		<>
			<div className='w-full my-7 font-semibold text-center text-2xl'>Contact My Employer</div>
			<div className='w-full lg:w-5/6 lg:mx-auto flex flex-col xl:flex-row xl-justify-center xl:gap-3'>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>MY EMPLOYER</div>
					<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
						<form onSubmit={handleSubmit}>
							<label className='frmLabel'>Contact Name</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={name} setValue={setName} />
							</div>
							<label className='frmLabel'>Company Name</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={company} setValue={setCompany} />
							</div>
							<label className='frmLabel'>Contact Phone</label>
							<div className='mb-2 ps-2'>
								<Input type='tel' required={true} value={phone} funcCall={handlePhone} />
							</div>
							<label className='frmLabel'>Contact Email</label>
							<div className='mb-2 ps-2'>
								<Input type='email' value={email} setValue={setEmail} />
							</div>
							<label className='frmLabel'>Street Adress</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={add} setValue={setAdd} />
							</div>
							<label className='frmLabel'>Address 2</label>
							<div className='mb-2 ps-2'>
								<Input type='text' value={add2} setValue={setAdd2} />
							</div>
							<label className='frmLabel'>City</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={city} setValue={setCity} />
							</div>
							<label className='frmLabel'>State</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' required={true} value={state} onChange={(e) => setState(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='AL'>Alabama</option>
									<option value='AK'>Alaska</option>
									<option value='AZ'>Arizona</option>
									<option value='AR'>Arkansas</option>
									<option value='CA'>California</option>
									<option value='CO'>Colorado</option>
									<option value='CT'>Connecticut</option>
									<option value='DE'>Delaware</option>
									<option value='DC'>District of Columbia</option>
									<option value='FL'>Florida</option>
									<option value='GA'>Georgia</option>
									<option value='HI'>Hawaii</option>
									<option value='ID'>Idaho</option>
									<option value='IL'>Illinois</option>
									<option value='IN'>Indiana</option>
									<option value='IA'>Iowa</option>
									<option value='KS'>Kansas</option>
									<option value='KY'>Kentucky</option>
									<option value='LA'>Louisiana</option>
									<option value='ME'>Maine</option>
									<option value='MD'>Maryland</option>
									<option value='MA'>Massachusetts</option>
									<option value='MI'>Michigan</option>
									<option value='MN'>Minnesota</option>
									<option value='MS'>Mississippi</option>
									<option value='MO'>Missouri</option>
									<option value='MT'>Montana</option>
									<option value='NE'>Nebraska</option>
									<option value='NV'>Nevada</option>
									<option value='NH'>New Hampshire</option>
									<option value='NJ'>New Jersey</option>
									<option value='NM'>New Mexico</option>
									<option value='NY'>New York</option>
									<option value='NC'>North Carolina</option>
									<option value='ND'>North Dakota</option>
									<option value='OH'>Ohio</option>
									<option value='OK'>Oklahoma</option>
									<option value='OR'>Oregon</option>
									<option value='PA'>Pennsylvania</option>
									<option value='RI'>Rhode Island</option>
									<option value='SC'>South Carolina</option>
									<option value='SD'>South Dakota</option>
									<option value='TN'>Tennessee</option>
									<option value='TX'>Texas</option>
									<option value='UT'>Utah</option>
									<option value='VT'>Vermont</option>
									<option value='VA'>Virginia</option>
									<option value='WA'>Washington</option>
									<option value='WV'>West Virginia</option>
									<option value='WI'>Wisconsin</option>
									<option value='WY'>Wyoming</option>
								</select>
							</div>
							<label className='frmLabel'>Zip Code</label>
							<div className='mb-2 ps-2'>
								<Input type='text' required={true} value={zip} funcCall={handleZip} />
							</div>
							<div className='mt-5 flex justify-center'>
								<Button type='submit' disabled={!name || !company || !phone || !city || !state || !zip}>
									Submit Form
								</Button>
							</div>
						</form>
					</div>
				</div>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
					<div className='w-full py-2 font-semibold text-center text-lg'>Employer Form</div>
					<div className='w-5/6 mx-auto py-3 flex flex-col'>
						<div className='mb-3'>
							SN3X Subscribers may wish for their Employer to pay for their Membership, but their company may not be aware of the benefits that
							only SUPERNOVA3X doctors offer. In that case let us make the call on your behalf. While we can&apos;t guarantee your company will
							get on board, we&apos;re pretty sure it will once they learn about the benefits and savings. By submitting the form, you permit SN3X
							representatives to contact your employer on your behalf, and the best part is, you get the credit for saving your company money and
							better healthcare for all employees!
						</div>
						<div>
							If your employer is already including your membership in your employee benefits, or you have a private or philanthropic paid
							membership, you may skip this step.
						</div>
					</div>
				</div>
				<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
					<Checklist />
				</div>
			</div>
			<div className='w-full my-5 flex justify-center'>
				<Button type='button' onClick={(e) => handleSkip(e)}>
					Skip
				</Button>
			</div>
		</>
	);
}
