import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Fitness({ userId }) {
	const [days, setDays] = useState('');
	const [time, setTime] = useState('');
	const [where, setWhere] = useState('');
	const [when, setWhen] = useState('');
	const [bkg, setBkg] = useState(false);
	const [bbg, setBbg] = useState(false);
	const [car, setCar] = useState(false);
	const [cro, setCro] = useState(false);
	const [int, setInt] = useState(false);
	const [hit, setHit] = useState(false);
	const [hkg, setHkg] = useState(false);
	const [pwr, setPwr] = useState(false);
	const [run, setRun] = useState(false);
	const [spo, setSpo] = useState(false);
	const [swm, setSwm] = useState(false);
	const [wlk, setWlk] = useState(false);
	const [goal, setGoal] = useState('');
	const [explan, setExplan] = useState('');
	const [alone, setAlone] = useState('');
	const [nuplan, setNuplan] = useState('');
	const [tech, setTech] = useState('');
	const [yoga, setYoga] = useState('');
	const [pil, setPil] = useState('');
	const [learnmore, setLearnMore] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/fitness`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					days,
					time,
					where,
					when,
					bkg,
					bbg,
					car,
					cro,
					int,
					hit,
					hkg,
					pwr,
					run,
					spo,
					swm,
					wlk,
					goal,
					explan,
					alone,
					nuplan,
					tech,
					yoga,
					pil,
					learnmore,
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

	return (
		<form onSubmit={handleSubmit}>
			<label className='frmLabel'>How many days a week do you exercise</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={days} onChange={(e) => setDays(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='0'>I Don&apos;t</option>
					<option value='1'>1-2 Days</option>
					<option value='3'>3-5 Days</option>
					<option value='6'>6+ Days</option>
				</select>
			</div>
			<label className='frmLabel'>How much time do you spend for regular exercise</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={time} onChange={(e) => setTime(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='0'>0-30 mins</option>
					<option value='30'>30-60 mins</option>
					<option value='60'>60-90 mins</option>
					<option value='90'>90+ mins</option>
				</select>
			</div>
			<label className='frmLabel'>Where do you prefer to exercise</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={where} onChange={(e) => setWhere(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='g'>Gym</option>
					<option value='h'>Home</option>
					<option value='f'>Fresh Air</option>
					<option value='o'>Other</option>
				</select>
			</div>
			<label className='frmLabel'>When do you prefer to exercise</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={when} onChange={(e) => setWhen(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='em'>Early Morning</option>
					<option value='md'>Mid-Day</option>
					<option value='af'>Afternoon</option>
					<option value='ev'>Evening</option>
				</select>
			</div>
			<label className='frmLabel'>What type of exercise do you often do (check all that apply)</label>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={bkg} onChange={(e) => setBkg(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Biking</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={bbg} onChange={(e) => setBbg(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Bodybuilding</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={car} onChange={(e) => setCar(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Cardio</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cro} onChange={(e) => setCro(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Crossfit</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={int} onChange={(e) => setInt(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Interval Training</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hit} onChange={(e) => setHit(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>HIIT</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={hkg} onChange={(e) => setHkg(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Hiking</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={pwr} onChange={(e) => setPwr(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Powerlifting</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={run} onChange={(e) => setRun(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Running</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={spo} onChange={(e) => setSpo(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Sports</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={swm} onChange={(e) => setSwm(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Swimming</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={wlk} onChange={(e) => setWlk(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Walking</div>
				</div>
			</div>
			<label className='frmLabel'>What is your main goal doing exercise</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={goal} onChange={(e) => setGoal(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='bm'>Build Muscle</option>
					<option value='bs'>Build Strength</option>
					<option value='fb'>Feel Better</option>
					<option value='gw'>Gain Weight</option>
					<option value='in'>Independence</option>
					<option value='ll'>Live Longer</option>
					<option value='lb'>Look Better</option>
					<option value='lw'>Lose Weight</option>
					<option value='mw'>Maintain Weight</option>
					<option value='rs'>Relieve Stress</option>
					<option value='sf'>Stay Fit</option>
					<option value='ot'>Other</option>
				</select>
			</div>
			<label className='frmLabel'>Do you have exercise plans</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={explan} onChange={(e) => setExplan(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='yb'>Yes, but don&apos;t always use</option>
					<option value='n'>No</option>
					<option value='go'>I just go for it</option>
				</select>
			</div>
			<label className='frmLabel'>Do you work out alone</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={alone} onChange={(e) => setAlone(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='nb'>No, I work out with a partner</option>
					<option value='ng'>No, I work out with a group</option>
					<option value='np'>No, I have a personal trainer</option>
				</select>
			</div>
			<label className='frmLabel'>Do you have a nutrition plan</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={nuplan} onChange={(e) => setNuplan(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='ys'>Yes, with food supplements</option>
					<option value='ne'>No, but I eat healthy</option>
					<option value='nh'>No, and I have bad eating habits</option>
				</select>
			</div>
			<label className='frmLabel'>Do you use any technology to assist or track your exercise</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={tech} onChange={(e) => setTech(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='no'>No</option>
					<option value='fa'>Fitness Apps</option>
					<option value='se'>Smart Home Gym Equipment</option>
					<option value='ss'>Smart Scale</option>
					<option value='sw'>Smart Watch</option>
				</select>
			</div>
			<label className='frmLabel'>Do you do yoga</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={yoga} onChange={(e) => setYoga(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='yi'>Yes, I&apos;m an instructor</option>
					<option value='n'>No</option>
					<option value='p'>I did in the past</option>
				</select>
			</div>
			<label className='frmLabel'>Do you do pilates</label>
			<div className='mb-4 ps-2'>
				<select className='inpBorder form-control' value={pil} onChange={(e) => setPil(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='yi'>Yes, I&apos;m an instructor</option>
					<option value='n'>No</option>
					<option value='p'>I did in the past</option>
				</select>
			</div>
			<label className='frmLabel'>
				Are you interested in learning more about Physical Fitness during your visit? It&apos;s cost and how it can improve your brain health, help
				manage weight, reduce the risk of disease, strengthen bones and muscles, and improve your ability to do everyday activities.
			</label>
			<div className='ps-2'>
				<select className='inpBorder form-control' value={learnmore} onChange={(e) => setLearnMore(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='y'>Yes</option>
					<option value='n'>No</option>
				</select>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
