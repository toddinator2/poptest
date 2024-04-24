import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { FormatPhoneNumber } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function EdtOffice() {
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [ofcData, setOfcData] = useState({});
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [stop, setStop] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadOffice = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/data/get/namephone?id=${misc.editId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setOfcData(data.office);
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
		loadOffice();
	}, [loadOffice]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VARIABLES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (Object.keys(ofcData).length !== 0 && !stop) {
			if (ofcData.name !== '' && ofcData.name !== undefined) {
				setName(ofcData.name);
			} else {
				setName('');
			}
			if (ofcData.phone !== '' && ofcData.phone !== undefined) {
				setPhone(ofcData.phone);
			} else {
				setPhone('');
			}
			setStop(true);
		}
	}, [ofcData, stop]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/data/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: misc.editId,
					name,
					phone,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '' });
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
		setPhone('');
		setMenu({ type: menu.type, func: '' });
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function handlePhone(e) {
		const value = e.target.value;
		const formattedPhoneNumber = FormatPhoneNumber(value);
		setPhone(formattedPhoneNumber);
	}

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Edit Office</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row d-flex justify-content-center'>
				<div className='col-12 col-xl-8'>
					<form onSubmit={handleSubmit}>
						<Input label='Name' type='text' value={name} setValue={setName} />
						<Input label='Phone' type='tel' value={phone} funcCall={handlePhone} />
						<div className='row my-3 d-flex justify-content-center'>
							<Button border='ff0000' disabled={!name || !phone}>
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
