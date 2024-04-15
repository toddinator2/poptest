'use client';
import React, { useContext, useEffect, useState } from 'react';
import { storage } from '@/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { CompareByLabel } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Select from 'react-select';
import Button from '@/components/global/forms/buttons/Button';
import Spinner from '@/components/global/spinner/Spinner';
import close from '@/assets/images/icoClose.png';

export default function DelUser() {
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [user, setUser] = useState({});
	const [selOptions, setSelOptions] = useState([]);
	const [selLocations, setSelLocations] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (Object.keys(office.selUser).length !== 0 && (Object.keys(user).length === 0 || user._id !== office.selUser._id)) {
			setUser(office.selUser);
		}
	}, [office.selUser, user]);

	useEffect(() => {
		if (selOptions.length === 0 && Object.keys(user).length !== 0) {
			let tmpArr = [];
			const curLocs = user.locationObjId;
			for (let i = 0; i < curLocs.length; i++) {
				const curId = curLocs[i];
				for (let o = 0; o < office.locOptions.length; o++) {
					const locId = office.locOptions[o].value;
					if (locId === curId) {
						tmpArr.push(office.locOptions[o]);
					}
				}
			}
			tmpArr.sort(CompareByLabel);
			setSelOptions(tmpArr);
		}
	}, [selOptions, user, office]);

	const handleDelete = async (e) => {
		e.preventDefault();
		setLoading(true);
		const userId = user._id;
		let arrRscs = [];
		let arrOptsRscs = [];

		//Remove photo
		if (user.photo) {
			const picRef = ref(storage, user.photo);
			await deleteObject(picRef);
		}

		if (selLocations.length === user.locationObjId.length) {
			//Remove completeley
			//Remove the object from the users context array
			let tmpArr = office.users;
			tmpArr = tmpArr.filter((item) => item._id !== userId);
			setOffice({
				locations: office.locations,
				locOptions: office.locOptions,
				defLoc: office.defLoc,
				users: tmpArr,
				selUser: {},
				resources: office.resources,
				rscOptions: office.rscOptions,
			});

			//delete the user from database
			await fetch(`${process.env.API_URL}/private/physicians/office/users/delete?userid=${userId}`, {
				method: 'DELETE',
			});

			//reset office context
			const rscResponse = await fetch(`${process.env.API_URL}/private/physicians/office/resources/get/all?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const rscData = await rscResponse.json();

			if (rscData?.status === 200) {
				arrRscs = rscData.rscs;

				//reset resource options as well
				if (rscData?.rscs.length !== 0) {
					let tmpOptsArr = [];
					const rscs = rscData?.rscs;
					for (let i = 0; i < rscs.length; i++) {
						const rsc = rscs[i];
						const _id = rsc._id;
						const name = rsc.name;
						tmpOptsArr.push({ label: name, value: _id });
					}
					arrOptsRscs = tmpOptsArr;
				}
			}
			toast.success('User deleted successfully');
			setOffice({ locations: office.locations, locOptions: office.locOptions, defLoc: office.defLoc, users: tmpArr, selUser: {}, resources: arrRscs, rscOptions: arrOptsRscs });
		} else {
			//Just update the user locations array
			let locArr = user.locationObjId;
			for (let i = 0; i < selLocations.length; i++) {
				const selId = selLocations[i].value;
				locArr = locArr.filter((item) => item !== selId);
			}

			user.locationObjId = locArr;
			const index = office.users.findIndex((x) => x._id === user._id);
			office.users.splice(index, 1, user);

			const response = await fetch(`${process.env.API_URL}/private/physicians/office/users/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: user._id,
					locationObjId: locArr,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				setOffice({
					locations: office.locations,
					locOptions: office.locOptions,
					defLoc: office.defLoc,
					users: office.users,
					selUser: {},
					resources: arrRscs,
					rscOptions: arrOptsRscs,
				});
				toast.success('User updated successfully');
			} else {
				toast.error(data.msg);
			}
		}
		setLoading(false);
		handleClose();
	};

	function handleClose() {
		setMenu({ type: menu.type, func: '' });
	}

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Delete User</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={close} title='Close' alt='Close' onClick={() => handleClose()} />
				</div>
			</div>
			<div className='row'>
				<div className='alertSubHdng mb-3 text-center'>CAUTION: This cannot be undone!</div>
				<div className='alertText text-center'>
					<div className='row mb-4'>
						<div className='col-12'>
							<label className='frmLabel'>Please choose all locations to delete this user from:</label>
						</div>
						<div className='col-12'>
							<Select
								isMulti={true}
								options={selOptions}
								onChange={setSelLocations}
								styles={{
									control: (baseStyles) => ({
										...baseStyles,
										backgroundColor: 'transparent',
										border: '1px solid #c9c9c9',
										borderRadius: '7px',
									}),
								}}
							/>
						</div>
					</div>
					<p>Please make sure you have reassigned all data for this user to another user, location, or other physician.</p>
					<p>All associated data for this user, by location(s), will be deleted as well.</p>
					<p>Main things to reassign are:</p>
					<div className='text-center'>
						<strong>Appointments</strong> with this user
						<br />
						<strong>Calendar Column</strong> users
						<br />
						Daily Tasks
					</div>
				</div>
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
