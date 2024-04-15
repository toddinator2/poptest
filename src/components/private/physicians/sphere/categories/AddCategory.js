'use client';
import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { CompareByName } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function AddCategory() {
	const [auth] = useContext(AuthContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [name, setName] = useState('');
	const [color, setColor] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/category/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					color,
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

			if (data.status === 200) {
				//get new category for id
				const newResponse = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/category/get/bydata?name=${name}&locid=${office.selLoc}`, {
					method: 'GET',
				});
				const catData = await newResponse.json();

				//add new category to context array
				let curCats = ecomm.cats;
				const newObj = {
					_id: catData.cat._id,
					name,
					color,
					locationObjId: office.selLoc,
					officeObjId: auth.user.ofcObjId,
				};
				curCats.push(newObj);
				curCats.sort(CompareByName);
				setEcomm({ cats: curCats, selCat: {}, services: ecomm.services, selSvc: {} });
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

	const handleClose = () => {
		setName('');
		setColor('');
		setMenu({ type: menu.type, func: '', refresh: true });
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Add Category</div>
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
								Save Category
							</Button>
						</div>
					</form>
					{loading && <Spinner />}
				</div>
			</div>
		</>
	);
}
