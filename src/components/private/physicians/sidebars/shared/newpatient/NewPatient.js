import React, { useContext, useState } from 'react';
import './NewPatient.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { CompareByFName, FixDob, FixPhone, FormatDob, FormatPhoneNumber, IsValidEmail, RandomStringMake } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import Input from '@/components/global/forms/input/Input';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import icoClose from '@/assets/images/icoClose.png';

export default function NewPatient({ funcClose }) {
	const [auth, _setAuth] = useContext(AuthContext);
	const [schPatients, setSchPatients] = useContext(PatientContext);
	const [ptOffices] = useState([]);
	const [ptExists, setPtExists] = useState('');
	const [s3xid, setS3xId] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [dob, setDob] = useState('');
	const [weightloss, setWeightLoss] = useState(false);
	const [loading, setLoading] = useState(false);

	const handlePtExists = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/patients/add/existing`, {
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
				//update the patient search array
				//get the patient data
				const ptResponse = await fetch(`${process.env.API_URL}/private/physicians/patients/get/bys3xid?s3xid=${s3xid}`, {
					method: 'GET',
				});
				const ptData = await ptResponse.json();
				const pt = ptData.user;

				let curPts = schPatients.patients;
				const newObj = {
					_id: pt._id,
					fname: pt.fname,
					lname: pt.lname,
					dob: pt.dob,
					phone: pt.mphone,
				};
				curPts.push(newObj);
				curPts.sort(CompareByFName);
				setSchPatients({ patients: curPts, selected: '', filtered: [] });

				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	const handlePtNew = async (e) => {
		e.preventDefault();
		setLoading(true);

		//Check email
		if (!IsValidEmail(email)) {
			toast.error('Please enter a valid patient email');
			return;
		}

		//Set office array to insert with patient
		if (ptOffices.length === 0) {
			ptOffices.push(auth.user.ofcObjId);
		}

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
			const response = await fetch(`${process.env.API_URL}/private/physicians/patients/add/new`, {
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
				//Get new patient data
				const ptResponse = await fetch(`${process.env.API_URL}/private/physicians/patients/get/byverifycode?vc=${verifycode}`, {
					method: 'GET',
				});
				const ptData = await ptResponse.json();

				if (!ptResponse.ok) {
					toast.error(ptData?.msg);
				} else {
					const newPt = ptData?.user;
					const newUname = newPt.username;

					//update patient search array
					let curPts = schPatients.patients;
					const newObj = {
						_id: newPt._id,
						fname: newPt.fname,
						lname: newPt.lname,
						dob: newPt.dob,
						phone: newPt.mphone,
					};
					curPts.push(newObj);
					curPts.sort(CompareByFName);

					setSchPatients({ patients: curPts, selected: '', filtered: [] });

					//prepare data and send email to new patient
					const url = process.env.NEXTAUTH_URL;
					const domain = process.env.DOMAIN;
					const emlService = process.env.EMAILJS_SERVICE;
					const emlUser = process.env.EMAILJS_USER;
					const emlTemplate = 'ptRegWelcomeOfficeNew';
					const verifyLink = `${url}/subscribers/verify/email/${verifycode}`;
					let contactLink = `${url}/contact`;
					let ofcName = '';

					//Get office data
					const ofcResponse = await fetch(`${process.env.API_URL}/private/physicians/office/data/get?id=${auth.user.ofcObjId}`, {
						method: 'GET',
					});
					const ofcData = await ofcResponse.json();

					if (!ofcResponse.ok) {
						toast.error(ofcData?.msg);
					} else {
						const ofc = ofcData?.office;
						ofcName = ofc.name;
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
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	const handleClose = () => {
		setFname('');
		setLname('');
		setEmail('');
		setPhone('');
		setDob('');
		setS3xId('');
		setWeightLoss(false);
		ptOffices.length = 0;
		setPtExists('');
		funcClose();
	};

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
	const handleWeightLoss = (e) => {
		const value = e.target.checked;
		setWeightLoss(value);
	};

	return (
		<div className='mb-5 px-2'>
			<div className='row pt-1'>
				<div className='col-12 d-flex justify-content-end'>
					<Image className='icoSmall' src={icoClose} title='Close' alt='Close' onClick={handleClose} />
				</div>
			</div>
			<form>
				<div className='mb-2 d-flex justify-content-center'>
					<div className='phyMnuHdng'>New Patient</div>
				</div>
				<div className='row mb-2'>
					<div className='col-12'>
						<div className='pbpgText center'>Is this patient already a member of Supernova3x?</div>
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12'>
						<select className='inpBorder form-control mb-2' value={ptExists} onChange={(e) => setPtExists(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='yes'>Yes</option>
							<option value='no'>No</option>
						</select>
					</div>
				</div>
				{ptExists === 'yes' && (
					<>
						<div className='row mb-4'>
							<div className='col-12'>
								<Input label='Supernova3x Patient ID:' type='text' value={s3xid} setValue={setS3xId} />
							</div>
						</div>
						<div className='row'>
							<div className='col-12 d-flex justify-content-center'>
								<Button type='button' border='ff0000' disabled={s3xid.trim() === ''} onClick={handlePtExists}>
									Save Patient
								</Button>
							</div>
						</div>
					</>
				)}
				{ptExists === 'no' && (
					<>
						<Input label='First Name' type='text' required={true} value={fname} setValue={setFname} />
						<Input label='Last Name' type='text' required={true} value={lname} setValue={setLname} />
						<Input label='Email' type='email' required={true} value={email} setValue={setEmail} />
						<Input label='Cell Phone #' type='tel' required={true} value={phone} funcCall={handlePhone} />
						<Input label='DOB (mmddyyyy)' type='text' required={true} value={dob} funcCall={handleDob} />
						<div className='row mt-3'>
							<div className='col-2 d-flex justify-content-end'>
								<CheckBox check={weightloss} funcCall={handleWeightLoss} />
							</div>
							<div className='col ps-1'>
								<div className='textSemi'>Weight Loss Patient</div>
							</div>
						</div>
						<div className='my-3 d-flex justify-content-center'>
							<Button
								type='button'
								border='ff0000'
								disabled={fname.trim() === '' || lname.trim() === '' || email.trim() === '' || phone.trim() === '' || dob.trim() === ''}
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
	);
}
