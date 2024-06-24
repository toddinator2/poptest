import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import MapDisplay from '@/components/global/map/MapDisplay';

export default function OfficeInfo() {
	const [menu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [location, setLocation] = useState({});
	const [lat, setLat] = useState('');
	const [lng, setLng] = useState('');
	const [title, setTitle] = useState('');
	const [photo, setPhoto] = useState('');
	const [inits, setInits] = useState('');
	const [ofcName, setOfcName] = useState('');
	const [specialty, setSpecialty] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocation = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/byid?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLocation(data.loc);
				setLat(data.loc.latitude);
				setLng(data.loc.longitude);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [misc]);

	const loadPhysician = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/users/get/byid?id=${misc.props.phyId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				let inis = '';
				let picUrl = '';
				if (!data.user.photo || data.user.photo === undefined) {
					//create initials
					const fname = data.user.fname;
					const lname = data.user.lname;
					const finit = fname.slice(0, 1);
					const linit = lname.slice(0, 1);
					inis = (finit + linit).toUpperCase();
				} else {
					picUrl = data.user.photo;
				}

				setInits(inis);
				setPhoto(picUrl);
				setTitle(data.user.title);
				setSpecialty(data.user.specialty);
				setOfcName(data.ofcName);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadLocation();
	}, [loadLocation]);

	useEffect(() => {
		loadPhysician();
	}, [loadPhysician]);

	return (
		<>
			{menu.func === 'phySchOfcInfo' ? (
				<div className='py-2 mb-3 text-xl font-bold text-center border-b-4 border-drkblu'>{ofcName.toUpperCase()}</div>
			) : (
				<div className='py-2 mb-3 text-xl font-bold text-center border-b-4 border-drkred'>{ofcName.toUpperCase()}</div>
			)}
			<div className='mb-5 flex justify-center'>
				<div className='flex flex-row items-center'>
					<div className='me-2'>
						{photo ? (
							<Image className='rounded-full' src={photo} width={50} height={50} alt='img' />
						) : (
							<div className='text-3xl font-bold text-lgtred'>{inits}</div>
						)}
					</div>
					<div className='ms-2'>
						<div className='text-base font-semibold'>{title}</div>
						<div className='text-xs'>{specialty}</div>
					</div>
				</div>
			</div>
			<div className='text-lg leading-5 font-bold text-center text-lgtred'>{ofcName.toUpperCase()}</div>
			<div className='text-lg font-semibold text-center'>{location.name}</div>
			<div className='mb-3 text-sm text-center'>{location.phone}</div>
			{!location.address2 ? (
				<div className='text-sm text-center'>{location.address}</div>
			) : (
				<div className='text-sm text-center'>
					{location.address}&nbsp;&nbsp;{location.address2}
				</div>
			)}
			{location.city && location.state && location.zip && (
				<div className='text-sm text-center'>
					{location.city}, {location.state}&nbsp;&nbsp;{location.zip}
				</div>
			)}
			{lat && lng && (
				<div className='w-5/6 mx-auto my-5'>
					<MapDisplay lat={lat} lng={lng} />
				</div>
			)}
		</>
	);
}
