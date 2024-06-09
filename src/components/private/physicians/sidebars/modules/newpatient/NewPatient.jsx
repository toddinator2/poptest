import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { FixDob, FixPhone, FormatDob, FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';

export default function NewPatient() {
	const [auth] = useContext(AuthContext);
	const [ptExists, setPtExists] = useState('');
	const [s3xid, setS3xId] = useState('');
	const [shwForm, setShwForm] = useState(false);
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');
	const [weightloss, setWeightLoss] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handlePtExists = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/patients/add/existing`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					s3xid,
					ofcid: auth.user.ofcObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setPtExists('');
			setS3xId('');
			setShwForm(false);
			setLoading(false);
		}
	};

	const handlePtNew = async (e) => {
		e.preventDefault();
		setLoading(true);
		let ptOffices = [];

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid patient email');
			return;
		}

		//Set office array to insert with patient
		ptOffices.push(auth.user.ofcObjId);

		//Fix phone number to only numbers
		let phn = '';
		phn = FixPhone(phone);

		//Fix DOB to only numbers
		let newDob = '';
		newDob = await FixDob(dob);

		//Create temporary password
		const tmpPwrd = RandomStringMake(10);

		//Create the reset code to reset credentials
		const resetcode = RandomStringMake(5);

		//Create the email verification code
		const verifycode = RandomStringMake(64);

		try {
			const response = await fetch(`${process.env.API_URL}/physicians/patients/add/new`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fname: fname,
					lname: lname,
					email: email,
					mphone: phn,
					dob: newDob,
					password: tmpPwrd,
					resetcreds: true,
					resetcode: resetcode,
					verifycode: verifycode,
					weightloss: weightloss,
					offices: ptOffices,
					ofcObjId: auth.user.ofcObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				const newUname = data.uname;

				//prepare data and send email to new patient
				const url = process.env.NEXTAUTH_URL;
				const domain = process.env.DOMAIN;
				const emlService = process.env.EMAILJS_SERVICE;
				const emlUser = process.env.EMAILJS_USER;
				const emlTemplate = 'ptRegWelcomeOfficeNew';
				const verifyLink = `${url}/subscribers/verify/new/${verifycode}`;
				let contactLink = `${url}/contact`;
				let ofcName = '';

				//Get office data
				const ofcResponse = await fetch(`${process.env.API_URL}/physicians/office/data/get/namephone?id=${auth.user.ofcObjId}`, {
					method: 'GET',
				});
				const ofcData = await ofcResponse.json();

				if (ofcData.status === 200) {
					ofcName = ofcData.office.name;
				} else {
					toast.error(ofcData.msg);
				}

				//Set welcome email data
				const emlData = {
					domain: domain,
					toEmail: email.toLowerCase(),
					toName: fname,
					officeName: ofcName,
					verifyLink: verifyLink,
					userName: newUname,
					tmpPassword: tmpPwrd,
					contactLink: contactLink,
				};

				//Send email
				emailjs.send(emlService, emlTemplate, emlData, emlUser);
				toast.success(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setPtExists('');
			setFname('');
			setLname('');
			setEmail('');
			setPhone('');
			setDob('');
			setWeightLoss(false);
			setShwForm(false);
			setLoading(false);
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

	function handleDob(e) {
		const value = e.target.value;
		const chkDob = FormatDob(value);
		setDob(chkDob);
	}

	return (
		<>
			{!shwForm ? (
				<div className='sbButton mb-3' onClick={() => setShwForm(!shwForm)}>
					NEW SUBSCRIBER
				</div>
			) : (
				<>
					<div className='sbButton active mb-1' onClick={() => setShwForm(!shwForm)}>
						NEW SUBSCRIBER
					</div>
					<div className='mb-7 p-3 mx-auto border-4 border-drkbrd bg-black rounded-xl'>
						<form>
							<div className='mb-1 txt-sm text-center text-lgtblu'>Is this patient already a member of Supernova3x?</div>
							<select className='inpBorder form-control mb-2' value={ptExists} onChange={(e) => setPtExists(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='yes'>Yes</option>
								<option value='no'>No</option>
							</select>
							{ptExists === 'yes' && (
								<>
									<label className='frmLabel'>Patient Supernova3x ID</label>
									<div className='mb-2'>
										<Input type='text' value={s3xid} setValue={setS3xId} />
									</div>
									<div className='mt-5 flex justify-center'>
										<Button type='button' disabled={!s3xid.trim()} onClick={handlePtExists}>
											Save Patient
										</Button>
									</div>
								</>
							)}
							{ptExists === 'no' && (
								<>
									<label className='frmLabel'>First Name</label>
									<div className='mb-2'>
										<Input type='text' value={fname} setValue={setFname} />
									</div>
									<label className='frmLabel'>Last Name</label>
									<div className='mb-2'>
										<Input type='text' value={lname} setValue={setLname} />
									</div>
									<label className='frmLabel'>Email</label>
									<div className='mb-2'>
										<Input type='email' value={email} setValue={setEmail} />
									</div>
									<label className='frmLabel'>Cell Phone #</label>
									<div className='mb-2'>
										<Input type='tel' value={phone} funcCall={handlePhone} />
									</div>
									<label className='frmLabel'>DOB (mmddyyyy)</label>
									<div className='mb-2'>
										<Input type='text' value={dob} funcCall={handleDob} />
									</div>
									<div className='flex flex-row items-center'>
										<div className='w-1/6 flex justify-end'>
											<input className='chkBox' type='checkbox' checked={weightloss} onChange={(e) => setWeightLoss(e.target.checked)} />
										</div>
										<div className='w-5/6 ps-2'>
											<div className='text-sm'>Weight Loss Patient</div>
										</div>
									</div>
									<div className='mt-5 flex justify-center'>
										<Button
											type='button'
											disabled={!fname.trim() || !lname.trim() || !email.trim() || !phone.trim() || !dob.trim()}
											onClick={handlePtNew}
										>
											Save Patient
										</Button>
									</div>
								</>
							)}
						</form>
						{loading && <Spinner />}
					</div>
				</>
			)}
		</>
	);
}
