import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function AlgSymptoms({ userId }) {
	const [any, setAny] = useState('');
	const [cou, setCou] = useState('');
	const [dbr, setDbr] = useState('');
	const [ecz, setEcz] = useState('');
	const [ein, setEin] = useState('');
	const [eit, setEit] = useState('');
	const [eyg, setEyg] = useState('');
	const [eyi, setEyi] = useState('');
	const [eyw, setEyw] = useState('');
	const [fre, setFre] = useState('');
	const [hed, setHed] = useState('');
	const [hiv, setHiv] = useState('');
	const [nit, setNit] = useState('');
	const [nru, setNru] = useState('');
	const [nst, setNst] = useState('');
	const [sin, setSin] = useState('');
	const [spr, setSpr] = useState('');
	const [spa, setSpa] = useState('');
	const [snz, setSnz] = useState('');
	const [whz, setWhz] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/allergies/symptoms`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					any,
					cou,
					dbr,
					ecz,
					ein,
					eit,
					eyg,
					eyi,
					eyw,
					fre,
					hed,
					hiv,
					nit,
					nru,
					nst,
					sin,
					spr,
					spa,
					snz,
					whz,
					patientObjId: userId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleAny = (e) => {
		const value = e.target.value;
		setAny(value);
		if (value === 'n') {
			setCou('');
			setDbr('');
			setEcz('');
			setEin('');
			setEyg('');
			setEyi('');
			setEyw('');
			setFre('');
			setHed('');
			setHiv('');
			setNit('');
			setNru('');
			setNst('');
			setSin('');
			setSpr('');
			setSpa('');
			setSnz('');
			setWhz('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>Do you have any current allergy symptoms?</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={any} onChange={(e) => handleAny(e)}>
						<option value=''>Select One...</option>
						<option value='y'>Yes</option>
						<option value='n'>No</option>
					</select>
				</div>
			</div>
			{any === 'y' && (
				<>
					<div className='row mb-2'>
						<div className='col-12'>
							<div className='frmLabel'>Please fill out the form:</div>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Cough</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={cou} onChange={(e) => setCou(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Difficulty Breathing</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={dbr} onChange={(e) => setDbr(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Eczema</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={ecz} onChange={(e) => setEcz(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Ears - Infection</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={ein} onChange={(e) => setEin(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Ears - Itchy</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={eit} onChange={(e) => setEit(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Eyes - Gritty</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={eyg} onChange={(e) => setEyg(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Eyes - Itchy</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={eyi} onChange={(e) => setEyi(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Eyes - Watery</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={eyw} onChange={(e) => setEyw(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Frequent Colds or Sore Throat</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={fre} onChange={(e) => setFre(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Headaches</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={hed} onChange={(e) => setHed(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Hives</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={hiv} onChange={(e) => setHiv(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Nasal - Itchy Nose</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={nit} onChange={(e) => setNit(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Nasal - Runny Nose</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={nru} onChange={(e) => setNru(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Nasal - Stuffy Nose</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={nst} onChange={(e) => setNst(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Sinus - Infection</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={sin} onChange={(e) => setSin(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Sinus - Pressure</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={spr} onChange={(e) => setSpr(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Sinus - Pain</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={spa} onChange={(e) => setSpa(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Sneezing</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={snz} onChange={(e) => setSnz(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Wheezing</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={whz} onChange={(e) => setWhz(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>None</option>
								<option value='mi'>Mild</option>
								<option value='mo'>Moderate</option>
								<option value='sv'>Severe</option>
							</select>
						</div>
					</div>
				</>
			)}
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
