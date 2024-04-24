import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import edit from '@/assets/images/icoEdit.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function Office() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [ofcData, setOfcData] = useState({});

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadOffice = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/data/get/namephone?id=${auth.user.ofcObjId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setOfcData(data.office);
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadOffice();
	}, [loadOffice]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchOffice = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const ofc = mongodb.db(dbName).collection('offices');

			for await (const change of ofc.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadOffice();
				}
			}
		};
		wchOffice();
	}, [dbName, loadOffice]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });
		if (id) {
			setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: id });
		}
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Office</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					<Image className='icoCols' src={edit} title='Edit Office' alt='Edit' onClick={() => setFunc('phyBasicEdt', ofcData._id)} />
				</div>
			</div>
			{Object.keys(ofcData).length !== 0 && ofcData.name && (
				<>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-5 pe-1 d-flex justify-content-end'>
							<div className='colLblText'>Name:</div>
						</div>
						<div className='col-7 ps-1'>
							<div className='colDataText'>{ofcData.name}</div>
						</div>
					</div>
					<div className='row mb-2 d-flex align-items-center'>
						<div className='col-5 pe-1 d-flex justify-content-end'>
							<div className='colLblText'>Phone:</div>
						</div>
						<div className='col-7 ps-1'>
							<div className='colDataText'>{ofcData.phone}</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}
