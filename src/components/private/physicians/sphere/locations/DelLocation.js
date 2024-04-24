'use client';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelLocation() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);
		const locId = misc.editId;
		try {
			//delete the location and associated data from database
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/locations/delete?locid=${locId}&ofcid=${auth.user.ofcObjId}`, {
				method: 'DELETE',
			});
			const data = await response.json();

			if (data.status === 200) {
				setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '' });
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		} finally {
			setLoading(false);
			handleClose();
		}
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
