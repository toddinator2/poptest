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
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={nun} onChange={(e) => handleChecks(e, 'nun')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>None of These</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={alc} onChange={(e) => handleChecks(e, 'alc')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Alcohol/Drug Abuse</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={anx} onChange={(e) => handleChecks(e, 'anx')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Anxiety</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={bip} onChange={(e) => handleChecks(e, 'bip')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Bipolar Disorder</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={blc} onChange={(e) => handleChecks(e, 'blc')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Blood Clots</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cbr} onChange={(e) => handleChecks(e, 'cbr')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Breast</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cco} onChange={(e) => handleChecks(e, 'cco')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Colon</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={clu} onChange={(e) => handleChecks(e, 'clu')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Lung</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cov} onChange={(e) => handleChecks(e, 'cov')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Ovarian</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cpr} onChange={(e) => handleChecks(e, 'cpr')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Prostate</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cst} onChange={(e) => handleChecks(e, 'cst')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Stomach</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={cot} onChange={(e) => handleChecks(e, 'cot')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Cancer - Other</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={dem} onChange={(e) => handleChecks(e, 'dem')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Dementia</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={dep} onChange={(e) => handleChecks(e, 'dep')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Depression</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={dia} onChange={(e) => handleChecks(e, 'dia')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Diabetes</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={hed} onChange={(e) => handleChecks(e, 'hed')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Heart Disease</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={hbp} onChange={(e) => handleChecks(e, 'hbp')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>High Blood Pressure</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={hch} onChange={(e) => handleChecks(e, 'hch')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>High Cholesterol</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={htr} onChange={(e) => handleChecks(e, 'htr')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>High Triglycerides</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={leu} onChange={(e) => handleChecks(e, 'leu')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Leukemia</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={lym} onChange={(e) => handleChecks(e, 'lym')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Lymphoma</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={str} onChange={(e) => handleChecks(e, 'str')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Stroke</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={thy} onChange={(e) => handleChecks(e, 'thy')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Thyroid Problems</div>
				</div>
			</div>
			<div className='row mb-2 d-flex align-items-center'>
				<div className='col-2 d-flex justify-content-end'>
					<input className='chkBox' type='checkbox' checked={oth} onChange={(e) => handleChecks(e, 'oth')} />
				</div>
				<div className='col ps-0'>
					<div className='fs-6'>Other</div>
				</div>
			</div>
			{oth && (
				<div className='row'>
					<div className='col-2'></div>
					<div className='col-9 mb-1'>
						<div className='frmLabel'>Please Specify:</div>
					</div>
					<div className='col-2'></div>
					<div className='col-9'>
						<Input type='text' value={other} setValue={setOther} />
					</div>
				</div>
			)}
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
