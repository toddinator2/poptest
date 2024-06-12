import React from 'react';

export default function Input({ name, label, type, placeholder, id, required, autocomplete, value, readonly, max, setValue, funcCall }) {
	return (
		<>
			{label && setValue && (
				<div className='mb-2'>
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
						autoComplete={autocomplete}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			)}
			{!label && setValue && (
				<div className='mb-2'>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						autoComplete={autocomplete}
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</div>
			)}
			{label && funcCall && (
				<div className='mb-2'>
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
						autoComplete={autocomplete}
						value={value}
						onChange={(e) => funcCall(e)}
					/>
				</div>
			)}
			{!label && funcCall && (
				<div className='mb-2'>
					<input
						className='inpBorder form-control'
						type={type}
						placeholder={placeholder}
						name={name}
						id={id}
						readOnly={readonly}
						maxLength={max}
						required={required}
						autoComplete={autocomplete}
						value={value}
						onChange={(e) => funcCall(e)}
					/>
				</div>
			)}
			{!setValue && !funcCall && (
				<div className='mb-2'>
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
						autoComplete={autocomplete}
						value={value}
					/>
				</div>
			)}
		</>
	);
}
