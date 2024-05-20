'use client';
import React, { useContext, useEffect, useState } from 'react';
import './SetOffice.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import Image from 'next/image';
import chgloc from '@/assets/images/icoChgLoc.png';

export default function SetOffice() {
	const [auth] = useContext(AuthContext);
	const [_misc, setMisc] = useContext(MiscContext);
	const [locId, setLocId] = useState('');
	const [locName, setLocName] = useState('');
	const [hideLoc, setHideLoc] = useState(true);
	const [offices, setOffices] = useState([]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (auth.user.offices.length !== 0 && offices.length === 0) {
			setOffices(auth.user.offices);
		}
	}, [auth, offices]);

	useEffect(() => {
		if (offices.length !== 0) {
			setLocId(offices[0].id);
			setLocName(offices[0].name);
			setMisc({ defLocId: offices[0].id, defLocName: offices[0].name, editId: '' });
		}
	}, [offices]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleOffice = async (e) => {
		e.preventDefault();
		const value = e.target.value;
		setLocId(value);

		//get location name
		for (let i = 0; i < offices.length; i++) {
			const ofc = offices[i];
			if (ofc.id === value) {
				setLocName(ofc.name);
				setMisc({ defLocId: ofc.id, defLocName: ofc.name, editId: '' });
				break;
			}
		}
		handleHideLoc();
	};

	const handleHideLoc = () => {
		setHideLoc(!hideLoc);
	};

	return (
		<>
			{offices.length >= 2 && (
				<div className='row mb-2 d-flex align-items-center'>
					<div className='col-4'>Office:</div>
					<div className='col-6 d-flex justify-content-end'>
						<div className='sphLocText'>{locName}</div>
					</div>
					<div className='col-2 d-flex justify-content-end'>
						<Image className='icoChgLoc' src={chgloc} title='Change Office' alt='ofc' onClick={() => handleHideLoc()} />
					</div>
				</div>
			)}
			{!hideLoc && (
				<>
					{offices.length > 1 && (
						<div className='col-10 mb-5 offset-1'>
							<label className='frmLabel'>Select Office</label>
							<select className='inpBorder form-control' value={locId} onChange={(e) => handleOffice(e)}>
								<option value=''>Select One...</option>
								{offices.map((ofc) => (
									<option value={ofc.id} key={ofc.id}>
										{ofc.name}
									</option>
								))}
							</select>
						</div>
					)}
				</>
			)}
		</>
	);
}
