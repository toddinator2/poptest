import React from 'react';
import './Input.css';

export default function Input({ name, label, type, placeholder, id, required, value, readonly, max, setValue, funcCall }) {
	return (
		<>
			{label && setValue && (
				<div className='mb-2'>
					<label className='frmLabel' htmlFor={id}>
						{label}
					</label>
					<input
						className='form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						style={{ backgroundColor: 'transparent', border: '1px solid #c9c9c9', borderRadius: '7px' }}
					/>
				</div>
			)}
			{!label && setValue && (
				<div className='mb-2'>
					<input
						className='form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						style={{ backgroundColor: 'transparent', border: '1px solid #c9c9c9', borderRadius: '7px' }}
					/>
				</div>
			)}
			{label && funcCall && (
				<div className='mb-2'>
					<label className='frmLabel' htmlFor={id}>
						{label}
					</label>
					<input
						className='form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => funcCall(e)}
						style={{ backgroundColor: 'transparent', border: '1px solid #c9c9c9', borderRadius: '7px' }}
					/>
				</div>
			)}
			{!label && funcCall && (
				<div className='mb-2'>
					<input
						className='form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => funcCall(e)}
						style={{ backgroundColor: 'transparent', border: '1px solid #c9c9c9', borderRadius: '7px' }}
					/>
				</div>
			)}
			{!setValue && !funcCall && (
				<div className='mb-2'>
					<label className='frmLabel' htmlFor={id}>
						{label}
					</label>
					<input
						className='form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						style={{ backgroundColor: 'transparent', border: '1px solid #c9c9c9', borderRadius: '7px' }}
					/>
				</div>
			)}
		</>
	);
}
