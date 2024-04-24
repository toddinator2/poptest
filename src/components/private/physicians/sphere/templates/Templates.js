import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
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

export default function Templates() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [temps, setTemps] = useState([]);
	const [loading, setLoading] = useState(false);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(10);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = temps.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(temps.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadTemps = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/private/physicians/templates/get/byuser?userid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setTemps(data.temps);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadTemps();
	}, [loadTemps]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchTemps = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const temps = mongodb.db(dbName).collection('templates');

			for await (const change of temps.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadTemps();
				}
			}
		};
		wchTemps();
	}, [dbName, loadTemps]);

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
					<div className='colHdng'>Templates</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={add} title='Add Template' alt='Add' onClick={() => setFunc('phyTemplateAdd', '')} />
				</div>
			</div>
			{currentRecords.length === 0 && !loading ? (
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No templates found</div>
					</div>
				</div>
			) : (
				<>
					{currentRecords.map((tmp) => (
						<div className='row mb-2 d-flex align-items-center' key={tmp._id}>
							<div className='col-10'>
								<div className='colDataText'>{tmp.name}</div>
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={edit} title='Edit' alt='Edit' onClick={() => setFunc('phyTemplateEdt', tmp._id)} />
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={del} title='Delete' alt='Del' onClick={() => setFunc('phyTemplateDel', tmp._id)} />
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
			{loading && <Spinner />}
		</>
	);
}
