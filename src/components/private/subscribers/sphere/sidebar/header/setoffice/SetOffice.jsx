'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import Image from 'next/image';
import chgloc from '@/assets/images/icoChgLoc.png';

export default function SetOffice() {
	const [auth] = useContext(AuthContext);
	const [_misc, setMisc] = useContext(MiscContext);
	const [offices, setOffices] = useState([]);
	const [ofcId, setOfcId] = useState('');
	const [ofcName, setOfcName] = useState('');
	const [hideLoc, setHideLoc] = useState(true);

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
			setOfcId(offices[0].ofcObjId);
			setOfcName(offices[0].ofcName);
			setMisc({ defLocId: offices[0].locObjId, defLocName: offices[0].locName, editId: '', props: {} });
		}
	}, [offices, setMisc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleOffice = async (e) => {
		e.preventDefault();
		const value = e.target.value;
		setOfcId(value);

		//get location name
		for (let i = 0; i < offices.length; i++) {
			const ofc = offices[i];
			if (ofc.ofcObjId === value) {
				setMisc({ defLocId: ofc.locObjId, defLocName: ofc.locName, editId: '', props: {} });
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
				<div className='flex flex-row text-sm'>
					<div className='w-1/4'>Office:</div>
					<div className='w-2/3'>{ofcName}</div>
					<div className='w-1/6 flex justify-end'>
						<Image className='w-5 h-5 cursor-pointer' src={chgloc} title='Change Office' alt='ofc' onClick={() => handleHideLoc()} />
					</div>
				</div>
			)}
			{!hideLoc && (
				<>
					{offices.length > 1 && (
						<>
							<label className='frmLabel'>Select Office</label>
							<select className='inpBorder form-control' value={ofcId} onChange={(e) => handleOffice(e)}>
								<option value=''>Select One...</option>
								{offices.map((ofc) => (
									<option value={ofc.ofcObjId} key={ofc.ofcObjId}>
										{ofc.ofcName}
									</option>
								))}
							</select>
						</>
					)}
				</>
			)}
		</>
	);
}
