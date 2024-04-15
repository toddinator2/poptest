'use client';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { CompareByName } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function EdtCategory() {
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [category, setCategory] = useState({});
	const [name, setName] = useState('');
	const [color, setColor] = useState('');
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(ecomm.selCat).length !== 0 && (Object.keys(category).length === 0 || category._id !== ecomm.selCat._id)) {
			setCategory(ecomm.selCat);
		}
	}, [ecomm.selCat, category]);

	useEffect(() => {
		if (Object.keys(category).length !== 0) {
			if (category.name !== '' && category.name !== undefined) {
				setName(category.name);
			} else {
				setName('');
			}
			if (category.color !== '' && category.color !== undefined) {
				setColor(category.color);
			} else {
				setColor('');
			}
		}
	}, [category]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		//create object to update the categories context
		const updObj = {
			_id: category._id,
			name,
			color,
			locationObjId: category.locationObjId,
			office: category.officeObjId,
		};

		try {
			//update the category context array
			const searchedObj = category;
			const replacingObj = updObj;

			const i = ecomm.cats.findIndex((x) => x._id === searchedObj._id);
			ecomm.cats[i] = replacingObj;

			//sort array alphabetically by name
			const newCats = ecomm.cats.sort(CompareByName);
			setEcomm({ cats: newCats, selCat: {}, services: ecomm.services, selSvc: {} });

			//update the database
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/category/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: category._id,
					name,
					color,
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
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
			handleClose();
		}
	};

	const handleClose = () => {
		setName('');
		setColor('');
		setMenu({ type: menu.type, func: '', refresh: true });
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Edit Category</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-12 col-xl-8'>
					<form onSubmit={handleSubmit}>
						<Input label='Name' type='text' id='name' value={name} setValue={setName} />
						<Input label='Color' type='color' value={color} setValue={setColor} />
						<div className='row mt-4 d-flex justify-content-center'>
							<Button border='ff0000' disabled={!name}>
								Save Changes
							</Button>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</>
	);
}
