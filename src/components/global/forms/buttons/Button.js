import React from 'react';
import './Button.css';

export default function Button({ type, id, border, disabled, onClick, children }) {
	return (
		<button className='button' type={type} id={id} disabled={disabled} onClick={onClick} style={{ border: `2px solid #${border}` }}>
			{children}
		</button>
	);
}
