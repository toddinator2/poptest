'use client';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { FormatCurrency } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function AddService() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc] = useContext(MiscContext);
	const [name, setName] = useState('');
	const [fmtPrice, setFmtPrice] = useState('');
	const [price, setPrice] = useState('');
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
					catObjId: misc.editId,
					locationObjId: misc.defLocId,
					officeObjId: auth.user.ofcObjId,
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
