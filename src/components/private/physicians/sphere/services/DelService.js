'use client';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelService() {
	const [menu, setMenu] = useContext(MenuContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [service, setService] = useState({});
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(ecomm.selSvc).length !== 0 && (Object.keys(service).length === 0 || service._id !== ecomm.selSvc._id)) {
			setService(ecomm.selSvc);
		}
	}, [ecomm.selSvc, service]);

	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);
		const svcId = service._id;

		//Remove the object from the services context
		let tmpArr = ecomm.services;
		tmpArr = tmpArr.filter((item) => item._id !== svcId);
		setEcomm({ cats: ecomm.cats, selCat: ecomm.selCat, services: tmpArr, selSvc: {} });

		//delete the category and associated data from database
		await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/delete?svcid=${svcId}`, {
			method: 'DELETE',
		});

		toast.success('Service deleted successfully');
		setLoading(false);
		handleClose();
	};

	function handleClose() {
		setMenu({ type: menu.type, func: '', refresh: true });
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
					{office.locations.length >= 2 && <p>Please Note: Deleting this service only applies to the location selected, it will not affect other locations.</p>}
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
