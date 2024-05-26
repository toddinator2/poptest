import React from 'react';

export default function Input({ name, label, type, placeholder, id, required, value, readonly, max, setValue, funcCall }) {
	return (
		<>
			{label && setValue && (
				<div className='mb-1.5'>
					<label className='frmLabel' htmlFor={id}>
						{label}
					</label>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			)}
			{!label && setValue && (
				<div className='mb-1.5'>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			)}
			{label && funcCall && (
				<div className='mb-1.5'>
					<label className='frmLabel' htmlFor={id}>
						{label}
					</label>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => funcCall(e)}
					/>
				</div>
			)}
			{!label && funcCall && (
				<div className='mb-1.5'>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
						onChange={(e) => funcCall(e)}
					/>
				</div>
			)}
			{!setValue && !funcCall && (
				<div className='mb-1.5'>
					<label className='frmLabel' htmlFor={id}>
						{label}
					</label>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						value={value}
					/>
				</div>
			)}
		</>
	);
}
