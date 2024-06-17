import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Menopause({ userId }) {
	const [anx, setAnx] = useState('');
	const [bla, setBla] = useState('');
	const [dep, setDep] = useState('');
	const [dry, setDry] = useState('');
	const [hot, setHot] = useState('');
	const [hed, setHed] = useState('');
	const [irr, setIrr] = useState('');
	const [joi, setJoi] = useState('');
	const [phy, setPhy] = useState('');
	const [sex, setSex] = useState('');
	const [slp, setSlp] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/women/menopause`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					anx,
					bla,
					dep,
					dry,
					hot,
					hed,
					irr,
					joi,
					phy,
					sex,
					slp,
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
			<label className='frmLabel'>Anxiety &ndash; inner restlessness, feeling panicky</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={anx} onChange={(e) => setAnx(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Bladder Problems &ndash; difficulty urinating, increased need to urinate, incontinence</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={bla} onChange={(e) => setBla(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Depressive Mood &ndash; feeling down, sad, on the verge of tears, mood swings, lack of drive</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={dep} onChange={(e) => setDep(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Dryness of Vagina &ndash; burning sensation, difficulty with sexual intercourse</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={dry} onChange={(e) => setDry(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Hot Flashes &ndash; episodes of sweating</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={hot} onChange={(e) => setHot(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Heart Discomfort &ndash; unusual awareness of heartbeat, skipping, racing or tightness</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={hed} onChange={(e) => setHed(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Irritability &ndash; feeling nervous, inner tension, feeling aggressive</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={irr} onChange={(e) => setIrr(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Joint and Muscular Discomfort &ndash; pain in the joints, rheumatoid complaints</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={joi} onChange={(e) => setJoi(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Physical/Mental Exhaustion &ndash; decrease in performance, impaired memory, concentration</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={phy} onChange={(e) => setPhy(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Sexual Problems &ndash; change in sexual desire, in sexual activity and satisfaction</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={sex} onChange={(e) => setSex(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<label className='frmLabel'>Sleep Problems &ndash; difficulty falling asleep, sleeping through the night, waking up early</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={slp} onChange={(e) => setSlp(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>None</option>
					<option value='mi'>Mild</option>
					<option value='mo'>Moderate</option>
					<option value='s'>Severe</option>
					<option value='e'>Extreme</option>
				</select>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
