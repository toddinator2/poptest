import Button from '@/components/global/forms/buttons/Button';
import Input from '@/components/global/forms/input/Input';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

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
			<div className='row mb-1'>
				<div className='col-12'>
					<div className='errMsg'>Alcohol</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-10 offset-1'>
					<div className='row'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Frequency</div>
						</div>
						<div className='col-10 offset-1'>
							<select className='inpBorder form-control' value={alc} onChange={(e) => handleAlc(e)}>
								<option value=''>Select One...</option>
								<option value='cur'>Currently</option>
								<option value='nvr'>Never</option>
								<option value='quit'>Quit</option>
							</select>
						</div>
					</div>
					{alc === 'cur' && (
						<div className='row mt-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>Drinks per week</div>
							</div>
							<div className='col-10 offset-1'>
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
						</div>
					)}
					{alc === 'quit' && (
						<div className='row mt-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>How many years ago</div>
							</div>
							<div className='col-10 offset-1'>
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
						</div>
					)}
				</div>
			</div>
			<div className='row mb-1'>
				<div className='col-12'>
					<div className='errMsg'>Caffeine</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-10 offset-1'>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Coffee - cups per day</div>
						</div>
						<div className='col-10 offset-1'>
							<select className='inpBorder form-control' value={coffee} onChange={(e) => setCoffee(e.target.value)}>
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
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Tea - cups per day</div>
						</div>
						<div className='col-10 offset-1'>
							<select className='inpBorder form-control' value={tea} onChange={(e) => setTea(e.target.value)}>
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
					</div>
					<div className='row mb-2'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Sodas per day</div>
						</div>
						<div className='col-10 offset-1'>
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
					</div>
				</div>
			</div>
			<div className='row mb-1'>
				<div className='col-12'>
					<div className='errMsg'>Tobacco</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-10 offset-1'>
					<div className='row'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Frequency</div>
						</div>
						<div className='col-10 offset-1'>
							<select className='inpBorder form-control' value={tob} onChange={(e) => handleTob(e)}>
								<option value=''>Select One...</option>
								<option value='cur'>Currently</option>
								<option value='nvr'>Never</option>
								<option value='quit'>Quit</option>
							</select>
						</div>
					</div>
					{tob === 'cur' && (
						<>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Cigarettes/Cigars per day</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Packs per week</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
						</>
					)}
					{tob === 'quit' && (
						<div className='row mt-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>How many years ago</div>
							</div>
							<div className='col-10 offset-1'>
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
						</div>
					)}
				</div>
			</div>
			<div className='row mb-1'>
				<div className='col-12'>
					<div className='errMsg'>THC/Marijuana</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-10 offset-1'>
					<div className='row'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Smoke or Consumables Frequency</div>
						</div>
						<div className='col-10 offset-1'>
							<select className='inpBorder form-control' value={thc} onChange={(e) => handleThc(e)}>
								<option value=''>Select One...</option>
								<option value='cur'>Currently</option>
								<option value='nvr'>Never</option>
								<option value='quit'>Quit</option>
							</select>
						</div>
					</div>
					{thc === 'cur' && (
						<>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Times per day</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Times per week</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Times per month</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
						</>
					)}
					{thc === 'quit' && (
						<div className='row mt-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>How many years ago</div>
							</div>
							<div className='col-10 offset-1'>
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
						</div>
					)}
				</div>
			</div>
			<div className='row mb-1'>
				<div className='col-12'>
					<div className='errMsg'>Hard Drugs</div>
				</div>
			</div>
			<div className='row mb-3'>
				<div className='col-10 offset-1'>
					<div className='row'>
						<div className='col-12 mb-1'>
							<div className='frmLabel'>Frequency</div>
						</div>
						<div className='col-10 offset-1'>
							<select className='inpBorder form-control' value={hd} onChange={(e) => handleHd(e)}>
								<option value=''>Select One...</option>
								<option value='cur'>Currently</option>
								<option value='nvr'>Never</option>
								<option value='quit'>Quit</option>
							</select>
						</div>
					</div>
					{hd === 'cur' && (
						<>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Type(s)</div>
								</div>
								<div className='col-10 offset-1'>
									<Input type='text' value={hdTypes} setValue={setHdTypes} />
								</div>
							</div>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Times per day</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Times per week</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
							<div className='row mt-2'>
								<div className='col-12 mb-1'>
									<div className='frmLabel'>Times per month</div>
								</div>
								<div className='col-10 offset-1'>
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
							</div>
						</>
					)}
					{hd === 'quit' && (
						<div className='row mt-2'>
							<div className='col-12 mb-1'>
								<div className='frmLabel'>How many years ago</div>
							</div>
							<div className='col-10 offset-1'>
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
						</div>
					)}
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
