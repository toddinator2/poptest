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

export default function Locations() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [locs, setLocs] = useState([]);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(15);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = locs.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(locs.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadLocations = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/locations/get/forlist?ofcid=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLocs(data.locs);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadLocations();
	}, [loadLocations]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchLocations = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const loc = mongodb.db(dbName).collection('officelocations');

			for await (const change of loc.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadLocations();
				}
			}
		};
		wchLocations();
	}, [dbName, loadLocations]);

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
					<div className='colHdng'>Locations</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={add} title='Add User' alt='Add' onClick={() => setFunc('phyLocationAdd', '')} />
				</div>
			</div>
			{currentRecords.length !== 0 && (
				<>
					{currentRecords.map((loc) => (
						<div className='row mb-2 d-flex align-items-center' key={loc._id}>
							<div className='col-10'>
								<div className='colDataText'>{loc.name}</div>
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={edit} title='Edit' alt='Edit' onClick={() => setFunc('phyLocationEdt', loc._id)} />
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={del} title='Delete' alt='Del' onClick={() => setFunc('phyLocationDel', loc._id)} />
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
