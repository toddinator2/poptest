'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { saveInLocalStorage } from '@/utils/helpers/auth';
import { CompareByFName } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import add from '@/assets/images/icoAdd.png';
import del from '@/assets/images/icoDel.png';

export default function EdtResources() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc] = useContext(MiscContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [users, setUsers] = useState([]);
	const [rows, setRows] = useState([]);
	const [chkdRows, setChkdRows] = useState(false);
	const [loading, setLoading] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadUsers = useCallback(async () => {
		try {
			const response = await fetch(
				`${process.env.API_URL}/private/physicians/office/users/get/forloc?ofcid=${auth.user.ofcObjId}&locid=${misc.defLocId}`,
				{
					method: 'GET',
				}
			);
			const data = await response.json();

			if (data.status === 200) {
				setUsers(data.users);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, misc]);

	const loadResources = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/resources/get/forlist?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setRows(data.rscs);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [misc, auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	useEffect(() => {
		loadResources();
	}, [loadResources]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const response = await fetch(`${process.env.API_URL}/private/physicians/office/resources/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				rows,
				locid: misc.defLocId,
				ofcid: auth.user.ofcObjId,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			toast.success(data.msg);
			setLoading(false);
			handleClose();
		}
	};

	const handleClose = () => {
		setRows([]);
		setMenu({ type: menu.type, func: '' });
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleAddRow = () => {
		const rscObj = {
			userId: '',
			order: '',
			locId: misc.defLocId,
			ofcId: auth.user.ofcObjId,
		};
		setRows([...rows, rscObj]);
		return;
	};

	const handleRemoveRow = (idx) => {
		const curRows = [...rows];
		curRows.splice(idx, 1);
		curRows.sort((a, b) => a.order - b.order);
		setRows(curRows);
		return;
	};

	const handleUserChange = (e, idx) => {
		const value = e.target.value;
		const newObj = {
			userId: value,
			order: rows[idx].order,
			locId: misc.defLocId,
			ofcId: auth.user.ofcObjId,
		};
		const curRows = [...rows];
		curRows.splice(idx, 1, newObj);
		curRows.sort((a, b) => a.order - b.order);
		setRows(curRows);
		return;
	};

	const handleOrderChange = (e, idx) => {
		const value = e.target.value;
		const newObj = {
			userId: rows[idx].userId,
			order: value,
			locId: misc.defLocId,
			ofcId: auth.user.ofcObjId,
		};
		const curRows = [...rows];
		curRows.splice(idx, 1, newObj);
		curRows.sort((a, b) => a.order - b.order);
		setRows(curRows);
		return;
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Edit Calendar Columns</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={add} title='Add Row' alt='Add' onClick={() => handleAddRow()} />
				</div>
			</div>
			<div className='row d-flex align-items-center'>
				<div className='col-12'>
					<table style={{ width: '100%' }}>
						<tbody>
							{rows.length !== 0 && (
								<>
									{rows.map((item, idx) => (
										<tr id='addr0' key={idx}>
											<td className='pe-3' colSpan={6}>
												<div style={{ width: '100%' }}>
													<select
														className='inpBorder form-control mb-2'
														value={rows[idx]?.userId}
														onChange={(e) => handleUserChange(e, idx)}
													>
														<option value=''>Select One...</option>
														{users.map((user) => (
															<option value={user._id} key={user._id}>
																{user.fname} {user.lname}
															</option>
														))}
													</select>
												</div>
											</td>
											<td className='pe-3' colSpan={4}>
												<select
													className='inpBorder form-control mb-2'
													value={rows[idx]?.order}
													onChange={(e) => handleOrderChange(e, idx)}
												>
													<option value=''>Order</option>
													{[...Array(30)]
														.map((_, i) => i + 1)
														.map((i) => (
															<option key={i} value={i.toString()}>
																{i}
															</option>
														))}
												</select>
											</td>
											<td className='pe-3' colSpan={2}>
												<div className='d-flex justify-content-end'>
													<Image className='icoCols' src={del} title='Delete Row' alt='Del' onClick={() => handleRemoveRow(idx)} />
												</div>
											</td>
										</tr>
									))}
								</>
							)}
						</tbody>
					</table>
				</div>
			</div>
			{rows.length !== 0 && (
				<div className='row mt-4'>
					<div className='col-12 d-flex justify-content-center'>
						<Button border='ff0000' onClick={(e) => handleSubmit(e)}>
							Save Changes
						</Button>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</>
	);
}
