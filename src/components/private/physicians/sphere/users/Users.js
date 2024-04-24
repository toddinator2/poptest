'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Pagination from '@/components/global/pagination/Pagination';
import add from '@/assets/images/icoAdd.png';
import edit from '@/assets/images/icoEdit.png';
import del from '@/assets/images/icoDel.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function Users() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [users, setUsers] = useState([]);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(10);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(users.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

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
			toast.error(data.msg);
		}
	}, [auth, misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchUsers = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const users = mongodb.db(dbName).collection('officeusers');

			for await (const change of users.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadUsers();
				}
			}
		};
		wchUsers();
	}, [dbName, loadUsers]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });
		if (id) {
			setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: id });
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGINATION FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const nextPage = () => {
		if (currentPage !== nPages) {
			setCurrentPage(currentPage + 1);
		}
	};
	const prevPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Users</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={add} title='Add User' alt='Add' onClick={() => setFunc('phyUserAdd', '')} />
				</div>
			</div>
			{currentRecords.length !== 0 && (
				<>
					{currentRecords.map((user) => (
						<div className='row mb-2 d-flex align-items-center' key={user._id}>
							<div className='col-10'>
								<div className='colDataText'>
									{user.fname} {user.lname}
								</div>
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={edit} title='Edit' alt='Edit' onClick={() => setFunc('phyUserEdt', user._id)} />
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={del} title='Delete' alt='Del' onClick={() => setFunc('phyUserDel', user._id)} />
							</div>
						</div>
					))}
					{nPages >= 2 && (
						<div className='row mt-2'>
							<div className='col-12 px-2 d-flex justify-content-center'>
								<Pagination prev={prevPage} pgNums={pageNumbers} curPage={currentPage} handler={setCurrentPage} next={nextPage} />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
}
