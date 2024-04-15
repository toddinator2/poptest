'use client';
import React, { useContext, useEffect, useState } from 'react';
import { geocode, RequestType } from 'react-geocode';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { CompareByLabel, CompareByName, FormatPhoneNumber } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';
import CheckBox from '@/components/global/forms/checkbox/Checkbox';

export default function EdtLocation() {
	const gglKey = process.env.MAPS_KEY;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [location, setLocation] = useState({});
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
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(office.selLoc).length !== 0 && (Object.keys(location).length === 0 || location._id !== office.selLoc._id)) {
			setLocation(office.selLoc);
		}
	}, [office.selLoc, location]);

	useEffect(() => {
		if (Object.keys(location).length !== 0) {
			if (location.name !== '' && location.name !== undefined) {
				setName(location.name);
			} else {
				setName('');
			}
			if (location.address !== '' && location.address !== undefined) {
				setAdd(location.address);
			} else {
				setAdd('');
			}
			if (location.address2 !== '' && location.address2 !== undefined) {
				setAdd2(location.address2);
			} else {
				setAdd2('');
			}
			if (location.city !== '' && location.city !== undefined) {
				setCity(location.city);
			} else {
				setCity('');
			}
			if (location.state !== '' && location.state !== undefined) {
				setState(location.state);
			} else {
				setState('');
			}
			if (location.zip !== '' && location.zip !== undefined) {
				setZip(location.zip);
			} else {
				setZip('');
			}
			if (location.phone !== '' && location.phone !== undefined) {
				setPhone(location.phone);
			} else {
				setPhone('');
			}
			if (location.startday !== '' && location.startday !== undefined) {
				setDayStart(location.startday);
			} else {
				setDayStart(1);
			}
			if (location.endday !== '' && location.endday !== undefined) {
				setDayEnd(location.endday);
			} else {
				setDayEnd(5);
			}
			if (location.sametimes && location.sametimes !== undefined) {
				setSameTimes(true);
				setTimeOpen(location.starttime0);
				setLunchStart(location.startlunch0);
				setLunchEnd(location.endlunch0);
				setTimeClose(location.endtime0);
				setShwSame(true);
			} else {
				setSameTimes(false);
				setTimeOpen('');
				setLunchStart('');
				setLunchEnd('');
				setTimeClose('');
				setShwSame(false);
			}
			if (location.starttime0 !== '' && location.starttime0 !== undefined) {
				setStartTime0(location.starttime0);
			} else {
				setStartTime0('');
			}
			if (location.startlunch0 !== '' && location.startlunch0 !== undefined) {
				setStartLunch0(location.startlunch0);
			} else {
				setStartLunch0('');
			}
			if (location.endlunch0 !== '' && location.endlunch0 !== undefined) {
				setEndLunch0(location.endlunch0);
			} else {
				setEndLunch0('');
			}
			if (location.endtime0 !== '' && location.endtime0 !== undefined) {
				setEndTime0(location.endtime0);
			} else {
				setEndTime0('');
			}
			if (location.starttime1 !== '' && location.starttime1 !== undefined) {
				setStartTime1(location.starttime1);
			} else {
				setStartTime1('');
			}
			if (location.startlunch1 !== '' && location.startlunch1 !== undefined) {
				setStartLunch1(location.startlunch1);
			} else {
				setStartLunch1('');
			}
			if (location.endlunch1 !== '' && location.endlunch1 !== undefined) {
				setEndLunch1(location.endlunch1);
			} else {
				setEndLunch1('');
			}
			if (location.endtime1 !== '' && location.endtime1 !== undefined) {
				setEndTime1(location.endtime1);
			} else {
				setEndTime1('');
			}
			if (location.starttime2 !== '' && location.starttime2 !== undefined) {
				setStartTime2(location.starttime2);
			} else {
				setStartTime2('');
			}
			if (location.startlunch2 !== '' && location.startlunch2 !== undefined) {
				setStartLunch2(location.startlunch2);
			} else {
				setStartLunch2('');
			}
			if (location.endlunch2 !== '' && location.endlunch2 !== undefined) {
				setEndLunch2(location.endlunch2);
			} else {
				setEndLunch2('');
			}
			if (location.endtime2 !== '' && location.endtime2 !== undefined) {
				setEndTime2(location.endtime2);
			} else {
				setEndTime2('');
			}
			if (location.starttime3 !== '' && location.starttime3 !== undefined) {
				setStartTime3(location.starttime3);
			} else {
				setStartTime3('');
			}
			if (location.startlunch3 !== '' && location.startlunch3 !== undefined) {
				setStartLunch3(location.startlunch3);
			} else {
				setStartLunch3('');
			}
			if (location.endlunch3 !== '' && location.endlunch3 !== undefined) {
				setEndLunch3(location.endlunch3);
			} else {
				setEndLunch3('');
			}
			if (location.endtime3 !== '' && location.endtime3 !== undefined) {
				setEndTime3(location.endtime3);
			} else {
				setEndTime3('');
			}
			if (location.starttime4 !== '' && location.starttime4 !== undefined) {
				setStartTime4(location.starttime4);
			} else {
				setStartTime4('');
			}
			if (location.startlunch4 !== '' && location.startlunch4 !== undefined) {
				setStartLunch4(location.startlunch4);
			} else {
				setStartLunch4('');
			}
			if (location.endlunch4 !== '' && location.endlunch4 !== undefined) {
				setEndLunch4(location.endlunch4);
			} else {
				setEndLunch4('');
			}
			if (location.endtime4 !== '' && location.endtime4 !== undefined) {
				setEndTime4(location.endtime4);
			} else {
				setEndTime4('');
			}
			if (location.starttime5 !== '' && location.starttime5 !== undefined) {
				setStartTime5(location.starttime5);
			} else {
				setStartTime5('');
			}
			if (location.startlunch5 !== '' && location.startlunch5 !== undefined) {
				setStartLunch5(location.startlunch5);
			} else {
				setStartLunch5('');
			}
			if (location.endlunch5 !== '' && location.endlunch5 !== undefined) {
				setEndLunch5(location.endlunch5);
			} else {
				setEndLunch5('');
			}
			if (location.endtime5 !== '' && location.endtime5 !== undefined) {
				setEndTime5(location.endtime5);
			} else {
				setEndTime5('');
			}
			if (location.starttime6 !== '' && location.starttime6 !== undefined) {
				setStartTime6(location.starttime6);
			} else {
				setStartTime6('');
			}
			if (location.startlunch6 !== '' && location.startlunch6 !== undefined) {
				setStartLunch6(location.startlunch6);
			} else {
				setStartLunch6('');
			}
			if (location.endlunch6 !== '' && location.endlunch6 !== undefined) {
				setEndLunch6(location.endlunch6);
			} else {
				setEndLunch6('');
			}
			if (location.endtime6 !== '' && location.endtime6 !== undefined) {
				setEndTime6(location.endtime6);
			} else {
				setEndTime6('');
			}
		}
	}, [location]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let latitude;
		let longitude;

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
				.catch((error) => {
					console.error(error);
				});
		}

		const updObj = {
			_id: location._id,
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
			deleteme: false,
			officeObjId: auth.user.ofcObjId,
		};
		const optObj = {
			label: name,
			value: location._id,
		};

		try {
			//update the locations context array
			const searchedObj = location;
			const searchedOptObj = office.locOptions;
			const replacingObj = updObj;
			const replacingOptObj = optObj;

			const i = office.locations.findIndex((x) => x._id === searchedObj._id);
			office.locations[i] = replacingObj;

			const o = office.locOptions.findIndex((x) => x.value === searchedOptObj.value);
			office.locOptions[o] = replacingOptObj;

			//sort array alphabetically by name
			office.locations.sort(CompareByName);
			office.locOptions.sort(CompareByLabel);

			//update the database
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/locations/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: location._id,
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
					deleteme: false,
					officeObjId: auth.user.ofcObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				setOffice({
					locations: office.locations,
					selLoc: {},
					locOptions: office.locOptions,
					defLoc: office.defLoc,
					users: office.users,
					selUser: {},
					resources: office.resources,
					selRscs: [],
					rscOptions: office.rscOptions,
				});
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	function handleClose() {
		setMenu({ type: menu.type, func: '' });
	}

	const handleShwDiv = async (e) => {
		e.preventDefault();
		const value = e.target.checked;
		setSameTimes(value);
		setShwSame(!shwSame);
	};

	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

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
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Edit Location</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-12 col-xl-8'>
					<form onSubmit={handleSubmit}>
						<Input label='Name' type='text' required={true} value={name} setValue={setName} />
						<Input label='Address' type='text' required={true} value={add} setValue={setAdd} />
						<Input label='Address 2' type='text' value={add2} setValue={setAdd2} />
						<Input label='City' type='text' required={true} value={city} setValue={setCity} />
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>State</label>
							</div>
							<div className='col-12'>
								<select className='form-control inpBorder' required={true} value={state} onChange={(e) => setState(e.target.value)}>
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
						</div>
						<Input label='Zip Code' type='text' required={true} value={zip} setValue={setZip} />
						<Input label='Phone' type='tel' required={true} value={phone} funcCall={handlePhone} />
						<div className='row mb-2'>
							<div className='col-12'>
								<label className='frmLabel'>Start Day</label>
							</div>
							<div className='col-12'>
								<select className='form-control inpBorder' value={dayStart} onChange={(e) => setDayStart(e.target.value)}>
									{dayEnd !== '0' && <option value='0'>Sunday</option>}
									{dayEnd !== '1' && <option value='1'>Monday</option>}
									{dayEnd !== '2' && <option value='2'>Tuesday</option>}
									{dayEnd !== '3' && <option value='3'>Wednesday</option>}
									{dayEnd !== '4' && <option value='4'>Thursday</option>}
									{dayEnd !== '5' && <option value='5'>Friday</option>}
									{dayEnd !== '6' && <option value='6'>Saturday</option>}
								</select>
							</div>
						</div>
						<div className='row mb-3'>
							<div className='col-12'>
								<label className='frmLabel'>End Day</label>
							</div>
							<div className='col-12'>
								<select className='form-control inpBorder' value={dayEnd} onChange={(e) => setDayEnd(e.target.value)}>
									{dayStart !== '0' && <option value='0'>Sunday</option>}
									{dayStart !== '1' && <option value='1'>Monday</option>}
									{dayStart !== '2' && <option value='2'>Tuesday</option>}
									{dayStart !== '3' && <option value='3'>Wednesday</option>}
									{dayStart !== '4' && <option value='4'>Thursday</option>}
									{dayStart !== '5' && <option value='5'>Friday</option>}
									{dayStart !== '6' && <option value='6'>Saturday</option>}
								</select>
							</div>
						</div>
						<div className='row mb-2 d-flex align-items-center'>
							<div className='col-2 pe-1 d-flex justify-content-end'>
								<CheckBox check={sameTimes} funcCall={handleShwDiv} />
							</div>
							<div className='col-10 ps-1'>
								<div>Set all times the same</div>
							</div>
						</div>
						{shwSame ? (
							<>
								<Input label='Open Time' type='time' value={timeOpen} funcCall={handleTimeOpen} />
								<Input label='Lunch Start Time' type='time' value={lunchStart} funcCall={handleLunchStart} />
								<Input label='Lunch End Time' type='time' value={lunchEnd} funcCall={handleLunchEnd} />
								<Input label='Close Time' type='time' value={timeClose} funcCall={handleTimeClose} />
							</>
						) : (
							<>
								{(dayStart === '0' || dayEnd === '0' || (dayStart >= 4 && dayEnd <= 1)) && (
									<>
										<Input label='Sunday Open Time' type='time' value={startTime0} setValue={setStartTime0} />
										<Input label='Sunday Lunch Start Time' type='time' value={startLunch0} setValue={setStartLunch0} />
										<Input label='Sunday Lunch End Time' type='time' value={endLunch0} setValue={setEndLunch0} />
										<Input label='Sunday Close Time' type='time' value={endTime0} setValue={setEndTime0} />
									</>
								)}
								{dayStart <= '1' && (
									<>
										<Input label='Monday Open Time' type='time' value={startTime1} setValue={setStartTime1} />
										<Input label='Monday Lunch Start Time' type='time' value={startLunch1} setValue={setStartLunch1} />
										<Input label='Monday Lunch End Time' type='time' value={endLunch1} setValue={setEndLunch1} />
										<Input label='Monday Close Time' type='time' value={endTime1} setValue={setEndTime1} />
									</>
								)}
								{dayStart <= '2' && dayEnd >= '2' && (
									<>
										<Input label='Tuesday Open Time' type='time' value={startTime2} setValue={setStartTime2} />
										<Input label='Tuesday Lunch Start Time' type='time' value={startLunch2} setValue={setStartLunch2} />
										<Input label='Tuesday Lunch End Time' type='time' value={endLunch2} setValue={setEndLunch2} />
										<Input label='Tuesday Close Time' type='time' value={endTime2} setValue={setEndTime2} />
									</>
								)}
								{dayStart <= '3' && (
									<>
										<Input label='Wednesday Open Time' type='time' value={startTime3} setValue={setStartTime3} />
										<Input label='Wednesday Lunch Start Time' type='time' value={startLunch3} setValue={setStartLunch3} />
										<Input label='Wednesday Lunch End Time' type='time' value={endLunch3} setValue={setEndLunch3} />
										<Input label='Wednesday Close Time' type='time' value={endTime3} setValue={setEndTime3} />
									</>
								)}
								{(dayStart <= '4' || dayEnd <= '4') && (
									<>
										<Input label='Thursday Open Time' type='time' value={startTime4} setValue={setStartTime4} />
										<Input label='Thursday Lunch Start Time' type='time' value={startLunch4} setValue={setStartLunch4} />
										<Input label='Thursday Lunch End Time' type='time' value={endLunch4} setValue={setEndLunch4} />
										<Input label='Thursday Close Time' type='time' value={endTime4} setValue={setEndTime4} />
									</>
								)}
								{(dayStart <= '5' || dayEnd <= '5') && (
									<>
										<Input label='Friday Open Time' type='time' value={startTime5} setValue={setStartTime5} />
										<Input label='Friday Lunch Start Time' type='time' value={startLunch5} setValue={setStartLunch5} />
										<Input label='Friday Lunch End Time' type='time' value={endLunch5} setValue={setEndLunch5} />
										<Input label='Friday Close Time' type='time' value={endTime5} setValue={setEndTime5} />
									</>
								)}
								{((dayStart <= '6' && dayEnd <= '3') || dayEnd === '6') && (
									<>
										<Input label='Saturday Open Time' type='time' value={startTime6} setValue={setStartTime6} />
										<Input label='Saturday Lunch Start Time' type='time' value={startLunch6} setValue={setStartLunch6} />
										<Input label='Saturday Lunch End Time' type='time' value={endLunch6} setValue={setEndLunch6} />
										<Input label='Saturday Close Time' type='time' value={endTime6} setValue={setEndTime6} />
									</>
								)}
							</>
						)}
						<div className='my-3 d-flex justify-content-center'>
							<Button type='submit' border='ff0000' disabled={!name || !add || !city || !state || !zip || !phone}>
								Save Changes
							</Button>
						</div>
					</form>
				</div>
			</div>
			{loading && <Spinner />}
		</>
	);
}
