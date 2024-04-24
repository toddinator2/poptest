'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelService() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [service, setService] = useState({});
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadService = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/get/byid?id=${misc.editId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setService(data.svc);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadService();
	}, [loadService]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);

		//delete the category and associated data from database
		await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/delete?svcid=${misc.editId}`, {
			method: 'DELETE',
		});

		toast.success('Service deleted successfully');
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: service.catObjId });
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
					<div className='colHdng'>Delete Service</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row'>
				<div className='alertSubHdng mb-3 text-center'>CAUTION: This cannot be undone!</div>
				<div className='alertText text-center'>
					{auth.user.locObjId.length >= 2 && (
						<p>Please Note: Deleting this service only applies to the location selected, it will not affect other locations.</p>
					)}
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
