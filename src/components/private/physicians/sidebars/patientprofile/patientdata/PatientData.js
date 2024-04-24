import React, { useEffect, useState } from 'react';
import './PatientData.css';
import { CalculateAge, FormatDob, FormatPhoneNumber } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import sidemenuopen from '@/assets/images/icoSidebarOpen.png';
import sidemenuclose from '@/assets/images/icoSidebarClose.png';

export default function PatientData({ props }) {
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (props.fname) {
			setFname(props.fname);
		}
		if (props.lname) {
			setLname(props.lname);
		}
		if (!props.photo) {
			const str = props.fname + ' ' + props.lname;
			const matches = str.match(/\b(\w)/g);
			setInits(matches.join(''));
		} else {
			setPhoto(props.photo);
		}
		if (props.dob) {
			let ptDob = FormatDob(props.dob);
			setDob(ptDob);
			setAge(CalculateAge(ptDob.toString()));
		}
		if (props.sex) {
			setSex(props.sex);
		}
		if (props.phone) {
			setPhone(FormatPhoneNumber(props.phone));
		}
		if (props.email) {
			setEmail(props.email);
		}
		if (props.emgName) {
			setEmgCont(props.emgName);
		}
		if (props.emgPhone) {
			setEmgPhone(props.emgPhone);
		}
		if (props.emgRelation) {
			setEmgRel(props.emgRelation);
		}
	}, [props]);

	const handleshow = () => {
		const change = !shwData;
		setShwData(change);
		if (change) {
			document.getElementById('divPtInfo').style.display = 'block';
		} else {
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
					{shwData ? (
						<Image className='pdSideMenuIcon' src={sidemenuclose} title='Close Menu' alt='Close' onClick={() => handleshow()} />
					) : (
						<Image className='pdSideMenuIcon' src={sidemenuopen} title='Open Menu' alt='Open' onClick={() => handleshow()} />
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
