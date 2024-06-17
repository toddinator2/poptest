import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function MenUrinary({ userId }) {
	const [empty, setEmpty] = useState('');
	const [again, setAgain] = useState('');
	const [stop, setStop] = useState('');
	const [hold, setHold] = useState('');
	const [weak, setWeak] = useState('');
	const [push, setPush] = useState('');
	const [nite, setNite] = useState('');
	const [life, setLife] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/men/urinary`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					empty,
					again,
					stop,
					hold,
					weak,
					push,
					nite,
					life,
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
			<label className='frmLabel'>
				Over the past month, how often have you had the feeling of not completely emptying your bladder after you finished urinating
			</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={empty} onChange={(e) => setEmpty(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='nv'>Never</option>
					<option value='l1'>Less than 1 time in 5</option>
					<option value='lh'>Less than half of the time</option>
					<option value='hf'>About half of the time</option>
					<option value='mh'>More than half of the time</option>
					<option value='aa'>Almost always</option>
				</select>
			</div>
			<label className='frmLabel'>Over the past month, how often have you had to urinate again less than 2 hours after you finished urinating</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={again} onChange={(e) => setAgain(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='nv'>Never</option>
					<option value='l1'>Less than 1 time in 5</option>
					<option value='lh'>Less than half of the time</option>
					<option value='hf'>About half of the time</option>
					<option value='mh'>More than half of the time</option>
					<option value='aa'>Almost always</option>
				</select>
			</div>
			<label className='frmLabel'>Over the past month, how often have you found that you stopped and started again several times when you urinated</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={stop} onChange={(e) => setStop(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='nv'>Never</option>
					<option value='l1'>Less than 1 time in 5</option>
					<option value='lh'>Less than half of the time</option>
					<option value='hf'>About half of the time</option>
					<option value='mh'>More than half of the time</option>
					<option value='aa'>Almost always</option>
				</select>
			</div>
			<label className='frmLabel'>Over the past month, how often have you found it hard to hold your urine</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={hold} onChange={(e) => setHold(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='nv'>Never</option>
					<option value='l1'>Less than 1 time in 5</option>
					<option value='lh'>Less than half of the time</option>
					<option value='hf'>About half of the time</option>
					<option value='mh'>More than half of the time</option>
					<option value='aa'>Almost always</option>
				</select>
			</div>
			<label className='frmLabel'>Over the past month, how often have you had a weak urine stream</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={weak} onChange={(e) => setWeak(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='nv'>Never</option>
					<option value='l1'>Less than 1 time in 5</option>
					<option value='lh'>Less than half of the time</option>
					<option value='hf'>About half of the time</option>
					<option value='mh'>More than half of the time</option>
					<option value='aa'>Almost always</option>
				</select>
			</div>
			<label className='frmLabel'>Over the past month, how often have you had to push or strain to begin urination</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={push} onChange={(e) => setPush(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='nv'>Never</option>
					<option value='l1'>Less than 1 time in 5</option>
					<option value='lh'>Less than half of the time</option>
					<option value='hf'>About half of the time</option>
					<option value='mh'>More than half of the time</option>
					<option value='aa'>Almost always</option>
				</select>
			</div>
			<label className='frmLabel'>Over the past month, have you had to get up to urinate during the night? Give a score to the number of times</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={nite} onChange={(e) => setNite(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='n'>Never</option>
					<option value='1'>1 time</option>
					<option value='2'>2 times</option>
					<option value='3'>3 times</option>
					<option value='4'>4 times</option>
					<option value='5'>5 or more times</option>
				</select>
			</div>
			<label className='frmLabel'>
				If you were to spend the rest of your life with your urinary condition just the way it is now, how would you feel about that
			</label>
			<div className='mb-2 ps-2'>
				<select className='inpBorder form-control' value={life} onChange={(e) => setLife(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='de'>Delighted</option>
					<option value='pl'>Pleased</option>
					<option value='ms'>Mostly Satisfied</option>
					<option value='mx'>Mixed</option>
					<option value='md'>Mostly Dissatisfied</option>
					<option value='un'>Unhappy</option>
					<option value='tr'>Terrible</option>
				</select>
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
