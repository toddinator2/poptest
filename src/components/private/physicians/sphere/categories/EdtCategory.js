'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function EdtCategory() {
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [category, setCategory] = useState({});
	const [name, setName] = useState('');
	const [color, setColor] = useState('');
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadCategory = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/category/get/byid?id=${misc.editId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setCategory(data.cat);
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
		loadCategory();
	}, [loadCategory]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VARIABLES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(category).length !== 0 && !name) {
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
	}, [category, name]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
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
				setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '' });
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
		setMenu({ type: menu.type, func: '' });
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
