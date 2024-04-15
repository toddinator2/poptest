'use client';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { CompareByFName } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import add from '@/assets/images/icoAdd.png';
import del from '@/assets/images/icoDel.png';

export default function EdtResources() {
	const [auth, _setAuth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [locUsers, setLocUsers] = useState([]);
	const [rows, setRows] = useState([]);
	const [chkdRows, setChkdRows] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (locUsers.length === 0) {
			//create new array of users for this location
			const allUsers = office.users;
			let tmpArr = [];
			for (let i = 0; i < allUsers.length; i++) {
				const user = allUsers[i];
				const usrLocs = user.locationObjId;
				for (let o = 0; o < usrLocs.length; o++) {
					const locId = usrLocs[o];
					if (locId === office.selLoc) {
						tmpArr.push(user);
						break;
					}
				}
			}
			tmpArr.sort(CompareByFName);
			setLocUsers(tmpArr);
		}
	}, [locUsers, office]);

	useEffect(() => {
		if (rows.length === 0 && office.resources?.length !== 0 && !chkdRows) {
			const curLocId = office.selLoc;
			//create initial rows array
			const allRscs = office.resources;
			let tmpArr = [];
			for (let i = 0; i < allRscs.length; i++) {
				const rsc = allRscs[i];
				if (rsc.locationObjId === curLocId) {
					const calObj = {
						userId: rsc.officeuserObjId,
						order: rsc.order,
						locId: rsc.locationObjId,
						ofcId: rsc.officeObjId,
					};
					tmpArr.push(calObj);
				}
			}
			tmpArr.sort((a, b) => a.order - b.order);
			setRows(tmpArr);
			setChkdRows(true);
		}
	}, [rows, office, chkdRows]);

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
				locid: office.selLoc,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//reload all resources into context
			const rscResponse = await fetch(`${process.env.API_URL}/private/physicians/office/resources/get/all?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const rscData = await rscResponse.json();
			setOffice({
				locations: office.locations,
				selLoc: '',
				locOptions: office.locOptions,
				defLoc: office.defLoc,
				users: office.users,
				resources: rscData.rscs,
				rscOptions: office.rscOptions,
			});
			toast.success(data.msg);
			setLoading(false);
			handleClose();
		}
	};

	const handleClose = () => {
		setRows([]);
		setMenu({ type: menu.type, func: '', refresh: true });
	};

	const handleAddRow = () => {
		const calObj = {
			userId: '',
			order: '',
			locId: office.selLoc,
			ofcId: auth.user.ofcObjId,
		};
		setRows([...rows, calObj]);
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
			locId: office.selLoc,
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
			locId: office.selLoc,
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
													<select className='inpBorder form-control mb-2' value={rows[idx]?.userId} onChange={(e) => handleUserChange(e, idx)}>
														<option value=''>Select One...</option>
														{locUsers.map((user) => (
															<option value={user._id} key={user._id}>
																{user.fname} {user.lname}
															</option>
														))}
													</select>
												</div>
											</td>
											<td className='pe-3' colSpan={4}>
												<select className='inpBorder form-control mb-2' value={rows[idx]?.order} onChange={(e) => handleOrderChange(e, idx)}>
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
