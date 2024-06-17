import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Procedures({ userId }) {
	const [app, setApp] = useState(false);
	const [csn, setCsn] = useState(false);
	const [cor, setCor] = useState(false);
	const [gal, setGal] = useState(false);
	const [hes, setHes] = useState(false);
	const [her, setHer] = useState(false);
	const [hip, setHip] = useState(false);
	const [hys, setHys] = useState(false);
	const [kne, setKne] = useState(false);
	const [nun, setNun] = useState(false);
	const [sps, setSps] = useState(false);
	const [ste, setSte] = useState(false);
	const [ton, setTon] = useState(false);
	const [wls, setWls] = useState(false);
	const [oth, setOth] = useState(false);
	const [other, setOther] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/procedures`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					app,
					csn,
					cor,
					gal,
					hes,
					her,
					hip,
					hys,
					kne,
					nun,
					sps,
					ste,
					ton,
					wls,
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
			setApp(false);
			setCsn(false);
			setCor(false);
			setGal(false);
			setHes(false);
			setHer(false);
			setHip(false);
			setHys(false);
			setKne(false);
			setSps(false);
			setSte(false);
			setTon(false);
			setWls(false);
			setOth(false);
			setOther('');
		}
		if (chk === 'app') {
			setNun(false);
			setApp(e.target.checked);
		}
		if (chk === 'csn') {
			setNun(false);
			setCsn(e.target.checked);
		}
		if (chk === 'cor') {
			setNun(false);
			setCor(e.target.checked);
		}
		if (chk === 'gal') {
			setNun(false);
			setGal(e.target.checked);
		}
		if (chk === 'hes') {
			setNun(false);
			setHes(e.target.checked);
		}
		if (chk === 'her') {
			setNun(false);
			setHer(e.target.checked);
		}
		if (chk === 'hip') {
			setNun(false);
			setHip(e.target.checked);
		}
		if (chk === 'hys') {
			setNun(false);
			setHys(e.target.checked);
		}
		if (chk === 'kne') {
			setNun(false);
			setKne(e.target.checked);
		}
		if (chk === 'sps') {
			setNun(false);
			setSps(e.target.checked);
		}
		if (chk === 'ste') {
			setNun(false);
			setSte(e.target.checked);
		}
		if (chk === 'ton') {
			setNun(false);
			setTon(e.target.checked);
		}
		if (chk === 'wls') {
			setNun(false);
			setWls(e.target.checked);
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
					<input className='chkBox' type='checkbox' checked={app} onChange={(e) => handleChecks(e, 'app')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Appendix</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={csn} onChange={(e) => handleChecks(e, 'csn')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>C-Section</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cor} onChange={(e) => handleChecks(e, 'cor')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Colon Resection</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={gal} onChange={(e) => handleChecks(e, 'gal')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Gall Bladder</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hes} onChange={(e) => handleChecks(e, 'hes')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Heart Surgery</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={her} onChange={(e) => handleChecks(e, 'her')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Hernia Surgery</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hip} onChange={(e) => handleChecks(e, 'hip')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Hip Replacement</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hys} onChange={(e) => handleChecks(e, 'hys')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Hysterectomy</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={kne} onChange={(e) => handleChecks(e, 'kne')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Knee Replacement</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={sps} onChange={(e) => handleChecks(e, 'sps')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Spine Surgery</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ste} onChange={(e) => handleChecks(e, 'ste')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Stent</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ton} onChange={(e) => handleChecks(e, 'ton')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Tonsillectomy</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={wls} onChange={(e) => handleChecks(e, 'wls')} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Weight Loss Surgery</div>
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
