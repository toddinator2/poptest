'use client';
import React, { useEffect, useState } from 'react';

export default function Checklist({ progress }) {
	const [profile, setProfile] = useState(false);
	const [docForm, setDocForm] = useState(false);
	const [empForm, setEmpForm] = useState(false);
	const [history, setHistory] = useState(false);

	useEffect(() => {
		if (progress.length !== 0) {
			for (let i = 0; i < progress.length; i++) {
				const name = progress[i];
				if (name === 'profile') {
					setProfile(true);
				}
				if (name === 'docform') {
					setDocForm(true);
				}
				if (name === 'empform') {
					setEmpForm(true);
				}
				if (name === 'history') {
					setHistory(true);
				}
			}
		}
	}, [progress]);

	return (
		<>
			<div className='row mt-3 mb-4'>
				<div className='col-10 offset-1'>
					<div className='chkListHdng'>Profile &amp; Contact Forms</div>
				</div>
				<div className='col-10 offset-1 ps-4'>
					<div className='row mt-2 mb-1 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={profile} readOnly />
						</div>
						<div className='col ps-1'>
							<div className='fs-6'>Subscriber Profile</div>
						</div>
					</div>
					<div className='row mb-1 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={docForm} readOnly />
						</div>
						<div className='col ps-1'>
							<div className='fs-6'>My Physician Form</div>
						</div>
					</div>
					<div className='row d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={empForm} readOnly />
						</div>
						<div className='col ps-1'>
							<div className='fs-6'>My Employer Form</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row mb-4'>
				<div className='col-10 offset-1'>
					<div className='chkListHdng'>Comprehensive Medical History</div>
				</div>
				<div className='col-10 offset-1 ps-4'>
					<div className='row mt-2 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={history} readOnly />
						</div>
						<div className='col ps-1'>
							<div className='fs-6'>Medical History</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
