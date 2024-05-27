import React from 'react';
import './Button.css';

export default function Button({ type, id, disabled, on, onClick, children }) {
	return (
		<>
			{!on ? (
				<button
					className='button w-auto min-w-48 px-4 py-2 font-bold text-drkgry hover:text-drkwht border-4 border-drkgry hover:border-drkwht rounded-xl'
					type={type}
					id={id}
					disabled={disabled}
					onClick={onClick}
				>
					{children}
				</button>
			) : (
				<button className='button w-auto min-w-48 px-4 py-2 font-bold text-drkwht border-4 border-drkwht rounded-xl'>{children}</button>
			)}
		</>
	);
}
