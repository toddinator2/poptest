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
			<label className='frmLabel'>Do you have, or ever had, any Common or Environmental Allergies</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={any} onChange={(e) => handleAny(e)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			{any === 'y' && (
				<div className='flex flex-col'>
					<label className='frmLabel'>
						<span className='text-lgtred'>Please fill out the form</span>
					</label>
					<label className='frmLabel'>Dust Mites</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={dmwhen} onChange={(e) => setDmWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(dmwhen === 'pre' || dmwhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Dust Mites Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={dmtype} onChange={(e) => setDmType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<label className='frmLabel'>Insect Venom (ant, bee, hornet, wasp, etc.)</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={ivwhen} onChange={(e) => setIvWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(ivwhen === 'pre' || ivwhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Insect Venom Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={ivtype} onChange={(e) => setIvType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<label className='frmLabel'>Latex</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={lxwhen} onChange={(e) => setLxWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(lxwhen === 'pre' || lxwhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Latex Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={lxtype} onChange={(e) => setLxType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<label className='frmLabel'>Mold</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={mdwhen} onChange={(e) => setMdWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(mdwhen === 'pre' || mdwhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Mold Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={mdtype} onChange={(e) => setMdType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<label className='frmLabel'>Pests (cockroach, mice, etc.)</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={pswhen} onChange={(e) => setPsWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(pswhen === 'pre' || pswhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Pests Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={pstype} onChange={(e) => setPsType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<label className='frmLabel'>Pet</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={ptwhen} onChange={(e) => setPtWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(ptwhen === 'pre' || ptwhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Pet Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={pttype} onChange={(e) => setPtType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<label className='frmLabel'>Pollen</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' value={plwhen} onChange={(e) => setPlWhen(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='no'>Never</option>
							<option value='pre'>Presently</option>
							<option value='pas'>In the Past</option>
						</select>
					</div>
					{(plwhen === 'pre' || plwhen === 'pas') && (
						<div className='ps-4'>
							<label className='frmLabel'>Pollen Allergy Severity</label>
							<div className='mb-2 ps-2'>
								<select className='inpBorder form-control' value={pltype} onChange={(e) => setPlType(e.target.value)}>
									<option value=''>Select One...</option>
									<option value='mi'>Mild</option>
									<option value='mo'>Moderate</option>
									<option value='sv'>Severe</option>
								</select>
							</div>
						</div>
					)}
					<div className='mb-2 flex flex-row items-center'>
						<div className='w-1/6 flex justify-end'>
							<input className='chkBox' type='checkbox' checked={oth} onChange={(e) => setOth(e.target.checked)} />
						</div>
						<div className='w-5/6 ps-2'>
							<div className='text-sm'>Other</div>
						</div>
					</div>
					{oth && (
						<div className='flex flex-row'>
							<div className='w-1/6 flex justify-end'>&nbsp;</div>
							<div className='w-5/6 mt-1 ps-2'>
								<Input type='text' placeholder='Please Specify' value={other} setValue={setOther} />
							</div>
						</div>
					)}
				</div>
			)}
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
