import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function AlgEnv({ userId }) {
	const [any, setAny] = useState('');
	const [dmwhen, setDmWhen] = useState('');
	const [dmtype, setDmType] = useState('');
	const [ivwhen, setIvWhen] = useState('');
	const [ivtype, setIvType] = useState('');
	const [lxwhen, setLxWhen] = useState('');
	const [lxtype, setLxType] = useState('');
	const [mdwhen, setMdWhen] = useState('');
	const [mdtype, setMdType] = useState('');
	const [pswhen, setPsWhen] = useState('');
	const [pstype, setPsType] = useState('');
	const [ptwhen, setPtWhen] = useState('');
	const [pttype, setPtType] = useState('');
	const [plwhen, setPlWhen] = useState('');
	const [pltype, setPlType] = useState('');
	const [oth, setOth] = useState(false);
	const [other, setOther] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/allergies/environment`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					any,
					dmwhen,
					dmtype,
					ivwhen,
					ivtype,
					lxwhen,
					lxtype,
					mdwhen,
					mdtype,
					pswhen,
					pstype,
					ptwhen,
					pttype,
					plwhen,
					pltype,
					oth,
					other,
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
			setDmWhen('');
			setDmType('');
			setIvWhen('');
			setIvType('');
			setLxWhen('');
			setLxType('');
			setMdWhen('');
			setMdType('');
			setPsWhen('');
			setPsType('');
			setPtWhen('');
			setPtType('');
			setPlWhen('');
			setPlType('');
			setOth(false);
			setOther('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-2'>
				<div className='col-12'>
					<div className='frmLabel'>Do you have, or ever had, any Common or Environmental Allergies?</div>
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
							<div className='frmLabel'>Dust Mites</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={dmwhen} onChange={(e) => setDmWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(dmwhen === 'pre' || dmwhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Dust Mites Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={dmtype} onChange={(e) => setDmType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Insect Venom (ant, bee, hornet, wasp, etc.)</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={ivwhen} onChange={(e) => setIvWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(ivwhen === 'pre' || ivwhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Insect Venom Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={ivtype} onChange={(e) => setIvType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Latex</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={lxwhen} onChange={(e) => setLxWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(lxwhen === 'pre' || lxwhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Latex Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={lxtype} onChange={(e) => setLxType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Mold</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={mdwhen} onChange={(e) => setMdWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(mdwhen === 'pre' || mdwhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Mold Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={mdtype} onChange={(e) => setMdType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Pests (cockroach, mice, etc.)</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={pswhen} onChange={(e) => setPsWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(pswhen === 'pre' || pswhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Pests Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={pstype} onChange={(e) => setPsType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Pet</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={ptwhen} onChange={(e) => setPtWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(ptwhen === 'pre' || ptwhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Pet Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={pttype} onChange={(e) => setPtType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Pollen</div>
						</div>
						<div className='col-12'>
							<select className='inpBorder form-control' value={plwhen} onChange={(e) => setPlWhen(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='no'>Never</option>
								<option value='pre'>Presently</option>
								<option value='pas'>In the Past</option>
							</select>
						</div>
					</div>
					{(plwhen === 'pre' || plwhen === 'pas') && (
						<div className='row mb-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Pollen Allergy Severity</div>
							</div>
							<div className='col-12'>
								<select className='inpBorder form-control' value={pltype} onChange={(e) => setPlType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='row d-flex align-items-center'>
						<div className='col-2 d-flex justify-content-end'>
							<input className='chkBox' type='checkbox' checked={oth} onChange={(e) => setOth(e.target.checked)} />
						</div>
						<div className='col ps-0'>
							<div className='fs-6'>Other</div>
						</div>
					</div>
					{oth && (
						<div className='row'>
							<div className='col-2'></div>
							<div className='col-9'>
								<div className='frmLabel'>Please Specify:</div>
							</div>
							<div className='col-2'></div>
							<div className='col-9'>
								<Input type='text' value={other} setValue={setOther} />
							</div>
						</div>
					)}
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
