import React, { useContext, useEffect, useState } from 'react';
import './PhysicianSearch.css';
import { MiscContext } from '@/utils/context/global/MiscContext';
import Image from 'next/image';
import MapDisplay from '@/components/global/map/MapDisplay';
import noImg from '@/assets/images/noProfile.png';

export default function OfficeComponent() {
	const [misc] = useContext(MiscContext);
	const [location, setLocation] = useState({});
	const [physician, setPhysician] = useState({});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocation = async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/byid?locid=${misc.props.locId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLocation(data.loc);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	};

	const loadPhysician = async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/office/users/get/byid?id=${misc.props.phyId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setPhysician(data.phy);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(location).length === 0 || location === undefined) {
			loadLocation();
		}
	}, [location, loadLocation]);

	useEffect(() => {
		if (Object.keys(physician).length === 0 || physician === undefined) {
			loadPhysician();
		}
	}, [physician, loadPhysician]);

	return (
		<>
			<div className='sphContHdrDiv blu'>Location</div>
			<div className='sphSubContainer'>
				<div className='row mt-3 mb-2'>
					<div className='col-12 d-flex justify-content-center'>
						{physician.photo ? (
							<Image className='ocPhoto' src={physician.photo} width={100} height={100} alt='Photo' />
						) : (
							<Image className='ocPhoto' src={noImg} width={100} height={100} alt='No Photo' />
						)}
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ocTextLg'>{physician.title}</div>
					</div>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ocTextSm'>{physician.specialty}</div>
					</div>
				</div>
				<div className='row mb-4'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ocTextLg'>{physician.ofcName}</div>
					</div>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ocTextSm'>{location.name}</div>
					</div>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ocTextSm'>{location.phone}</div>
					</div>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ocTextSm'>{location.address}</div>
					</div>
					{location.address2 && (
						<div className='col-12 d-flex justify-content-center'>
							<div className='ocTextSm'>{location.address2}</div>
						</div>
					)}
					{location.city && location.state && location.zip && (
						<div className='col-12 d-flex justify-content-center'>
							<div className='ocTextSm'>
								{location.city}, {location.state}&nbsp;&nbsp;{location.zip}
							</div>
						</div>
					)}
				</div>
				{location.latitude && location.longitude && (
					<div className='row'>
						<div className='col-10 offset-1'>
							<MapDisplay lat={location.latitude} lng={location.longitude} />
						</div>
					</div>
				)}
			</div>
		</>
	);
}
