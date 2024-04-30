import React, { useCallback, useContext, useEffect, useState } from 'react';
import './PatientData.css';
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
				<div className='pdBox mt-2 px-3 py-2'>
					<div className='row mb-1 d-flex align-items-center'>
						<div className='col-9'>
							<div className='pdSecHdng'>Patient Info</div>
						</div>
						<div className='col-3'>
							<div className='row d-flex align-items-center'>
								<div className='col-6 d-flex justify-content-center'>
									{shwData ? (
										<Image
											className='sbIcoImg'
											src={icoMin}
											width={15}
											height={5}
											title='Minimize'
											alt='Min'
											onClick={() => handleShow()}
										/>
									) : (
										<Image
											className='sbIcoImg'
											src={icoShow}
											width={15}
											height={15}
											title='Maximize'
											alt='Max'
											onClick={() => handleShow()}
										/>
									)}
								</div>
								<div className='col-6 d-flex justify-content-center'>
									<Image className='sbIcoImg' src={icoClose} width={15} height={15} title='Close' alt='Close' onClick={() => handleClose()} />
								</div>
							</div>
						</div>
					</div>
					{shwData && (
						<div className='row'>
							<div className='col-12 col-xl-3 d-flex justify-content-center'>
								<Link className='sbLink' href='/physicians/patient'>
									{photo ? (
										<Image className='sbPhoto' src={photo} width={40} height={40} alt={fname} />
									) : (
										<div className='sbInits'>{inits}</div>
									)}
								</Link>
							</div>
							<div className='col-12 col-xl-9'>
								<div className='row'>
									<div className='col-12'>
										<div className='pdText blu'>
											{fname} {lname}
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-3'>
										<div className='pdText'>DOB:</div>
									</div>
									<div className='col-9'>
										<div className='pdText blu'>
											{dob}&nbsp;&nbsp;({age})
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-3'>
										<div className='pdText'>Sex:</div>
									</div>
									<div className='col-9'>
										<div className='pdText blu'>{sex}</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-3'>
										<div className='pdText'>Phone:</div>
									</div>
									<div className='col-9'>
										<div className='pdText blu'>{phone}</div>
									</div>
								</div>
								<div className='row mb-3'>
									<div className='col-3'>
										<div className='pdText'>Email:</div>
									</div>
									<div className='col-9'>
										<div className='pdText blu'>{email}</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-12'>
										<div className='pdText'>
											<strong>
												<u>Emergency Contact</u>
											</strong>
										</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-4'>
										<div className='pdText'>Name:</div>
									</div>
									<div className='col-8'>
										<div className='pdText blu'>{emgCont}</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-4'>
										<div className='pdText'>Phone:</div>
									</div>
									<div className='col-8'>
										<div className='pdText blu'>{emgPhone}</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-4'>
										<div className='pdText'>Relation:</div>
									</div>
									<div className='col-8'>
										<div className='pdText blu'>{emgRel}</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}
