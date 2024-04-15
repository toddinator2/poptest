'use client';
import React, { useContext, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelTemplate() {
	const id = getFromLocalStorage('tmpId');
	const [menu, setMenu] = useContext(MenuContext);
	const [loading, setLoading] = useState(false);

	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);

		//delete the template from database
		await fetch(`${process.env.API_URL}/private/physicians/templates/delete?id=${id}`, {
			method: 'DELETE',
		});

		toast.success('Template deleted successfully');
		setLoading(false);
		handleClose();
	};

	function handleClose() {
		saveInLocalStorage('tmpRefresh', true);
		removeFromLocalStorage('tmpId');
		setMenu({ type: menu.type, func: '' });
	}

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Delete Template</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row'>
				<div className='alertSubHdng mb-3 text-center'>CAUTION: This cannot be undone!</div>
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
