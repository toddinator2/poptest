import React, { useCallback, useContext, useEffect, useState } from 'react';
import './OfficeData.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import MapDisplay from '../../../../../../../global/map/MapDisplay';

export default function OfficeData() {
	const [auth] = useContext(AuthContext);
	const [misc] = useContext(MiscContext);
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
				loadPhysician(data.loc);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [misc, loadPhysician]);

	const loadPhysician = useCallback(
		async (loc) => {
			let ttl = '';
			for (let i = 0; i < auth.user.offices.length; i++) {
				const ofc = auth.user.offices[i];
				if (ofc.id === misc.defLocId) {
					ttl = ofc.phy;
					break;
				}
			}

			try {
				const response = await fetch(`${process.env.API_URL}/physicians/office/users/get/forpatient?ofcid=${loc.officeObjId}&title=${ttl}`, {
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
					setTitle(ttl);
					setSpecialty(data.user.specialty);
					setOfcName(data.user.ofcName);
				}
			} catch (err) {
				toast.error(err);
			}
		},
		[auth, misc]
	);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadLocation();
	}, [loadLocation]);

	return (
		<>
			<div className='row'>
				<div className='col-3'>
					{photo ? <Image className='phyImg' src={photo} width={50} height={50} alt='img' /> : <div className='phyInits'>{inits}</div>}
				</div>
				<div className='col-9'>
					<div className='row'>
						<div className='col'>
							<div>
								<strong>{title}</strong>
							</div>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col'>
							<div>{specialty}</div>
						</div>
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-3'></div>
				<div className='col-9'>
					<div className='row'>
						<div className='col'>
							<div>
								<strong>{ofcName.toUpperCase()}</strong>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div>
								<strong>{location.name}</strong>
							</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div>{location.phone}</div>
						</div>
					</div>
					<div className='row'>
						<div className='col'>
							<div>{location.address}</div>
						</div>
					</div>
					{location.address2 && (
						<div className='row'>
							<div className='col'>
								<div>{location.address2}</div>
							</div>
						</div>
					)}
					{location.city && location.state && location.zip && (
						<div className='row mb-3'>
							<div className='col'>
								<div>
									{location.city}, {location.state}&nbsp;&nbsp;{location.zip}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
			{lat && lng && (
				<div className='row'>
					<div className='col-12'>
						<MapDisplay lat={lat} lng={lng} />
					</div>
				</div>
			)}
		</>
	);
}
