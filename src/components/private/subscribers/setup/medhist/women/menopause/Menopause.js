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

	return (
		<form onSubmit={handleSubmit}>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Anxiety &ndash; inner restlessness, feeling panicky</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={anx} onChange={(e) => setAnx(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Bladder Problems &ndash; difficulty urinating, increased need to urinate, incontinence</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={bla} onChange={(e) => setBla(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Depressive Mood &ndash; feeling down, sad, on the verge of tears, mood swings, lack of drive</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={dep} onChange={(e) => setDep(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Dryness of Vagina &ndash; burning sensation, difficulty with sexual intercourse</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={dry} onChange={(e) => setDry(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Hot Flashes &ndash; episodes of sweating</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={hot} onChange={(e) => setHot(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Heart Discomfort &ndash; unusual awareness of heartbeat, skipping, racing or tightness</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={hed} onChange={(e) => setHed(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Irritability &ndash; feeling nervous, inner tension, feeling aggressive</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={irr} onChange={(e) => setIrr(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Joint and Muscular Discomfort &ndash; pain in the joints, rheumatoid complaints</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={joi} onChange={(e) => setJoi(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Physical/Mental Exhaustion &ndash; decrease in performance, impaired memory, concentration</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={phy} onChange={(e) => setPhy(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Sexual Problems &ndash; change in sexual desire, in sexual activity and satisfaction</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={sex} onChange={(e) => setSex(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='row mb-2'>
				<div className='col-12 mb-1'>
					<div className='frmLabel'>Sleep Problems &ndash; difficulty falling asleep, sleeping through the night, waking up early</div>
				</div>
				<div className='col-12'>
					<select className='inpBorder form-control' value={slp} onChange={(e) => setSlp(e.target.value)}>
						<option value=''>Select One...</option>
						<option value='n'>None</option>
						<option value='mi'>Mild</option>
						<option value='mo'>Moderate</option>
						<option value='s'>Severe</option>
						<option value='e'>Extreme</option>
					</select>
				</div>
			</div>
			<div className='mt-4 d-flex justify-content-center'>
				<Button type='submit' border='555555'>
					Save Changes
				</Button>
			</div>
		</form>
	);
}
