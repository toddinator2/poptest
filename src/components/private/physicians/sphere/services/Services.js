'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Pagination from '@/components/global/pagination/Pagination';
import Spinner from '@/components/global/spinner/Spinner';
import add from '@/assets/images/icoAdd.png';
import edit from '@/assets/images/icoEdit.png';
import del from '@/assets/images/icoDel.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function Services() {
	const dbName = process.env.REALM_DB;
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [cats, setCats] = useState([]);
	const [svcs, setSvcs] = useState([]);
	const [catId, setCatId] = useState('');
	const [loading, setLoading] = useState(false);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(15);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = svcs.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(svcs.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadCats = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/category/get/forloc?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setCats(data.cats);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	const loadServices = useCallback(async () => {
		if (catId) {
			try {
				setLoading(true);
				const response = await fetch(`${process.env.API_URL}/private/physicians/office/ecomm/service/get/forcat?catid=${catId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					setSvcs(data.svcs);
				}
			} catch (err) {
				toast.error(err);
			} finally {
				setLoading(false);
			}
		} else {
			setSvcs([]);
		}
	}, [catId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadCats();
	}, [loadCats]);

	useEffect(() => {
		setCatId(misc.editId);
		loadServices();
	}, [loadServices]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchSvcs = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const svcs = mongodb.db(dbName).collection('services');

			for await (const change of svcs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadServices();
				}
			}
		};
		wchSvcs();
	}, [dbName, loadServices]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });
		if (id) {
			setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: id });
		}
	};

	const handleCatId = (e) => {
		const value = e.target.value;
		setCatId(value);
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: value });
		if (value) {
			loadServices();
		} else {
			setSvcs([]);
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
					<div className='colHdng'>Services</div>
				</div>
				{catId && (
					<div className='col-2 d-flex justify-content-end'>
						<Image className='icoCols' src={add} title='Add Service' alt='Add' onClick={() => setFunc('phyServiceAdd', '')} />
					</div>
				)}
			</div>
			{cats.length >= 1 && (
				<div className='row mb-4 d-flex justify-content-center'>
					<div className='col-8'>
						<label className='frmLabel'>Select Category</label>
					</div>
					<div className='col-8'>
						<select className='inpBorder form-control mb-2' value={catId} onChange={(e) => handleCatId(e)}>
							<option value=''>Select One...</option>
							{cats.map((cat) => (
								<option value={cat._id} key={cat._id}>
									{cat.name}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
			{currentRecords.length === 0 && catId && !loading ? (
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No services found</div>
					</div>
				</div>
			) : (
				<>
					{currentRecords.length !== 0 && (
						<>
							{currentRecords.map((svc) => (
								<div className='row mb-2 d-flex align-items-center' key={svc._id}>
									<div className='col-10'>
										<div className='colDataText'>{svc.name}</div>
									</div>
									<div className='col-1 d-flex justify-content-end'>
										<Image className='icoCols' src={edit} title='Edit' alt='Edit' onClick={() => setFunc('phyServiceEdt', svc._id)} />
									</div>
									<div className='col-1 d-flex justify-content-end'>
										<Image className='icoCols' src={del} title='Delete' alt='Del' onClick={() => setFunc('phyServiceDel', svc._id)} />
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
			)}
			{loading && <Spinner />}
		</>
	);
}
