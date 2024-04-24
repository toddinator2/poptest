'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { storage } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelUser() {
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUser = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/users/get/byid?id=${misc.editId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setUser(data.user);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadUser();
	}, [loadUser]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);
		const userId = user._id;

		//Remove photo
		if (user.photo) {
			const picRef = ref(storage, user.photo);
			await deleteObject(picRef);
		}

		try {
			//delete the user from database
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/users/delete?userid=${userId}`, {
				method: 'DELETE',
			});
			const data = await response.json();

			if (data.status === 200) {
				setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '' });
				toast.success('User deleted successfully');
			}
		} catch (err) {
			toast.error(err);
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
					<div className='colHdng'>Delete User</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row'>
				<div className='alertSubHdng mb-3 text-center'>CAUTION: This cannot be undone!</div>
				<div className='alertText text-center'>
					<p>Please make sure you have reassigned all data for this user to another user, location, or other physician.</p>
					<p>All associated data for this user, by location(s), will be deleted as well.</p>
					<p>Main things to reassign are:</p>
					<div className='text-center'>
						<strong>Appointments</strong> with this user
						<br />
						<strong>Calendar Column</strong> users
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
