import React from 'react';
import './Button.css';

export default function Button({ type: string, id: string, border: string, disabled: string, onClick: string, children: any }) {
	return (
		<button className='button' type={type} id={id} disabled={disabled} onClick={onClick} style={{ border: `2px solid #${border}` }}>
			{children}
		</button>
	);
}
