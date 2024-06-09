import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MiscContext } from '@/utils/context/global/MiscContext';
import Image from 'next/image';
import MapDisplay from '@/components/global/map/MapDisplay';
import noImg from '@/assets/images/noProfile.png';

export default function OfficeData() {
	const [misc] = useContext(MiscContext);
	const [location, setLocation] = useState({});
	const [physician, setPhysician] = useState({});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocation = useCallback(async () => {
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
	}, [misc]);

	const loadPhysician = useCallback(async () => {
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
	}, [misc]);

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
			<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkblu'>LOCATION</div>
		</>
	);
}
