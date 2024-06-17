import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function Chiropractic({ userId }) {
	const [not, setNot] = useState(false);
	const [nvr, setNvr] = useState(false);
	const [iwc, setIwc] = useState(false);
	const [may, setMay] = useState(false);
	const [ned, setNed] = useState(false);
	const [cur, setCur] = useState(false);
	const [learnmore, setLearnMore] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/chiropractic`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					not,
					nvr,
					iwc,
					may,
					ned,
					cur,
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
			<div className='mb-3 text-sm'>
				Chiropractic care is a therapy in which the hands or a small tool are used to apply a controlled and sudden force to manipulate the spine, joint
				or other parts of the body. Sometimes, heat and ice, relaxation techniques, exercise, and other treatments are also used. The goal of this
				procedure, also known as spinal manipulation, is to reduce back and neck pain, reduce headaches, improve spinal motion, and improve the
				body&apos;s physical function.
			</div>
			<div className='mb-3 text-sm'>
				IMPORTANT! Providing complete and accurate Chiropractic Therapy information can positively impact your care and safety. Please check any that
				apply.
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={not} onChange={(e) => setNot(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>Not interested in care</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={nvr} onChange={(e) => setNvr(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I&apos;ve never received care</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={iwc} onChange={(e) => setIwc(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I would consider care</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={may} onChange={(e) => setMay(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I may need care</div>
				</div>
			</div>
			<div className='mb-2 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={ned} onChange={(e) => setNed(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I need care</div>
				</div>
			</div>
			<div className='mb-4 flex flex-row items-center'>
				<div className='w-1/6 flex justify-end'>
					<input className='chkBox' type='checkbox' checked={cur} onChange={(e) => setCur(e.target.checked)} />
				</div>
				<div className='w-5/6 ps-2'>
					<div className='text-sm'>I&apos;m currently receiving care</div>
				</div>
			</div>
			<label className='frmLabel'>
				Are you interested in learning more about Chiropractic Therapy during your visit? Its cost and how it complements the body healing process,
				including bones, cartilage, connective tissue, joints, and muscles, while improving back, head, and neck pain, athletic performance, and
				posture, and reducing scoliosis and possibly osteoarthritis symptoms with highly satisfying methods.
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
