import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PatientSearchContext } from '@/utils/context/physicians/PatientSearchContext';
import { getFromLocalStorage } from '@/utils/helpers/lsSecure';
import { CalculateAge, FormatDob, FormatPhoneNumber } from '@/components/global/functions/Functions';
import Link from 'next/link';
import Image from 'next/image';
import toast from 'react-hot-toast';
import icoMin from '@/assets/images/icoMinimize.png';
import icoShow from '@/assets/images/icoShow.png';
import icoClose from '@/assets/images/icoClose.png';

export default function PatientData() {
	const lsSelPt = process.env.SELECTED_PT;
	const [schPatients] = useContext(PatientSearchContext);
	const [newPtId, setNewPtId] = useState('');
	const [curPtId, setCurPtId] = useState('');
	const [patient, setPatient] = useState({});
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [inits, setInits] = useState('');
	const [photo, setPhoto] = useState('');
	const [dob, setDob] = useState('');
	const [age, setAge] = useState('');
	const [sex, setSex] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [emgCont, setEmgCont] = useState('');
	const [emgPhone, setEmgPhone] = useState('');
	const [emgRel, setEmgRel] = useState('');
	const [shwData, setShwData] = useState(true);
	const [close, setClose] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPatient = useCallback(async () => {
		try {
			//setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/patients/get/byid?id=${newPtId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 400) {
				toast.error(data.msg);
			}

			if (data.status === 200) {
				setPatient(data.user);
				setCurPtId(newPtId);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [newPtId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (schPatients.selected) {
			setNewPtId(schPatients.selected);
		} else {
			const ptId = getFromLocalStorage(lsSelPt);
			setNewPtId(ptId);
		}
	}, [schPatients, lsSelPt]);

	useEffect(() => {
		if (curPtId !== newPtId) {
			loadPatient();
			setShwData(true);
			setClose(false);
		}
	}, [curPtId, newPtId, loadPatient]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (patient.fname !== '' && patient.fname !== undefined) {
			setFname(patient.fname);
		} else {
			setFname('');
		}
		if (patient.lname !== '' && patient.lname !== undefined) {
			setLname(patient.lname);
		} else {
			setLname('');
		}
		if (patient.photo !== '' && patient.photo !== undefined) {
			setPhoto(patient.photo);
		} else {
			const str = patient.fname + ' ' + patient.lname;
			const matches = str.match(/\b(\w)/g);
			setInits(matches.join(''));
		}
		if (patient.dob !== '' && patient.dob !== undefined) {
			let ptDob = FormatDob(patient.dob);
			setDob(ptDob);
			setAge(CalculateAge(ptDob.toString()));
		} else {
			setDob('');
			setAge('');
		}
		if (patient.sex !== '' && patient.sex !== undefined) {
			setSex(patient.sex);
		} else {
			setSex('');
		}
		if (patient.mphone !== '' && patient.mphone !== undefined) {
			setPhone(FormatPhoneNumber(patient.mphone));
		} else {
			setPhone('');
		}
		if (patient.email !== '' && patient.email !== undefined) {
			setEmail(patient.email);
		} else {
			setEmail('');
		}
		if (patient.emergencycontact !== '' && patient.emergencycontact !== undefined) {
			setEmgCont(patient.emergencycontact);
		} else {
			setEmgCont('');
		}
		if (patient.emergencyphone !== '' && patient.emergencyphone !== undefined) {
			setEmgPhone(patient.emergencyphone);
		} else {
			setEmgPhone('');
		}
		if (patient.emergencyrelation !== '' && patient.emergencyrelation !== undefined) {
			setEmgRel(patient.emergencyrelation);
		} else {
			setEmgRel('');
		}
	}, [patient]);

	const handleShow = () => {
		const change = !shwData;
		setShwData(change);
	};

	const handleClose = () => {
		setClose(true);
	};

	return (
		<>
			{!close && curPtId === newPtId && (
				<div className='w-full p-2 border-2 border-txtbox rounded-xl'>
					<div className='w-full mb-3 flex flex-row items-center'>
						<div className='w-2/3'>
							<div className='text-lg font-semibold text-lgtred'>Patient Info</div>
						</div>
						<div className='w-1/6 flex justify-end'>
							{shwData ? (
								<Image className='cursor-pointer' src={icoMin} width={15} height={5} title='Minimize' alt='Min' onClick={() => handleShow()} />
							) : (
								<Image
									className='cursor-pointerv'
									src={icoShow}
									width={15}
									height={15}
									title='Maximize'
									alt='Max'
									onClick={() => handleShow()}
								/>
							)}
						</div>
						<div className='w-1/6 flex justify-end'>
							<Image className='sbIcoImg' src={icoClose} width={15} height={15} title='Close' alt='Close' onClick={() => handleClose()} />
						</div>
					</div>
					{shwData && (
						<>
							<div className='flex flex-row'>
								<div className='w-1/3'>
									<Link className='w-auto' href='/physicians/patient'>
										{photo ? (
											<Image className='cursor-pointer' src={photo} width={40} height={40} alt={inits} />
										) : (
											<div className='text-3xl font-bold text-txtblu cursor-pointer'>{inits}</div>
										)}
									</Link>
								</div>
								<div className='w-2/3'>
									<Link href='/physicians/patient'>
										<div className='text-sm text-txtblu hover:text-lgtred cursor-pointer'>
											{fname} {lname}
										</div>
									</Link>
									<div className='text-sm'>
										{dob}&nbsp;&nbsp;({age})
									</div>
									{sex === 'm' && <div className='text-sm'>Male</div>}
									{sex === 'f' && <div className='text-sm'>Female</div>}
									<div className='text-sm'>{phone}</div>
								</div>
							</div>
							<div className='mb-3 text-sm'>{email}</div>
							<div className='text-lg font-semibold text-lgtred'>Emergency Contact</div>
							<div className='text-sm'>{emgCont}</div>
							<div className='text-sm'>{emgPhone}</div>
							<div className='text-sm'>{emgRel}</div>
						</>
					)}
				</div>
			)}
		</>
	);
}
