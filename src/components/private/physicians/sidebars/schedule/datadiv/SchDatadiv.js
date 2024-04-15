'use client';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import NewPatient from '../../shared/newpatient/NewPatient';

export default function SchDatadiv({ dataType }) {
	const [_menu, setMenu] = useContext(MenuContext);
	const [shwData, setShwData] = useState('');

	useEffect(() => {
		setShwData(dataType);
	}, [dataType]);

	const closeDivs = () => {
		setShwData('');
		setMenu({ type: '', func: '', id: '' });
	};

	return (
		<div className='row'>
			<div className='col-12 d-flex justify-content-center'>{shwData === 'newpatient' && <NewPatient funcClose={closeDivs} />}</div>
		</div>
	);
}
