import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Social({ userId }) {
	const [alc, setAlc] = useState('');
	const [alcCur, setAlcCur] = useState('');
	const [alcQuit, setAlcQuit] = useState('');
	const [coffee, setCoffee] = useState('');
	const [tea, setTea] = useState('');
	const [soda, setSoda] = useState('');
	const [tob, setTob] = useState('');
	const [tobDay, setTobDay] = useState('');
	const [tobWeek, setTobWeek] = useState('');
	const [tobQuit, setTobQuit] = useState('');
	const [thc, setThc] = useState('');
	const [thcDay, setThcDay] = useState('');
	const [thcWeek, setThcWeek] = useState('');
	const [thcMonth, setThcMonth] = useState('');
	const [thcQuit, setThcQuit] = useState('');
	const [hd, setHd] = useState('');
	const [hdTypes, setHdTypes] = useState('');
	const [hdDay, setHdDay] = useState('');
	const [hdWeek, setHdWeek] = useState('');
	const [hdMonth, setHdMonth] = useState('');
	const [hdQuit, setHdQuit] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(`${process.env.API_URL}/subscribers/setup/social`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					alc,
					alccur: alcCur,
					alcquit: alcQuit,
					coffee,
					tea,
					soda,
					tob,
					tobday: tobDay,
					tobweek: tobWeek,
					tobquit: tobQuit,
					thc,
					thcday: thcDay,
					thcweek: thcWeek,
					thcmonth: thcMonth,
					thcquit: thcQuit,
					hd,
					hdtypes: hdTypes,
					hdday: hdDay,
					hdweek: hdWeek,
					hdmonth: hdMonth,
					hdquit: hdQuit,
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
	const handleAlc = (e) => {
		const value = e.target.value;
		setAlc(value);
		if (value === 'cur') {
			setAlcQuit('');
		}
		if (value === 'quit') {
			setAlcCur('');
		}
		if (value === 'nvr') {
			setAlcCur('');
			setAlcQuit('');
		}
	};

	const handleTob = (e) => {
		const value = e.target.value;
		setTob(value);
		if (value === 'cur') {
			setTobQuit('');
		}
		if (value === 'quit') {
			setTobDay('');
			setTobWeek('');
		}
		if (value === 'nvr') {
			setTobDay('');
			setTobWeek('');
			setTobQuit('');
		}
	};

	const handleThc = (e) => {
		const value = e.target.value;
		setThc(value);
		if (value === 'cur') {
			setThcQuit('');
		}
		if (value === 'quit') {
			setThcDay('');
			setThcWeek('');
			setThcMonth('');
		}
		if (value === 'nvr') {
			setThcDay('');
			setThcWeek('');
			setThcMonth('');
			setThcQuit('');
		}
	};

	const handleHd = (e) => {
		const value = e.target.value;
		setHd(value);
		if (value === 'cur') {
			setHdQuit('');
		}
		if (value === 'quit') {
			setHdTypes('');
			setHdDay('');
			setHdWeek('');
			setHdMonth('');
		}
		if (value === 'nvr') {
			setHdTypes('');
			setHdDay('');
			setHdWeek('');
			setHdMonth('');
			setHdQuit('');
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='text-base text-drkred'>Alcohol</div>
			<div className='mb-3 ps-4'>
				<label className='frmLabel'>Frequency</label>
				<select className='inpBorder form-control' value={alc} onChange={(e) => handleAlc(e)}>
					<option value=''>Select One...</option>
					<option value='cur'>Currently</option>
					<option value='nvr'>Never</option>
					<option value='quit'>Quit</option>
				</select>
				{alc === 'cur' && (
					<div className='mt-1 ps-4'>
						<label className='frmLabel'>Drinks per week</label>
						<select className='inpBorder form-control' value={alcCur} onChange={(e) => setAlcCur(e.target.value)}>
							<option value=''>Select One...</option>
							{[...Array(49)]
								.map((_, i) => i + 1)
								.map((i) => (
									<option key={i} value={i}>
										{i}
									</option>
								))}
							<option value='50+'>50+</option>
						</select>
					</div>
				)}
				{alc === 'quit' && (
					<div className='mt-1 ps-4'>
						<label className='frmLabel'>How many years ago</label>
						<select className='inpBorder form-control' value={alcQuit} onChange={(e) => setAlcQuit(e.target.value)}>
							<option value=''>Select One...</option>
							{[...Array(9)]
								.map((_, i) => i + 1)
								.map((i) => (
									<option key={i} value={i}>
										{i}
									</option>
								))}
							<option value='10+'>10+</option>
						</select>
					</div>
				)}
			</div>
			<div className='text-base text-drkred'>Caffeine</div>
			<div className='mb-3 ps-4'>
				<label className='frmLabel'>Coffee - cups per day</label>
				<select className='inpBorder form-control mb-1' value={coffee} onChange={(e) => setCoffee(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='0'>0</option>
					{[...Array(9)]
						.map((_, i) => i + 1)
						.map((i) => (
							<option key={i} value={i}>
								{i}
							</option>
						))}
					<option value='10+'>10+</option>
				</select>
				<label className='frmLabel'>Tea - cups per day</label>
				<select className='inpBorder form-control mb-1' value={tea} onChange={(e) => setTea(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='0'>0</option>
					{[...Array(9)]
						.map((_, i) => i + 1)
						.map((i) => (
							<option key={i} value={i}>
								{i}
							</option>
						))}
					<option value='10+'>10+</option>
				</select>
				<label className='frmLabel'>Sodas per day</label>
				<select className='inpBorder form-control' value={soda} onChange={(e) => setSoda(e.target.value)}>
					<option value=''>Select One...</option>
					<option value='0'>0</option>
					{[...Array(9)]
						.map((_, i) => i + 1)
						.map((i) => (
							<option key={i} value={i}>
								{i}
							</option>
						))}
					<option value='10+'>10+</option>
				</select>
			</div>
			<div className='text-base text-drkred'>Tobacco</div>
			<div className='mb-3 ps-4'>
				<label className='frmLabel'>Frequency</label>
				<select className='inpBorder form-control' value={tob} onChange={(e) => handleTob(e)}>
					<option value=''>Select One...</option>
					<option value='cur'>Currently</option>
					<option value='nvr'>Never</option>
					<option value='quit'>Quit</option>
				</select>
				{tob === 'cur' && (
					<>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Cigarettes/Cigars per day</label>
							<select className='inpBorder form-control' value={tobDay} onChange={(e) => setTobDay(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(49)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='50+'>50+</option>
							</select>
						</div>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Packs per week</label>
							<select className='inpBorder form-control' value={tobWeek} onChange={(e) => setTobWeek(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(9)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='10+'>10+</option>
							</select>
						</div>
					</>
				)}
				{tob === 'quit' && (
					<div className='mt-1 ps-4'>
						<label className='frmLabel'>How many years ago</label>
						<select className='inpBorder form-control' value={tobQuit} onChange={(e) => setTobQuit(e.target.value)}>
							<option value=''>Select One...</option>
							{[...Array(9)]
								.map((_, i) => i + 1)
								.map((i) => (
									<option key={i} value={i}>
										{i}
									</option>
								))}
							<option value='10+'>10+</option>
						</select>
					</div>
				)}
			</div>
			<div className='text-base text-drkred'>THC/Marijuana</div>
			<div className='mb-3 ps-4'>
				<label className='frmLabel'>Smoke or Consumables Frequency</label>
				<select className='inpBorder form-control' value={thc} onChange={(e) => handleThc(e)}>
					<option value=''>Select One...</option>
					<option value='cur'>Currently</option>
					<option value='nvr'>Never</option>
					<option value='quit'>Quit</option>
				</select>
				{thc === 'cur' && (
					<>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Times per day</label>
							<select className='inpBorder form-control' value={thcDay} onChange={(e) => setThcDay(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(9)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='10+'>10+</option>
							</select>
						</div>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Times per week</label>
							<select className='inpBorder form-control' value={thcWeek} onChange={(e) => setThcWeek(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(9)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='10+'>10+</option>
							</select>
						</div>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Times per month</label>
							<select className='inpBorder form-control' value={thcMonth} onChange={(e) => setThcMonth(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(29)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='30+'>30+</option>
							</select>
						</div>
					</>
				)}
				{thc === 'quit' && (
					<div className='mt-1 ps-4'>
						<label className='frmLabel'>How many years ago</label>
						<select className='inpBorder form-control' value={thcQuit} onChange={(e) => setThcQuit(e.target.value)}>
							<option value=''>Select One...</option>
							{[...Array(9)]
								.map((_, i) => i + 1)
								.map((i) => (
									<option key={i} value={i}>
										{i}
									</option>
								))}
							<option value='10+'>10+</option>
						</select>
					</div>
				)}
			</div>
			<div className='text-base text-drkred'>Hard Drugs</div>
			<div className='mb-3 ps-4'>
				<label className='frmLabel'>Frequency</label>
				<select className='inpBorder form-control' value={hd} onChange={(e) => handleHd(e)}>
					<option value=''>Select One...</option>
					<option value='cur'>Currently</option>
					<option value='nvr'>Never</option>
					<option value='quit'>Quit</option>
				</select>
				{hd === 'cur' && (
					<>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Type(s)</label>
							<Input type='text' value={hdTypes} setValue={setHdTypes} />
						</div>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Times per day</label>
							<select className='inpBorder form-control' value={hdDay} onChange={(e) => setHdDay(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(9)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='10+'>10+</option>
							</select>
						</div>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Times per week</label>
							<select className='inpBorder form-control' value={hdWeek} onChange={(e) => setHdWeek(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(9)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='10+'>10+</option>
							</select>
						</div>
						<div className='mt-1 ps-4'>
							<label className='frmLabel'>Times per month</label>
							<select className='inpBorder form-control' value={hdMonth} onChange={(e) => setHdMonth(e.target.value)}>
								<option value=''>Select One...</option>
								{[...Array(29)]
									.map((_, i) => i + 1)
									.map((i) => (
										<option key={i} value={i}>
											{i}
										</option>
									))}
								<option value='30+'>30+</option>
							</select>
						</div>
					</>
				)}
				{hd === 'quit' && (
					<div className='mt-1 ps-4'>
						<label className='frmLabel'>How many years ago</label>
						<select className='inpBorder form-control' value={hdQuit} onChange={(e) => setHdQuit(e.target.value)}>
							<option value=''>Select One...</option>
							{[...Array(9)]
								.map((_, i) => i + 1)
								.map((i) => (
									<option key={i} value={i}>
										{i}
									</option>
								))}
							<option value='10+'>10+</option>
						</select>
					</div>
				)}
			</div>
			<div className='mt-5 flex justify-center'>
				<Button type='submit'>Save Changes</Button>
			</div>
		</form>
	);
}
