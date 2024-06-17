import React, { useCallback, useContext, useEffect, useState } from 'react';
import { geocode, RequestType } from 'react-geocode';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { FormatPhoneNumber } from '@/components/global/functions/Functions';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Checklist from '../checklist/Checklist';

export default function Location({ type }) {
	const gglKey = process.env.MAPS_KEY;
	const [auth] = useContext(AuthContext);
	const [name, setName] = useState('');
	const [add, setAdd] = useState('');
	const [add2, setAdd2] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [zip, setZip] = useState('');
	const [phone, setPhone] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocation = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/locations/get/byid?locid=${auth.user.locObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setName(data.location.name);
				setPhone(data.location.phone);
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

		if (type !== 'private') {
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
		}

		try {
			const response = await fetch(`${process.env.API_URL}/sponsors/setup/edit/location`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: auth.user.locObjId,
					name,
					address: add,
					address2: add2,
					city,
					state,
					zip,
					phone,
					latitude,
					longitude,
					spnid: auth.user.spnObjId,
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

	return (
		<div className='w-full pb-5 lg:w-5/6 lg:mx-auto flex flex-col xl:flex-row xl-justify-center xl:gap-3'>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkred rounded-2xl order-2 xl:order-1'>
				{type === 'private' ? (
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>ADDRESS &amp; PHONE</div>
				) : (
					<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>LOCATION SETTINGS</div>
				)}
				<div className='w-5/6 mx-auto px-2 py-3 flex flex-col'>
					<form onSubmit={handleSubmit}>
						{type !== 'private' && (
							<>
								<label className='frmLabel'>Name</label>
								<div className='mb-2 ps-2'>
									<Input type='text' required={true} value={name} setValue={setName} />
								</div>
							</>
						)}
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
						{type !== 'private' && (
							<>
								<label className='frmLabel'>Phone</label>
								<div className='ps-2'>
									<Input type='text' required={true} value={phone} funcCall={handlePhone} />
								</div>
							</>
						)}
						{type === 'private' ? (
							<div className='mt-5 flex justify-center'>
								<Button type='submit' disabled={!add || !city || !state || !zip}>
									Save Changes
								</Button>
							</div>
						) : (
							<div className='mt-5 flex justify-center'>
								<Button type='submit' disabled={!name || !add || !city || !state || !zip || !phone}>
									Save Changes
								</Button>
							</div>
						)}
					</form>
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto mb-3 xl:mb-0 border-4 border-drkblu rounded-2xl order-1 xl:order-2'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>DETAILS</div>
				<div className='w-5/6 mx-auto py-3 flex flex-col'>
					{type === 'private' ? (
						<>
							<div className='mb-3 text-lg font-semibold text-center'>RESPONSIBLE PARTY</div>
							<div>Please fill out your address information. You can always change it and update it later in your Sponsor Sphere.</div>
						</>
					) : (
						<>
							<div className='mb-3 text-lg font-semibold text-center'>LOCATION SETTINGS</div>
							<div>
								Please fill out your first location information. You can add more locations in the Sponsor Sphere when the setup process is
								complete.
							</div>
						</>
					)}
				</div>
			</div>
			<div className='w-5/6 md:w-2/3 xl:w-1/3 mx-auto border-4 border-drkppl rounded-2xl order-3'>
				<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkppl'>SETUP CHECKLIST</div>
				<Checklist />
			</div>
		</div>
	);
}
