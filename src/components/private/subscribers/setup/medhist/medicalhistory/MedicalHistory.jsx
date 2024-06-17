import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function MedicalHistory({ userId }) {
	const [acr, setAcr] = useState(false);
	const [alc, setAlc] = useState(false);
	const [ane, setAne] = useState(false);
	const [anx, setAnx] = useState(false);
	const [aui, setAui] = useState(false);
	const [bid, setBid] = useState(false);
	const [blc, setBlc] = useState(false);
	const [cbr, setCbr] = useState(false);
	const [cco, setCco] = useState(false);
	const [cle, setCle] = useState(false);
	const [clu, setClu] = useState(false);
	const [cly, setCly] = useState(false);
	const [cov, setCov] = useState(false);
	const [cpr, setCpr] = useState(false);
	const [cst, setCst] = useState(false);
	const [cth, setCth] = useState(false);
	const [cel, setCel] = useState(false);
	const [chf, setChf] = useState(false);
	const [dep, setDep] = useState(false);
	const [dia, setDia] = useState(false);
	const [drg, setDrg] = useState(false);
	const [eat, setEat] = useState(false);
	const [gal, setGal] = useState(false);
	const [gou, setGou] = useState(false);
	const [hat, setHat] = useState(false);
	const [hbp, setHbp] = useState(false);
	const [hch, setHch] = useState(false);
	const [htr, setHtr] = useState(false);
	const [ind, setInd] = useState(false);
	const [irr, setIrr] = useState(false);
	const [kid, setKid] = useState(false);
	const [lte, setLte] = useState(false);
	const [nun, setNun] = useState(false);
	const [ost, setOst] = useState(false);
	const [pan, setPan] = useState(false);
	const [sap, setSap] = useState(false);
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
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/medicalhistory`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					acr,
					alc,
					ane,
					anx,
					aui,
					bid,
					blc,
					cbr,
					cco,
					cle,
					clu,
					cly,
					cov,
					cpr,
					cst,
					cth,
					cel,
					chf,
					dep,
					dia,
					drg,
					eat,
					gal,
					gou,
					hat,
					hbp,
					hch,
					htr,
					ind,
					irr,
					kid,
					lte,
					nun,
					ost,
					pan,
					sap,
					str,
					thy,
					oth,
					other,
					subObjId: userId,
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
			setAcr(false);
			setAlc(false);
			setAne(false);
			setAnx(false);
			setAui(false);
			setBid(false);
			setBlc(false);
			setCbr(false);
			setCco(false);
			setCle(false);
			setClu(false);
			setCly(false);
			setCov(false);
			setCpr(false);
			setCst(false);
			setCth(false);
			setCel(false);
			setChf(false);
			setDep(false);
			setDia(false);
			setDrg(false);
			setEat(false);
			setGal(false);
			setGou(false);
			setHat(false);
			setHbp(false);
			setHch(false);
			setHtr(false);
			setInd(false);
			setIrr(false);
			setKid(false);
			setLte(false);
			setOst(false);
			setPan(false);
			setSap(false);
			setStr(false);
			setThy(false);
			setOth(false);
			setOther('');
		}
		if (chk === 'acr') {
			setNun(false);
			setAcr(e.target.checked);
		}
		if (chk === 'alc') {
			setNun(false);
			setAlc(e.target.checked);
		}
		if (chk === 'ane') {
			setNun(false);
			setAne(e.target.checked);
		}
		if (chk === 'anx') {
			setNun(false);
			setAnx(e.target.checked);
		}
		if (chk === 'aui') {
			setNun(false);
			setAui(e.target.checked);
		}
		if (chk === 'bid') {
			setNun(false);
			setBid(e.target.checked);
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
		if (chk === 'cle') {
			setNun(false);
			setCle(e.target.checked);
		}
		if (chk === 'clu') {
			setNun(false);
			setClu(e.target.checked);
		}
		if (chk === 'cly') {
			setNun(false);
			setCly(e.target.checked);
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
		if (chk === 'cth') {
			setNun(false);
			setCth(e.target.checked);
		}
		if (chk === 'cel') {
			setNun(false);
			setCel(e.target.checked);
		}
		if (chk === 'chf') {
			setNun(false);
			setChf(e.target.checked);
		}
		if (chk === 'dep') {
			setNun(false);
			setDep(e.target.checked);
		}
		if (chk === 'dia') {
			setNun(false);
			setDia(e.target.checked);
		}
		if (chk === 'drg') {
			setNun(false);
			setDrg(e.target.checked);
		}
		if (chk === 'eat') {
			setNun(false);
			setEat(e.target.checked);
		}
		if (chk === 'gal') {
			setNun(false);
			setGal(e.target.checked);
		}
		if (chk === 'gou') {
			setNun(false);
			setGou(e.target.checked);
		}
		if (chk === 'hat') {
			setNun(false);
			setHat(e.target.checked);
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
		if (chk === 'ind') {
			setNun(false);
			setInd(e.target.checked);
		}
		if (chk === 'irr') {
			setNun(false);
			setIrr(e.target.checked);
		}
		if (chk === 'kid') {
			setNun(false);
			setKid(e.target.checked);
		}
		if (chk === 'lte') {
			setNun(false);
			setLte(e.target.checked);
		}
		if (chk === 'ost') {
			setNun(false);
			setOst(e.target.checked);
		}
		if (chk === 'pan') {
			setNun(false);
			setPan(e.target.checked);
		}
		if (chk === 'sap') {
			setNun(false);
			setSap(e.target.checked);
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
					<input className='chkBox' type='checkbox' checked={acr} onChange={(e) => handleChecks(e, 'acr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Acid Reflux</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={alc} onChange={(e) => handleChecks(e, 'alc')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Alcohol Abuse</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ane} onChange={(e) => handleChecks(e, 'ane')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Anemia</div>
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
					<input className='chkBox' type='checkbox' checked={aui} onChange={(e) => handleChecks(e, 'aui')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Autoimmune Disease</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={bid} onChange={(e) => handleChecks(e, 'bid')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Birth Defects</div>
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
					<input className='chkBox' type='checkbox' checked={cle} onChange={(e) => handleChecks(e, 'cle')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Leukemia</div>
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
					<input className='chkBox' type='checkbox' checked={cly} onChange={(e) => handleChecks(e, 'cly')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Lymphoma</div>
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
					<input className='chkBox' type='checkbox' checked={cth} onChange={(e) => handleChecks(e, 'cth')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cancer - Other</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cel} onChange={(e) => handleChecks(e, 'cel')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Celiac Disease</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={chf} onChange={(e) => handleChecks(e, 'chf')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Congestive Heart Failure</div>
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
					<input className='chkBox' type='checkbox' checked={drg} onChange={(e) => handleChecks(e, 'drg')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Drug Abuse</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={eat} onChange={(e) => handleChecks(e, 'eat')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Eating Disorder</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={gal} onChange={(e) => handleChecks(e, 'gal')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Gall Stones</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={gou} onChange={(e) => handleChecks(e, 'gou')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Gout</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hat} onChange={(e) => handleChecks(e, 'hat')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Heart Attack</div>
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
					<input className='chkBox' type='checkbox' checked={ind} onChange={(e) => handleChecks(e, 'ind')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Indigestion</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={irr} onChange={(e) => handleChecks(e, 'irr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Irregular Rhythm</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={kid} onChange={(e) => handleChecks(e, 'kid')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Kidney Stones</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={lte} onChange={(e) => handleChecks(e, 'lte')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Low Testosterone</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ost} onChange={(e) => handleChecks(e, 'ost')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Osteoarthritis</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={pan} onChange={(e) => handleChecks(e, 'pan')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Pancreatitis</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={sap} onChange={(e) => handleChecks(e, 'sap')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Sleep Apnea</div>
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
			<div className='flex flex-row items-center'>
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
