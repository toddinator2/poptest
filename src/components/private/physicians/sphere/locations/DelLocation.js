'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelLocation() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [location, setLocation] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(office.selLoc).length !== 0 && (Object.keys(location).length === 0 || location._id !== office.selLoc._id)) {
			setLocation(office.selLoc);
		}
	}, [office.selLoc, location]);

	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);
		const locId = location._id;
		let arrUsers = [];
		let arrRscs = [];
		let arrOptsRscs = [];

		//Remove the object from the locations and location options context arrays
		let tmpArr = office.locations;
		let optsArr = office.locOptions;
		tmpArr = tmpArr.filter((item) => item._id !== locId);
		optsArr = optsArr.filter((item) => item.value !== locId);
		setOffice({ locations: tmpArr, selLoc: {}, locOptions: optsArr, defLoc: office.defLoc, users: office.users, resources: office.resources, rscOptions: office.rscOptions });

		//delete the location and associated data from database
		await fetch(`${process.env.API_URL}/private/physicians/office/locations/delete?locid=${locId}&ofcid=${auth.user.ofcObjId}`, {
			method: 'DELETE',
		});

		//reset office context
		const ofcResponse = await fetch(`${process.env.API_URL}/private/physicians/office/users/get/all?ofcid=${auth.user.ofcObjId}`, {
			method: 'GET',
		});
		const ofcData = await ofcResponse.json();
		const rscResponse = await fetch(`${process.env.API_URL}/private/physicians/office/resources/get/all?ofcid=${auth.user.ofcObjId}`, {
			method: 'GET',
		});
		const rscData = await rscResponse.json();

		if (ofcData?.status === 200) {
			arrUsers = ofcData?.users;
		}
		if (rscData?.status === 200) {
			arrRscs = rscData.rscs;

			//reset resource options as well
			if (rscData?.rscs.length !== 0) {
				let tmpOptsArr = [];
				const rscs = rscData?.rscs;
				for (let i = 0; i < rscs.length; i++) {
					const rsc = rscs[i];
					const _id = rsc._id;
					const name = rsc.name;
					tmpOptsArr.push({ _id, name });
				}
				arrOptsRscs = tmpOptsArr;
			}
		}

		setOffice({ locations: tmpArr, selLoc: {}, locOptions: optsArr, defLoc: office.defLoc, users: arrUsers, resources: arrRscs, rscOptions: arrOptsRscs });
		toast.success('Location deleted successfully');
		setLoading(false);
		handleClose();
	};

	function handleClose() {
		setMenu({ type: menu.type, func: '' });
	}

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Delete Location</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row'>
				<div className='alertSubHdng mb-3 text-center'>CAUTION: This cannot be undone!</div>
				<div className='alertText text-center'>
					<p>Please make sure you have reassigned all data for this location to another location or other physician.</p>
					<p>All associated data below for this location will be deleted as well:</p>
					<div className='text-center'>
						<strong>Appointments</strong> for this location
						<br />
						<strong>Users</strong> from this location and not associated with other locations
						<br />
						<strong>Calendar Column</strong> users
						<br />
						Task Categories
						<br />
						Task Items
						<br />
						Daily Tasks
					</div>
				</div>
			</div>
			<div className='row mt-4 d-flex justify-content-center'>
				<div className='col-auto pe-3 d-flex justify-content-end'>
					<Button border='0000ff' onClick={() => handleClose()}>
						Cancel
					</Button>
				</div>
				<div className='col-auto ps-3'>
					<Button border='ff0000' onClick={(e) => handleDelete(e)}>
						Confirm
					</Button>
				</div>
			</div>
			{loading && <Spinner />}
		</>
	);
}
