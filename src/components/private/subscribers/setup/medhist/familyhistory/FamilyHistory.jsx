import React, { useState } from 'react';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function FamilyHistory({ userId }) {
	const [alc, setAlc] = useState(false);
	const [anx, setAnx] = useState(false);
	const [bip, setBip] = useState(false);
	const [blc, setBlc] = useState(false);
	const [cbr, setCbr] = useState(false);
	const [cco, setCco] = useState(false);
	const [clu, setClu] = useState(false);
	const [cov, setCov] = useState(false);
	const [cpr, setCpr] = useState(false);
	const [cst, setCst] = useState(false);
	const [cot, setCot] = useState(false);
	const [dem, setDem] = useState(false);
	const [dep, setDep] = useState(false);
	const [dia, setDia] = useState(false);
	const [hed, setHed] = useState(false);
	const [hbp, setHbp] = useState(false);
	const [hch, setHch] = useState(false);
	const [htr, setHtr] = useState(false);
	const [leu, setLeu] = useState(false);
	const [lym, setLym] = useState(false);
	const [nun, setNun] = useState(false);
	const [str, setStr] = useState(false);
	const [thy, setThy] = useState(false);
	const [oth, setOth] = useState(false);
	const [other, setOther] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/familyhistory`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					alc,
					anx,
					bip,
					blc,
					cbr,
					cco,
					clu,
					cov,
					cpr,
					cst,
					cot,
					dem,
					dep,
					dia,
					hed,
					hbp,
					hch,
					htr,
					leu,
					lym,
					nun,
					str,
					thy,
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
	const handleChecks = (e, chk) => {
		if (chk === 'nun') {
			setNun(true);
			setAlc(false);
			setAnx(false);
			setBip(false);
			setBlc(false);
			setCbr(false);
			setCco(false);
			setClu(false);
			setCov(false);
			setCpr(false);
			setCst(false);
			setCot(false);
			setDem(false);
			setDep(false);
			setDia(false);
			setHed(false);
			setHbp(false);
			setHch(false);
			setHtr(false);
			setLeu(false);
			setLym(false);
			setStr(false);
			setThy(false);
			setOth(false);
			setOther('');
		}
		if (chk === 'alc') {
			setNun(false);
			setAlc(e.target.checked);
		}
		if (chk === 'anx') {
			setNun(false);
			setAnx(e.target.checked);
		}
		if (chk === 'bip') {
			setNun(false);
			setBip(e.target.checked);
		}
		if (chk === 'blc') {
			setNun(false);
			setBlc(e.target.checked);
		}
		if (chk === 'cbr') {
			setNun(false);
			setCbr(e.target.checked);
		}
		if (chk === 'cco') {
			setNun(false);
			setCco(e.target.checked);
		}
		if (chk === 'clu') {
			setNun(false);
			setClu(e.target.checked);
		}
		if (chk === 'cov') {
			setNun(false);
			setCov(e.target.checked);
		}
		if (chk === 'cpr') {
			setNun(false);
			setCpr(e.target.checked);
		}
		if (chk === 'cst') {
			setNun(false);
			setCst(e.target.checked);
		}
		if (chk === 'cot') {
			setNun(false);
			setCot(e.target.checked);
		}
		if (chk === 'dem') {
			setNun(false);
			setDem(e.target.checked);
		}
		if (chk === 'dep') {
			setNun(false);
			setDep(e.target.checked);
		}
		if (chk === 'dia') {
			setNun(false);
			setDia(e.target.checked);
		}
		if (chk === 'hed') {
			setNun(false);
			setHed(e.target.checked);
		}
		if (chk === 'hbp') {
			setNun(false);
			setHbp(e.target.checked);
		}
		if (chk === 'hch') {
			setNun(false);
			setHch(e.target.checked);
		}
		if (chk === 'htr') {
			setNun(false);
			setHtr(e.target.checked);
		}
		if (chk === 'leu') {
			setNun(false);
			setLeu(e.target.checked);
		}
		if (chk === 'lym') {
			setNun(false);
			setLym(e.target.checked);
		}
		if (chk === 'str') {
			setNun(false);
			setStr(e.target.checked);
		}
		if (chk === 'thy') {
			setNun(false);
			setThy(e.target.checked);
		}
		if (chk === 'oth') {
			setNun(false);
			setOth(e.target.checked);
			if (!e.target.checked) {
				setOther('');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={nun} onChange={(e) => handleChecks(e, 'nun')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>None of These</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={alc} onChange={(e) => handleChecks(e, 'alc')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Alcohol/Drug Abuse</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={anx} onChange={(e) => handleChecks(e, 'anx')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Anxiety</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={bip} onChange={(e) => handleChecks(e, 'bip')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Bipolar Disorder</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={blc} onChange={(e) => handleChecks(e, 'blc')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Blood Clots</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cbr} onChange={(e) => handleChecks(e, 'cbr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Breast</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cco} onChange={(e) => handleChecks(e, 'cco')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Colon</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={clu} onChange={(e) => handleChecks(e, 'clu')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Lung</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cov} onChange={(e) => handleChecks(e, 'cov')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Ovarian</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cpr} onChange={(e) => handleChecks(e, 'cpr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Prostate</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cst} onChange={(e) => handleChecks(e, 'cst')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Stomach</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cot} onChange={(e) => handleChecks(e, 'cot')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Other</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={dem} onChange={(e) => handleChecks(e, 'dem')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Dementia</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={dep} onChange={(e) => handleChecks(e, 'dep')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Depression</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={dia} onChange={(e) => handleChecks(e, 'dia')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Diabetes</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hed} onChange={(e) => handleChecks(e, 'hed')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Heart Disease</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hbp} onChange={(e) => handleChecks(e, 'hbp')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>High Blood Pressure</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hch} onChange={(e) => handleChecks(e, 'hch')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>High Cholesterol</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={htr} onChange={(e) => handleChecks(e, 'htr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>High Triglycerides</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={leu} onChange={(e) => handleChecks(e, 'leu')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Leukemia</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={lym} onChange={(e) => handleChecks(e, 'lym')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Lymphoma</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={str} onChange={(e) => handleChecks(e, 'str')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Stroke</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={thy} onChange={(e) => handleChecks(e, 'thy')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Thyroid Problems</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={oth} onChange={(e) => handleChecks(e, 'oth')} />
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
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
