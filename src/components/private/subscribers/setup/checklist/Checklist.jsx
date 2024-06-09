'use client';
import React, { useEffect, useState } from 'react';

export default function Checklist({ progress }) {
	const [profile, setProfile] = useState(false);
	const [docForm, setDocForm] = useState(false);
	const [empForm, setEmpForm] = useState(false);
	const [medHist, setMedHist] = useState(false);
	const [policy, setPolicy] = useState(false);

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
				if (name === 'medhist') {
					setMedHist(true);
				}
				if (name === 'policies') {
					setPolicy(true);
				}
			}
		}
	}, [progress]);

	return (
		<div className='w-5/6 mx-auto py-3 flex flex-col'>
			<div className='mb-1 text-lg text-lgtblu'>Profile &amp; Contact Forms</div>
			<div className=' mb-1 flex flex-row'>
				<div className='w-1/6 flex justify-end items-center'>
					<input className='chkBox' type='checkbox' checked={profile} readOnly />
				</div>
				<div className='ps-1'>
					<div className='text-sm'>Subscriber Profile</div>
				</div>
			</div>
			<div className='mb-1 flex flex-row'>
				<div className='w-1/6 flex justify-end items-center'>
					<input className='chkBox' type='checkbox' checked={docForm} readOnly />
				</div>
				<div className='ps-1'>
					<div className='text-sm'>My Physician Form</div>
				</div>
			</div>
			<div className='flex flex-row'>
				<div className='w-1/6 flex justify-end items-center'>
					<input className='chkBox' type='checkbox' checked={empForm} readOnly />
				</div>
				<div className='ps-1'>
					<div className='text-sm'>My Employer Form</div>
				</div>
			</div>
			<div className='mt-5 mb-1 text-lg text-lgtblu'>Comprehensive Medical History</div>
			<div className='flex flex-row'>
				<div className='w-1/6 flex justify-end items-center'>
					<input className='chkBox' type='checkbox' checked={medHist} readOnly />
				</div>
				<div className='ps-1'>
					<div className='text-sm'>Medical History</div>
				</div>
			</div>
			<div className='mt-5 mb-1 text-lg text-lgtblu'>Acknowledge &amp; Consent</div>
			<div className='flex flex-row'>
				<div className='w-1/6 flex justify-end items-center'>
					<input className='chkBox' type='checkbox' checked={policy} readOnly />
				</div>
				<div className='ps-1'>
					<div className='text-sm'>Acknowledge &amp; Consent</div>
				</div>
			</div>

			{/*}
		<>
			<div className='row mb-4'>
				<div className='col-10 offset-1'>
					<div className='chkListHdng'>Acknowledge &amp; Consent</div>
				</div>
				<div className='col-10 offset-1 ps-4'>
					<div className='row mb-1 d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={policy} readOnly />
						</div>
						<div className='col ps-1'>
							<div className='fs-6'>Acknowledge &amp; Consent</div>
						</div>
					</div>
				</div>
			</div>
		</>
	{*/}
		</div>
	);
}
