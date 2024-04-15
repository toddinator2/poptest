import React, { useEffect, useState } from 'react';
import './PatientData.css';
import { CalculateAge, FormatDob, FormatPhoneNumber } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';

export default function PatientData({ patient }) {
	let newPtId = '';
	if (patient !== undefined) {
		if (Object.keys(patient).length !== 0) {
			newPtId = patient._id;
		}
	}
	const [curPtId, setCurPtId] = useState('');
	const [inits, setInits] = useState('');
	const [photo, setPhoto] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [dob, setDob] = useState('');
	const [age, setAge] = useState('');
	const [sex, setSex] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [emgCont, setEmgCont] = useState('');
	const [emgPhone, setEmgPhone] = useState('');
	const [emgRel, setEmgRel] = useState('');
	const [sideMenuSettings, setSideMenuSettings] = useState('ptData');

	useEffect(() => {
		if (newPtId !== curPtId) {
			if (Object.keys(patient).length !== 0) {
				setFname(patient.fname);
				setLname(patient.lname);
				let ptDob = FormatDob(patient.dob);
				setDob(ptDob);
				setAge(CalculateAge(ptDob.toString()));
				setSex(patient.sex);
				if (patient.photo) {
					setPhoto(patient.photo);
				} else {
					const finit = patient.fname.slice(0, 1);
					const linit = patient.lname.slice(0, 1);
					setInits((finit + linit).toUpperCase());
				}
				setPhone(FormatPhoneNumber(patient.mphone));
				setEmail(patient.email);
				setEmgCont(patient.emergencycontact);
				setEmgPhone(patient.emergencyphone);
				setEmgRel(patient.emergencyrelation);
			}
			setCurPtId(newPtId);
		}
	}, [newPtId, curPtId, patient]);

	const openSideMenu = (openMenu) => {
		if (openMenu === 'ptData') {
			setSideMenuSettings('ptData');
			document.getElementById('divPtInfo').style.display = 'block';
		}
	};

	const closeSideMenu = (closeMenu) => {
		if (closeMenu === 'ptData') {
			setSideMenuSettings('');
			document.getElementById('divPtInfo').style.display = 'none';
		}
	};

	return (
		<div className='pdBox px-3 py-2'>
			<div className='row mb-1 d-flex align-items-center'>
				<div className='col-10'>
					<div className='pdSecHdng'>Current Patient Info</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					{sideMenuSettings === 'ptData' ? (
						<Image className='pdSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => closeSideMenu('ptData')} />
					) : (
						<Image className='pdSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => openSideMenu('ptData')} />
					)}
				</div>
			</div>
			<div id='divPtInfo'>
				<div className='row'>
					<div className='col-12 col-xl-3 d-flex justify-content-center'>
						{photo ? <Image className='pdPhoto' src={photo} alt={fname} /> : <div className='pdInits'>{inits}</div>}
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
			</div>
		</div>
	);
}
