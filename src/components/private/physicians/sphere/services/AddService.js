'use client';
import React, { useContext, useState } from 'react';
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

export default function AddService() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [name, setName] = useState('');
	const [fmtPrice, setFmtPrice] = useState('');
	const [price, setPrice] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					price,
					catObjId: ecomm.selCat._id,
					locationObjId: office.selLoc,
					officeObjId: auth.user.ofcObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 400) {
				toast.error(data.msg);
				document.getElementById('name').focus();
				return;
			}

			//set current services
			let tmpArr = [];
			tmpArr = ecomm.services;

			//get new service and add to current services
			const newResponse = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/get/bydata?name=${name}&catid=${ecomm.selCat._id}`, {
				method: 'GET',
			});
			const svcData = await newResponse.json();

			if (svcData.status === 200) {
				tmpArr.push(svcData.svc);

				//sort array alphabetically by name
				await tmpArr.sort(CompareByName);

				setEcomm({ cats: ecomm.cats, selCat: {}, services: tmpArr, selSvc: {} });
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
					<div className='colHdng'>Add Service</div>
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
						<div className='my-3 d-flex justify-content-center'>
							<Button type='submit' border='ff0000' disabled={!name || !price}>
								Save Service
							</Button>
						</div>
					</form>
				</div>
			</div>
			{loading && <Spinner />}
		</>
	);
}
