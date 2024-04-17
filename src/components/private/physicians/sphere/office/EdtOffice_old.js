import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { FormatPhoneNumber } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Input from '@/components/global/forms/input/Input';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';
import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';

export default function EdtOffice() {
	const id = getFromLocalStorage('ofcId');
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [ofcData, setOfcData] = useState({});
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [stop, setStop] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (id && !name) {
			const getOfcData = async () => {
				const response = await fetch(`${process.env.API_URL}/private/physicians/office/data/get?id=${auth.user.ofcObjId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					setOfcData(data.office);
				} else {
					toast.error(data.msg);
					return;
				}
			};
			getOfcData();
		}
	}, [id, name, auth]);

	useEffect(() => {
		if (ofcData !== undefined) {
			if (Object.keys(ofcData).length !== 0 && !stop) {
				if (ofcData.name) {
					setName(ofcData.name);
				} else {
					setName('');
				}
				if (ofcData.mainphone) {
					setPhone(ofcData.mainphone);
				} else {
					setPhone('');
				}
				setStop(true);
			}
		}
	}, [ofcData, stop]);

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
					_id: auth.user.ofcObjId,
					name,
					phone,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				saveInLocalStorage('ofcRefresh', true);
				saveInLocalStorage('qsRefresh', true);
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
		removeFromLocalStorage('ofcId');
		setMenu({ type: menu.type, func: '' });
	};

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
