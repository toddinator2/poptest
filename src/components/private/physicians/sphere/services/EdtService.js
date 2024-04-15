'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { CompareByName, FormatCurrency } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function EdtService() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [service, setService] = useState({});
	const [name, setName] = useState('');
	const [fmtPrice, setFmtPrice] = useState('');
	const [price, setPrice] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(ecomm.selSvc).length !== 0 && (Object.keys(service).length === 0 || service._id !== ecomm.selSvc._id)) {
			setService(ecomm.selSvc);
		}
	}, [ecomm.selSvc, service]);

	useEffect(() => {
		if (Object.keys(service).length !== 0) {
			if (service.name !== '' && service.name !== undefined) {
				setName(service.name);
			} else {
				setName('');
			}
			if (service.price !== '' && service.price !== undefined) {
				setPrice(service.price);
				const tmpPrice = FormatCurrency(service.price);
				setFmtPrice(tmpPrice);
			} else {
				setPrice('');
				setFmtPrice('');
			}
		}
	}, [service]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//create object to update the services context
		const updObj = {
			_id: service._id,
			name,
			price,
			catObjId: ecomm.selCat._id,
			locationObjId: office.selLoc,
			office: auth.user.ofcObjId,
		};

		try {
			//update the services context array
			const searchedObj = service;
			const replacingObj = updObj;

			const i = ecomm.services.findIndex((x) => x._id === searchedObj._id);
			ecomm.services[i] = replacingObj;

			//sort array alphabetically by name
			const newSvcs = ecomm.services.sort(CompareByName);
			setEcomm({ cats: ecomm.cats, selCat: ecomm.selCat, services: newSvcs, selSvc: {} });

			//update the database
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: service._id,
					name,
					price,
				}),
			});
			const data = await response.json();

			if (data.status === 400) {
				toast.error(data.msg);
				document.getElementById('name').focus();
				return;
			}

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	function handleClose() {
		setName('');
		setFmtPrice('');
		setPrice('');
		setMenu({ type: menu.type, func: '', refresh: true });
	}

	function handlePrice(e) {
		const value = e.target.value;
		const tmpPrice = FormatCurrency(value);
		setFmtPrice(tmpPrice);
		setPrice(value.replace(/[^\d]/g, ''));
	}

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Edit Service</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-12 col-xl-8'>
					<form onSubmit={handleSubmit}>
						<Input label='Name' type='text' id='name' required={true} value={name} setValue={setName} />
						<Input label='Price' type='text' required={true} value={fmtPrice} funcCall={handlePrice} />
						<div className='mt-4 d-flex justify-content-center'>
							<Button type='submit' border='ff0000' disabled={!name || !price}>
								Save Changes
							</Button>
						</div>
					</form>
				</div>
			</div>
			{loading && <Spinner />}
		</>
	);
}
