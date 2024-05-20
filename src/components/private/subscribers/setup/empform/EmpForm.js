'use client';
import React, { useState } from 'react';
import { FormatPhoneNumber, FormatZip } from '@/components/global/functions/Functions';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import Checklist from '../checklist/Checklist';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function EmpForm({ user }) {
	const env = process.env.ENVIRONMENT;
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
					patientObjId: user._id,
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
					patientname: user.fname + ' ' + user.lname,
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
					ptid: user._id,
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
			<div className='row mt-3 mt-xl-5 d-flex justify-content-center'>
				<div className='suDiv red order-last order-xl-first'>
					<div className='suHdrDiv red'>MY EMPLOYER FORM</div>
					<form onSubmit={handleSubmit}>
						<div className='row mt-3 d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Contact Name:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='text' required={true} value={name} setValue={setName} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Company Name:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='text' required={true} value={company} setValue={setCompany} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Contact Phone:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='tel' required={true} value={phone} funcCall={handlePhone} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Contact Email:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='email' value={email} setValue={setEmail} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Street Adress:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='text' required={true} value={add} setValue={setAdd} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Address 2:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='text' value={add2} setValue={setAdd2} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>City:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='text' required={true} value={city} setValue={setCity} />
							</div>
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>State:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<select className='inpBorder form-control mb-2' required={true} value={state} onChange={(e) => setState(e.target.value)}>
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
						</div>
						<div className='row d-flex align-items-center'>
							<div className='col-10 col-xl-5 offset-1 offset-xl-0 d-flex justify-content-start justify-content-xl-end'>
								<div className='frmLabel mb-2'>Zip Code:</div>
							</div>
							<div className='col-10 col-xl-6 col-xxl-5 offset-1 offset-xl-0 ps-0 ps-xl-2'>
								<Input type='text' required={true} value={zip} funcCall={handleZip} />
							</div>
						</div>
						<div className='mt-4 d-flex justify-content-center'>
							<Button type='submit' border='555555' disabled={!name || !company || !phone || !city || !state || !zip}>
								Submit Form
							</Button>
						</div>
					</form>
				</div>
				<div className='suDiv blu mx-4 mb-3 mb-xl-0 order-2'>
					<div className='suHdrDiv blu'>DETAILS</div>
					<div className='row mt-3 mb-4'>
						<div className='col-12'>
							<div className='suHdng'>Employer Form</div>
						</div>
					</div>
					<div className='px-2 px-xl-4'>
						<p>
							SN3X Subscribers may wish for their Employer to pay for their Membership, but their company may not be aware of the benefits that
							only SUPERNOVA3X doctors offer. In that case let us make the call on your behalf. While we can&apos;t guarantee your company will
							get on board, we&apos;re pretty sure it will once they learn about the benefits and savings. By submitting the form, you permit SN3X
							representatives to contact your employer on your behalf, and the best part is, you get the credit for saving your company money and
							better healthcare for all employees!
						</p>
						<p>
							If your employer is already including your membership in your employee benefits, or you have a private or philanthropic paid
							membership, you may skip this step.
						</p>
					</div>
				</div>
				<div className='suDiv ppl mb-3 mb-xl-0 order-first order-xl-last'>
					<div className='suHdrDiv ppl'>SETUP CHECKLIST</div>
					<Checklist progress={user.setupprogress} />
				</div>
			</div>
			<div className='row my-4'>
				<div className='col-12 d-flex justify-content-center'>
					<Button type='button' border='555555' onClick={(e) => handleSkip(e)}>
						Skip
					</Button>
				</div>
			</div>
		</>
	);
}
