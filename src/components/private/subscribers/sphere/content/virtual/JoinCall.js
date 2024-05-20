import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';

export default function JoinCall() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [token, setToken] = useState('');
	const [exp, setExp] = useState('');

	const getToken = useCallback(async () => {
		const response = await fetch(`${process.env.API_URL}/virtual?ptid=${auth.user._id}`, {
			method: 'GET',
		});
		const data = await response.json();
		setToken(data.token);
		setExp(data.exp);
	}, [auth]);

	useEffect(() => {
		getToken();
	}, [getToken]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleMenu = () => {
		const currentTimestamp = Math.floor(Date.now() / 1000);
		if (currentTimestamp <= exp) {
			setMenu({ type: menu.type, func: menu.func, dets: '', vids: true });
			setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: token, props: {} });
		} else {
			toast.error('Timed Out: Please refresh page and try again');
		}
	};

	return (
		<div className='row my-3'>
			<div className='col-12 d-flex justify-content-center'>
				<Button type='button' onClick={() => handleMenu()}>
					Join Call
				</Button>
			</div>
		</div>
	);
}
