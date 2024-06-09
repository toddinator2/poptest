import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Immunizations({ userId }) {
	const [immCov, setImmCov] = useState(false);
	const [immCovDate, setImmCovDate] = useState('');
	const [immDtt, setImmDtt] = useState(false);
	const [immDttDate, setImmDttDate] = useState('');
	const [immFlu, setImmFlu] = useState(false);
	const [immFluDate, setImmFluDate] = useState('');
	const [immHpb, setImmHpb] = useState(false);
	const [immHpbDate, setImmHpbDate] = useState('');
	const [immNun, setImmNun] = useState(false);
	const [immPne, setImmPne] = useState(false);
	const [immPneDate, setImmPneDate] = useState('');
	const [immPre, setImmPre] = useState(false);
	const [immPreDate, setImmPreDate] = useState('');
	const [immShi, setImmShi] = useState(false);
	const [immShiDate, setImmShiDate] = useState('');
	const [immTdp, setImmTdp] = useState(false);
	const [immTdpDate, setImmTdpDate] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/immunizations`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					cov: immCov,
					covdate: immCovDate,
					dtt: immDtt,
					dttdate: immDttDate,
					flu: immFlu,
					fludate: immFluDate,
					hpb: immHpb,
					hpbdate: immHpbDate,
					nun: immNun,
					pne: immPne,
					pnedate: immPneDate,
					pre: immPre,
					predate: immPreDate,
					shi: immShi,
					shidate: immShiDate,
					tdp: immTdp,
					tdpdate: immTdpDate,
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
			setImmNun(true);
			setImmCov(false);
			setImmCovDate('');
			setImmDtt(false);
			setImmDttDate('');
			setImmFlu(false);
			setImmFluDate('');
			setImmHpb(false);
			setImmHpbDate('');
			setImmPne(false);
			setImmPneDate('');
			setImmPre(false);
			setImmPreDate('');
			setImmShi(false);
			setImmShiDate('');
			setImmTdp(false);
			setImmTdpDate('');
		}
		if (chk === 'cov') {
			setImmNun(false);
			setImmCov(e.target.checked);
			if (!e.target.checked) {
				setImmCovDate('');
			}
		}
		if (chk === 'dtt') {
			setImmNun(false);
			setImmDtt(e.target.checked);
			if (!e.target.checked) {
				setImmDttDate('');
			}
		}
		if (chk === 'flu') {
			setImmNun(false);
			setImmFlu(e.target.checked);
			if (!e.target.checked) {
				setImmFluDate('');
			}
		}
		if (chk === 'hpb') {
			setImmNun(false);
			setImmHpb(e.target.checked);
			if (!e.target.checked) {
				setImmHpbDate('');
			}
		}
		if (chk === 'pne') {
			setImmNun(false);
			setImmPne(e.target.checked);
			if (!e.target.checked) {
				setImmPneDate('');
			}
		}
		if (chk === 'pre') {
			setImmNun(false);
			setImmPre(e.target.checked);
			if (!e.target.checked) {
				setImmPreDate('');
			}
		}
		if (chk === 'shi') {
			setImmNun(false);
			setImmShi(e.target.checked);
			if (!e.target.checked) {
				setImmShiDate('');
			}
		}
		if (chk === 'tdp') {
			setImmNun(false);
			setImmTdp(e.target.checked);
			if (!e.target.checked) {
				setImmTdpDate('');
			}
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immNun} onChange={(e) => handleChecks(e, 'nun')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>None of These</div>
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immCov} onChange={(e) => handleChecks(e, 'cov')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Covid-19</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immCov && <input className='inpMonth pe-2' type='month' value={immCovDate} onChange={(e) => setImmCovDate(e.target.value)} />}
					{!immCov && <input className='inpMonth pe-2' type='month' readOnly value={immCovDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immDtt} onChange={(e) => handleChecks(e, 'dtt')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>dT or Tetanus</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immDtt && <input className='inpMonth' type='month' value={immDttDate} onChange={(e) => setImmDttDate(e.target.value)} />}
					{!immDtt && <input className='inpMonth' type='month' readOnly value={immDttDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immFlu} onChange={(e) => handleChecks(e, 'flu')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Flu</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immFlu && <input className='inpMonth' type='month' value={immFluDate} onChange={(e) => setImmFluDate(e.target.value)} />}
					{!immFlu && <input className='inpMonth' type='month' readOnly value={immFluDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immHpb} onChange={(e) => handleChecks(e, 'hpb')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Hepatitis B</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immHpb && <input className='inpMonth' type='month' value={immHpbDate} onChange={(e) => setImmHpbDate(e.target.value)} />}
					{!immHpb && <input className='inpMonth' type='month' readOnly value={immHpbDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immPne} onChange={(e) => handleChecks(e, 'pne')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Pneumovax</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immPne && <input className='inpMonth' type='month' value={immPneDate} onChange={(e) => setImmPneDate(e.target.value)} />}
					{!immPne && <input className='inpMonth' type='month' readOnly value={immPneDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immPre} onChange={(e) => handleChecks(e, 'pre')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Prevnar 13</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immPre && <input className='inpMonth' type='month' value={immPreDate} onChange={(e) => setImmPreDate(e.target.value)} />}
					{!immPre && <input className='inpMonth' type='month' readOnly value={immPreDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immShi} onChange={(e) => handleChecks(e, 'shi')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Shingles</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immShi && <input className='inpMonth' type='month' value={immShiDate} onChange={(e) => setImmShiDate(e.target.value)} />}
					{!immShi && <input className='inpMonth' type='month' readOnly value={immShiDate} />}
				</div>
			</div>
			<div className='mb-1 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={immTdp} onChange={(e) => handleChecks(e, 'tdp')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Tdap or Whooping Cough</div>
				</div>
			</div>
			<div className='mb-3 flex flex-row items-center'>
				<div className='w-1/4 flex justify-end'>
					<div className='text-sm'>Date:</div>
				</div>
				<div className='w-3/4 ps-2'>
					{immTdp && <input className='inpMonth' type='month' value={immTdpDate} onChange={(e) => setImmTdpDate(e.target.value)} />}
					{!immTdp && <input className='inpMonth' type='month' readOnly value={immTdpDate} />}
				</div>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
