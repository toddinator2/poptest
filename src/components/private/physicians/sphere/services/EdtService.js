'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { FormatCurrency } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function EdtService() {
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [service, setService] = useState({});
	const [name, setName] = useState('');
	const [fmtPrice, setFmtPrice] = useState('');
	const [price, setPrice] = useState('');
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
	// SET STATE VARIABLES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: service._id,
					name,
					price,
					catObjId: service.catObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 400) {
				toast.error(data.msg);
				document.getElementById('name').focus();
				return;
			}

			if (data.status === 200) {
				setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: service.catObjId });
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	function handleClose() {
		setName('');
		setFmtPrice('');
		setPrice('');
		setMenu({ type: menu.type, func: '' });
	}

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
