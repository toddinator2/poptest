import React, { useCallback, useContext, useEffect, useState } from 'react';
import { geocode, RequestType } from 'react-geocode';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { FormatPhoneNumber } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Checklist from '../checklist/Checklist';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';

export default function Location() {
	const gglKey = process.env.MAPS_KEY;
	const [auth] = useContext(AuthContext);
	const [name, setName] = useState('');
	const [add, setAdd] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [phone, setPhone] = useState('');
	const [dayStart, setDayStart] = useState(1);
	const [dayEnd, setDayEnd] = useState(5);
	const [sameTimes, setSameTimes] = useState(false);
	const [timeOpen, setTimeOpen] = useState('');
	const [lunchStart, setLunchStart] = useState('');
	const [lunchEnd, setLunchEnd] = useState('');
	const [timeClose, setTimeClose] = useState('');
	const [shwSame, setShwSame] = useState(false);
	const [startTime0, setStartTime0] = useState('');
	const [endTime0, setEndTime0] = useState('');
	const [startLunch0, setStartLunch0] = useState('');
	const [endLunch0, setEndLunch0] = useState('');
	const [startTime1, setStartTime1] = useState('');
	const [endTime1, setEndTime1] = useState('');
	const [startLunch1, setStartLunch1] = useState('');
	const [endLunch1, setEndLunch1] = useState('');
	const [startTime2, setStartTime2] = useState('');
	const [endTime2, setEndTime2] = useState('');
	const [startLunch2, setStartLunch2] = useState('');
	const [endLunch2, setEndLunch2] = useState('');
	const [startTime3, setStartTime3] = useState('');
	const [endTime3, setEndTime3] = useState('');
	const [startLunch3, setStartLunch3] = useState('');
	const [endLunch3, setEndLunch3] = useState('');
	const [startTime4, setStartTime4] = useState('');
	const [endTime4, setEndTime4] = useState('');
	const [startLunch4, setStartLunch4] = useState('');
	const [endLunch4, setEndLunch4] = useState('');
	const [startTime5, setStartTime5] = useState('');
	const [endTime5, setEndTime5] = useState('');
	const [startLunch5, setStartLunch5] = useState('');
	const [endLunch5, setEndLunch5] = useState('');
	const [startTime6, setStartTime6] = useState('');
	const [endTime6, setEndTime6] = useState('');
	const [startLunch6, setStartLunch6] = useState('');
	const [endLunch6, setEndLunch6] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocation = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/byofcid?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setName(data.loc.name);
				setPhone(data.loc.phone);
				setDayStart(data.loc.startday);
				setDayEnd(data.loc.endday);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadLocation();
	}, [loadLocation]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		let latitude = '';
		let longitude = '';

		//Set longitude and latitude
		if (add && city && state && zip) {
			const convertAddress = `${add}, ${city}, ${state}, ${zip}`;
			await geocode(RequestType.ADDRESS, convertAddress, {
				key: gglKey,
				language: 'en',
				region: 'us',
			})
				.then((response) => {
					latitude = response.results[0].geometry.location.lat.toString();
					longitude = response.results[0].geometry.location.lng.toString();
				})
				.catch((err) => {
					toast.error(err);
				});
		}

		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/setup/edit/location`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					ofcid: auth.user.ofcObjId,
					name,
					address: add,
					address2: add2,
					city,
					state,
					zip,
					phone,
					startday: dayStart,
					endday: dayEnd,
					sametimes: sameTimes,
					starttime0: startTime0,
					endtime0: endTime0,
					startlunch0: startLunch0,
					endlunch0: endLunch0,
					starttime1: startTime1,
					endtime1: endTime1,
					startlunch1: startLunch1,
					endlunch1: endLunch1,
					starttime2: startTime2,
					endtime2: endTime2,
					startlunch2: startLunch2,
					endlunch2: endLunch2,
					starttime3: startTime3,
					endtime3: endTime3,
					startlunch3: startLunch3,
					endlunch3: endLunch3,
					starttime4: startTime4,
					endtime4: endTime4,
					startlunch4: startLunch4,
					endlunch4: endLunch4,
					starttime5: startTime5,
					endtime5: endTime5,
					startlunch5: startLunch5,
					endlunch5: endLunch5,
					starttime6: startTime6,
					endtime6: endTime6,
					startlunch6: startLunch6,
					endlunch6: endLunch6,
					latitude,
					longitude,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handlePhone = (e) => {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	};

	const handleShwDiv = async (e) => {
		const value = e.target.checked;
		setSameTimes(value);
		setShwSame(!shwSame);
	};

	const handleTimeOpen = (e) => {
		const value = e.target.value;
		setTimeOpen(value);
		setStartTime0(value);
		setStartTime1(value);
		setStartTime2(value);
		setStartTime3(value);
		setStartTime4(value);
		setStartTime5(value);
		setStartTime6(value);
	};

	const handleLunchStart = (e) => {
		const value = e.target.value;
		setLunchStart(value);
		setStartLunch0(value);
		setStartLunch1(value);
		setStartLunch2(value);
		setStartLunch3(value);
		setStartLunch4(value);
		setStartLunch5(value);
		setStartLunch6(value);
	};

	const handleLunchEnd = (e) => {
		const value = e.target.value;
		setLunchEnd(value);
		setEndLunch0(value);
		setEndLunch1(value);
		setEndLunch2(value);
		setEndLunch3(value);
		setEndLunch4(value);
		setEndLunch5(value);
		setEndLunch6(value);
	};

	const handleTimeClose = (e) => {
		const value = e.target.value;
		setTimeClose(value);
		setEndTime0(value);
		setEndTime1(value);
		setEndTime2(value);
		setEndTime3(value);
		setEndTime4(value);
		setEndTime5(value);
		setEndTime6(value);
	};

	return (
		<div className='w-full pb-5 lg:w-5/6 lg:mx-auto flex flex-col xl:flex-row xl-justify-center xl:gap-3'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>LOCATION SETTINGS</div>
				<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
					<form onSubmit={handleSubmit}>
						<label className='frmLabel'>Name</label>
						<div className='mb-2 ps-2'>
							<Input type='text' required={true} value={name} setValue={setName} />
						</div>
						<label className='frmLabel'>Address</label>
						<div className='ps-2'>
							<Input type='text' required={true} value={add} setValue={setAdd} />
						</div>
						<label className='frmLabel'>Address 2</label>
						<div className='ps-2'>
							<Input type='text' value={add2} setValue={setAdd2} />
						</div>
						<label className='frmLabel'>City</label>
						<div className='ps-2'>
							<Input type='text' required={true} value={city} setValue={setCity} />
						</div>
						<label className='frmLabel'>State</label>
						<div className='ps-2'>
							<select className='inpBorder form-control mb-2' required={true} value={state} onChange={(e) => setState(e.target.value)}>
								<option value=''>Select One...</option>
								<option value='AL'>Alabama</option>
								<option value='AK'>Alaska</option>
								<option value='AZ'>Arizona</option>
								<option value='AR'>Arkansas</option>
								<option value='CA'>California</option>
								<option value='CO'>Colorado</option>
								<option value='CT'>Connecticut</option>
								<option value='DE'>Delaware</option>
								<option value='DC'>District of Columbia</option>
								<option value='FL'>Florida</option>
								<option value='GA'>Georgia</option>
								<option value='HI'>Hawaii</option>
								<option value='ID'>Idaho</option>
								<option value='IL'>Illinois</option>
								<option value='IN'>Indiana</option>
								<option value='IA'>Iowa</option>
								<option value='KS'>Kansas</option>
								<option value='KY'>Kentucky</option>
								<option value='LA'>Louisiana</option>
								<option value='ME'>Maine</option>
								<option value='MD'>Maryland</option>
								<option value='MA'>Massachusetts</option>
								<option value='MI'>Michigan</option>
								<option value='MN'>Minnesota</option>
								<option value='MS'>Mississippi</option>
								<option value='MO'>Missouri</option>
								<option value='MT'>Montana</option>
								<option value='NE'>Nebraska</option>
								<option value='NV'>Nevada</option>
								<option value='NH'>New Hampshire</option>
								<option value='NJ'>New Jersey</option>
								<option value='NM'>New Mexico</option>
								<option value='NY'>New York</option>
								<option value='NC'>North Carolina</option>
								<option value='ND'>North Dakota</option>
								<option value='OH'>Ohio</option>
								<option value='OK'>Oklahoma</option>
								<option value='OR'>Oregon</option>
								<option value='PA'>Pennsylvania</option>
								<option value='RI'>Rhode Island</option>
								<option value='SC'>South Carolina</option>
								<option value='SD'>South Dakota</option>
								<option value='TN'>Tennessee</option>
								<option value='TX'>Texas</option>
								<option value='UT'>Utah</option>
								<option value='VT'>Vermont</option>
								<option value='VA'>Virginia</option>
								<option value='WA'>Washington</option>
								<option value='WV'>West Virginia</option>
								<option value='WI'>Wisconsin</option>
								<option value='WY'>Wyoming</option>
							</select>
						</div>
						<label className='frmLabel'>Zip Code</label>
						<div className='ps-2'>
							<Input type='text' required={true} value={zip} setValue={setZip} />
						</div>
						<label className='frmLabel'>Phone</label>
						<div className='ps-2'>
							<Input type='text' required={true} value={phone} funcCall={handlePhone} />
						</div>
						<label className='frmLabel'>Start Day</label>
						<div className='ps-2'>
							<select className='inpBorder form-control mb-2' value={dayStart} onChange={(e) => setDayStart(e.target.value)}>
								{dayEnd !== '0' && <option value='0'>Sunday</option>}
								{dayEnd !== '1' && <option value='1'>Monday</option>}
								{dayEnd !== '2' && <option value='2'>Tuesday</option>}
								{dayEnd !== '3' && <option value='3'>Wednesday</option>}
								{dayEnd !== '4' && <option value='4'>Thursday</option>}
								{dayEnd !== '5' && <option value='5'>Friday</option>}
								{dayEnd !== '6' && <option value='6'>Saturday</option>}
							</select>
						</div>
						<label className='frmLabel'>End Day</label>
						<div className='ps-2'>
							<select className='inpBorder form-control mb-2' value={dayEnd} onChange={(e) => setDayEnd(e.target.value)}>
								{dayStart !== '0' && <option value='0'>Sunday</option>}
								{dayStart !== '1' && <option value='1'>Monday</option>}
								{dayStart !== '2' && <option value='2'>Tuesday</option>}
								{dayStart !== '3' && <option value='3'>Wednesday</option>}
								{dayStart !== '4' && <option value='4'>Thursday</option>}
								{dayStart !== '5' && <option value='5'>Friday</option>}
								{dayStart !== '6' && <option value='6'>Saturday</option>}
							</select>
						</div>
						<div className='mb-2 flex flex-row items-center'>
							<div className='w-1/6 flex justify-end'>
								<input className='chkBox' type='checkbox' checked={sameTimes} onChange={(e) => handleShwDiv(e)} />
							</div>
							<div className='w-5/6 ps-2'>
								<div className='text-sm'>Set all times the same</div>
							</div>
						</div>
						{shwSame ? (
							<>
								<label className='frmLabel'>Open Time</label>
								<div className='ps-2'>
									<Input type='time' value={timeOpen} funcCall={handleTimeOpen} />
								</div>
								<label className='frmLabel'>Lunch Start Time</label>
								<div className='ps-2'>
									<Input type='time' value={lunchStart} funcCall={handleLunchStart} />
								</div>
								<label className='frmLabel'>Lunch End Time</label>
								<div className='ps-2'>
									<Input type='time' value={lunchEnd} funcCall={handleLunchEnd} />
								</div>
								<label className='frmLabel'>Close Time</label>
								<div className='ps-2'>
									<Input type='time' value={timeClose} funcCall={handleTimeClose} />
								</div>
							</>
						) : (
							<>
								{(dayStart === '0' || dayEnd === '0' || (dayStart >= 4 && dayEnd <= 1)) && (
									<>
										<label className='frmLabel'>Sunday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime0} setValue={setStartTime0} />
										</div>
										<label className='frmLabel'>Sunday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch0} setValue={setStartLunch0} />
										</div>
										<label className='frmLabel'>Sunday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch0} setValue={setEndLunch0} />
										</div>
										<label className='frmLabel'>Sunday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime0} setValue={setEndTime0} />
										</div>
									</>
								)}
								{dayStart <= '1' && (
									<>
										<label className='frmLabel'>Monday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime1} setValue={setStartTime1} />
										</div>
										<label className='frmLabel'>Monday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch1} setValue={setStartLunch1} />
										</div>
										<label className='frmLabel'>Monday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch1} setValue={setEndLunch1} />
										</div>
										<label className='frmLabel'>Monday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime1} setValue={setEndTime1} />
										</div>
									</>
								)}
								{dayStart <= '2' && dayEnd >= '2' && (
									<>
										<label className='frmLabel'>Tuesday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime2} setValue={setStartTime2} />
										</div>
										<label className='frmLabel'>Tuesday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch2} setValue={setStartLunch2} />
										</div>
										<label className='frmLabel'>Tuesday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch2} setValue={setEndLunch2} />
										</div>
										<label className='frmLabel'>Tuesday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime2} setValue={setEndTime2} />
										</div>
									</>
								)}
								{dayStart <= '3' && (
									<>
										<label className='frmLabel'>Wednesday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime3} setValue={setStartTime3} />
										</div>
										<label className='frmLabel'>Wednesday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch3} setValue={setStartLunch3} />
										</div>
										<label className='frmLabel'>Wednesday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch3} setValue={setEndLunch3} />
										</div>
										<label className='frmLabel'>Wednesday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime3} setValue={setEndTime3} />
										</div>
									</>
								)}
								{(dayStart <= '4' || dayEnd <= '4') && (
									<>
										<label className='frmLabel'>Thursday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime4} setValue={setStartTime4} />
										</div>
										<label className='frmLabel'>Thursday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch4} setValue={setStartLunch4} />
										</div>
										<label className='frmLabel'>Thursday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch4} setValue={setEndLunch4} />
										</div>
										<label className='frmLabel'>Thursday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime4} setValue={setEndTime4} />
										</div>
									</>
								)}
								{(dayStart <= '5' || dayEnd <= '5') && (
									<>
										<label className='frmLabel'>Friday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime5} setValue={setStartTime5} />
										</div>
										<label className='frmLabel'>Friday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch5} setValue={setStartLunch5} />
										</div>
										<label className='frmLabel'>Friday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch5} setValue={setEndLunch5} />
										</div>
										<label className='frmLabel'>Friday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime5} setValue={setEndTime5} />
										</div>
									</>
								)}
								{((dayStart <= '6' && dayEnd <= '3') || dayEnd === '6') && (
									<>
										<label className='frmLabel'>Saturday Open Time</label>
										<div className='ps-2'>
											<Input type='time' value={startTime6} setValue={setStartTime6} />
										</div>
										<label className='frmLabel'>Saturday Lunch Start Time</label>
										<div className='ps-2'>
											<Input type='time' value={startLunch6} setValue={setStartLunch6} />
										</div>
										<label className='frmLabel'>Saturday Lunch End Time</label>
										<div className='ps-2'>
											<Input type='time' value={endLunch6} setValue={setEndLunch6} />
										</div>
										<label className='frmLabel'>Saturday Close Time</label>
										<div className='ps-2'>
											<Input type='time' value={endTime6} setValue={setEndTime6} />
										</div>
									</>
								)}
							</>
						)}
						<div className='mt-5 flex justify-center'>
							<Button type='submit' disabled={!name || !add || !city || !state || !zip || !phone}>
								Save Changes
							</Button>
						</div>
					</form>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					<div className='mb-3 text-lg font-semibold text-center'>LOCATION SETTINGS</div>
					<div>
						Please fill out your first location information. You can add more locations in the Physician Sphere when the Quick Start is complete.
					</div>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
