import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Last30({ userId }) {
	const [abd, setAbd] = useState(false);
	const [acn, setAcn] = useState(false);
	const [anx, setAnx] = useState(false);
	const [bac, setBac] = useState(false);
	const [blo, setBlo] = useState(false);
	const [che, setChe] = useState(false);
	const [col, setCol] = useState(false);
	const [con, setCon] = useState(false);
	const [cou, setCou] = useState(false);
	const [dep, setDep] = useState(false);
	const [dbl, setDbl] = useState(false);
	const [dia, setDia] = useState(false);
	const [diz, setDiz] = useState(false);
	const [esw, setEsw] = useState(false);
	const [fai, setFai] = useState(false);
	const [fat, setFat] = useState(false);
	const [gas, setGas] = useState(false);
	const [hed, setHed] = useState(false);
	const [her, setHer] = useState(false);
	const [hei, setHei] = useState(false);
	const [ins, setIns] = useState(false);
	const [joi, setJoi] = useState(false);
	const [luc, setLuc] = useState(false);
	const [mem, setMem] = useState(false);
	const [moo, setMoo] = useState(false);
	const [mua, setMua] = useState(false);
	const [nau, setNau] = useState(false);
	const [ner, setNer] = useState(false);
	const [nun, setNun] = useState(false);
	const [nur, setNur] = useState(false);
	const [pal, setPal] = useState(false);
	const [sob, setSob] = useState(false);
	const [skr, setSkr] = useState(false);
	const [slu, setSlu] = useState(false);
	const [sno, setSno] = useState(false);
	const [swa, setSwa] = useState(false);
	const [urf, setUrf] = useState(false);
	const [vom, setVom] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/last30`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					abd,
					acn,
					anx,
					bac,
					blo,
					che,
					col,
					con,
					cou,
					dep,
					dbl,
					dia,
					diz,
					esw,
					fai,
					fat,
					gas,
					hed,
					her,
					hei,
					ins,
					joi,
					luc,
					mem,
					moo,
					mua,
					nau,
					ner,
					nun,
					nur,
					pal,
					sob,
					skr,
					slu,
					sno,
					swa,
					urf,
					vom,
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
			setAbd(false);
			setAcn(false);
			setAnx(false);
			setBac(false);
			setBlo(false);
			setChe(false);
			setCol(false);
			setCon(false);
			setCou(false);
			setDep(false);
			setDbl(false);
			setDia(false);
			setDiz(false);
			setEsw(false);
			setFai(false);
			setFat(false);
			setGas(false);
			setHed(false);
			setHer(false);
			setHei(false);
			setIns(false);
			setJoi(false);
			setLuc(false);
			setMem(false);
			setMoo(false);
			setMua(false);
			setNau(false);
			setNer(false);
			setNur(false);
			setPal(false);
			setSob(false);
			setSkr(false);
			setSlu(false);
			setSno(false);
			setSwa(false);
			setUrf(false);
			setVom(false);
		}
		if (chk === 'abd') {
			setNun(false);
			setAbd(e.target.checked);
		}
		if (chk === 'acn') {
			setNun(false);
			setAcn(e.target.checked);
		}
		if (chk === 'anx') {
			setNun(false);
			setAnx(e.target.checked);
		}
		if (chk === 'bac') {
			setNun(false);
			setBac(e.target.checked);
		}
		if (chk === 'blo') {
			setNun(false);
			setBlo(e.target.checked);
		}
		if (chk === 'che') {
			setNun(false);
			setChe(e.target.checked);
		}
		if (chk === 'col') {
			setNun(false);
			setCol(e.target.checked);
		}
		if (chk === 'con') {
			setNun(false);
			setCon(e.target.checked);
		}
		if (chk === 'cou') {
			setNun(false);
			setCou(e.target.checked);
		}
		if (chk === 'dep') {
			setNun(false);
			setDep(e.target.checked);
		}
		if (chk === 'dbl') {
			setNun(false);
			setDbl(e.target.checked);
		}
		if (chk === 'dia') {
			setNun(false);
			setDia(e.target.checked);
		}
		if (chk === 'diz') {
			setNun(false);
			setDiz(e.target.checked);
		}
		if (chk === 'esw') {
			setNun(false);
			setEsw(e.target.checked);
		}
		if (chk === 'fai') {
			setNun(false);
			setFai(e.target.checked);
		}
		if (chk === 'fat') {
			setNun(false);
			setFat(e.target.checked);
		}
		if (chk === 'gas') {
			setNun(false);
			setGas(e.target.checked);
		}
		if (chk === 'hed') {
			setNun(false);
			setHed(e.target.checked);
		}
		if (chk === 'her') {
			setNun(false);
			setHer(e.target.checked);
		}
		if (chk === 'hei') {
			setNun(false);
			setHei(e.target.checked);
		}
		if (chk === 'ins') {
			setNun(false);
			setIns(e.target.checked);
		}
		if (chk === 'joi') {
			setNun(false);
			setJoi(e.target.checked);
		}
		if (chk === 'luc') {
			setNun(false);
			setLuc(e.target.checked);
		}
		if (chk === 'mem') {
			setNun(false);
			setMem(e.target.checked);
		}
		if (chk === 'moo') {
			setNun(false);
			setMoo(e.target.checked);
		}
		if (chk === 'mua') {
			setNun(false);
			setMua(e.target.checked);
		}
		if (chk === 'nau') {
			setNun(false);
			setNau(e.target.checked);
		}
		if (chk === 'ner') {
			setNun(false);
			setNer(e.target.checked);
		}
		if (chk === 'nur') {
			setNun(false);
			setNur(e.target.checked);
		}
		if (chk === 'pal') {
			setNun(false);
			setPal(e.target.checked);
		}
		if (chk === 'sob') {
			setNun(false);
			setSob(e.target.checked);
		}
		if (chk === 'skr') {
			setNun(false);
			setSkr(e.target.checked);
		}
		if (chk === 'slu') {
			setNun(false);
			setSlu(e.target.checked);
		}
		if (chk === 'sno') {
			setNun(false);
			setSno(e.target.checked);
		}
		if (chk === 'swa') {
			setNun(false);
			setSwa(e.target.checked);
		}
		if (chk === 'urf') {
			setNun(false);
			setUrf(e.target.checked);
		}
		if (chk === 'vom') {
			setNun(false);
			setVom(e.target.checked);
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
					<input className='chkBox' type='checkbox' checked={abd} onChange={(e) => handleChecks(e, 'abd')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Abdominal Pain</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={acn} onChange={(e) => handleChecks(e, 'acn')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Acne</div>
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
					<input className='chkBox' type='checkbox' checked={bac} onChange={(e) => handleChecks(e, 'bac')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Back Pain</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={blo} onChange={(e) => handleChecks(e, 'blo')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Bloating</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={che} onChange={(e) => handleChecks(e, 'che')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Chest Pain</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={col} onChange={(e) => handleChecks(e, 'col')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cold Intolerance</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={con} onChange={(e) => handleChecks(e, 'con')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Constipation</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cou} onChange={(e) => handleChecks(e, 'cou')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cough</div>
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
					<input className='chkBox' type='checkbox' checked={dbl} onChange={(e) => handleChecks(e, 'dbl')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Difficulty Breathing When Lying Flat</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={dia} onChange={(e) => handleChecks(e, 'dia')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Diarrhea</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={diz} onChange={(e) => handleChecks(e, 'diz')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Dizziness</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={esw} onChange={(e) => handleChecks(e, 'esw')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Excessive Sweating</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={fai} onChange={(e) => handleChecks(e, 'fai')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Fainting</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={fat} onChange={(e) => handleChecks(e, 'fat')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Fatigue/Tiredness</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={gas} onChange={(e) => handleChecks(e, 'gas')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Gas</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hed} onChange={(e) => handleChecks(e, 'hed')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Headaches</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={her} onChange={(e) => handleChecks(e, 'her')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Heartburn</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hei} onChange={(e) => handleChecks(e, 'hei')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Heat Intolerance</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ins} onChange={(e) => handleChecks(e, 'ins')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Insomnia</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={joi} onChange={(e) => handleChecks(e, 'joi')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Joint Pain</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={luc} onChange={(e) => handleChecks(e, 'luc')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Loss of Urine Control</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={mem} onChange={(e) => handleChecks(e, 'mem')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Memory Loss</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={moo} onChange={(e) => handleChecks(e, 'moo')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Mood Changes</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={mua} onChange={(e) => handleChecks(e, 'mua')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Muscle Aches/Pain</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={nau} onChange={(e) => handleChecks(e, 'nau')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Nausea</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ner} onChange={(e) => handleChecks(e, 'ner')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Nervousness</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={nur} onChange={(e) => handleChecks(e, 'nur')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Nighttime Urination</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={pal} onChange={(e) => handleChecks(e, 'pal')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Palpitations</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={sob} onChange={(e) => handleChecks(e, 'sob')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Shortness of Breath</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={skr} onChange={(e) => handleChecks(e, 'skr')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Skin Rash</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={slu} onChange={(e) => handleChecks(e, 'slu')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Slow Urine</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={sno} onChange={(e) => handleChecks(e, 'sno')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Snoring</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={swa} onChange={(e) => handleChecks(e, 'swa')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Swelling Ankles</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={urf} onChange={(e) => handleChecks(e, 'urf')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Urinary Frequency</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={vom} onChange={(e) => handleChecks(e, 'vom')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Vomiting</div>
				</div>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
