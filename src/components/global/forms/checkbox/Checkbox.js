import React from 'react';
import './Checkbox.css';

export default function CheckBox({ check, funcCall }) {
	return (
		<>
			{check && <input className='chkBox' type='checkbox' checked onChange={(e) => funcCall(e)} />}
			{!check && <input className='chkBox' type='checkbox' onChange={(e) => funcCall(e)} />}
		</>
	);
}
