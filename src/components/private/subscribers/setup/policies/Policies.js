import React, { useCallback, useEffect, useState } from 'react';
import './Policies.css';
import toast from 'react-hot-toast';
import Financial from './financial/Financial';
import Checklist from '../checklist/Checklist';

export default function Policies({ user }) {
	//Edit Divs
	const [shwFin, setShwFin] = useState(false);
	//Done Data
	const [doneFin, setDoneFin] = useState(false);

	const policyDone = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/setupdone`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ptId: user._id,
				}),
			});
			const data = await response.json();

			if (data.status === '200') {
				toast.success(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [user]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (user !== undefined) {
			if (Object.keys(user).length !== 0) {
				if (user.policyprogress.length === 0 || user.policyprogress === undefined) {
					setDoneFin(false);
				} else {
					for (let i = 0; i < user.policyprogress.length; i++) {
						const pol = user.policyprogress[i];
						if (pol === 'polfin') {
							setDoneFin(true);
						}
					}
				}
			}
		}
	}, [user]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHECK PROGRESS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (doneFin) {
			policyDone();
		}
	}, [doneFin]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE SHOW EDIT DIV FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleEditDiv = (value) => {
		if (value === 'polfin') {
			setShwFin(!shwFin);
		}
	};

	return (
		<>
			<div className='row mt-3 mt-xl-5 d-flex justify-content-center'>
				<div className='suDiv red order-last order-xl-first'>
					<div className='suHdrDiv red'>ACKNOWLEDGE &amp; CONSENT</div>
					{doneFin ? (
						<div className='row mt-3 mb-2 ps-3'>
							<div className='col-12'>
								<div className='histHdng'>Financial Responsibility</div>
							</div>
						</div>
					) : (
						<>
							<div className='row mt-3 mb-2 ps-3'>
								<div className='col-12'>
									<div className='histHdng wht' onClick={() => handleEditDiv('polfin')}>
										Financial Responsibility
									</div>
								</div>
							</div>
							{shwFin && (
								<div className='row mb-4'>
									<div className='col-10 offset-1'>
										<Financial userId={user._id} />
									</div>
								</div>
							)}
						</>
					)}
				</div>
				<div className='suDiv blu mx-4 mb-3 mb-xl-0 order-2'>
					<div className='suHdrDiv blu'>DETAILS</div>
					<div className='row mt-3 mb-4'>
						<div className='col-12'>
							<div className='suHdng'>Acknowledge &amp; Consent</div>
						</div>
					</div>
					<div className='px-2 px-xl-4'>
						<p>SN3X Subscribers can expect their Medical information to be safe, secure, and not for sale.</p>
						<p>
							Our commitment to America is to provide American Healthcare&apos;s Original Stakeholders with the most reliable, secure, and useful
							healthcare software system possible.
						</p>
					</div>
				</div>
				<div className='suDiv ppl mb-3 mb-xl-0 order-first order-xl-last'>
					<div className='suHdrDiv ppl'>SETUP CHECKLIST</div>
					<Checklist progress={user.setupprogress} />
				</div>
			</div>
		</>
	);
}
