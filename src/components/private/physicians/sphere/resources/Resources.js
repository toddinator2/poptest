'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import edit from '@/assets/images/icoEdit.png';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: 'rtpoppcapp-neojo' });

export default function Resources() {
	const dbName = process.env.REALM_DB;
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [misc] = useContext(MiscContext);
	const [rscList, setRscList] = useState([]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadResources = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/office/resources/get/forlist?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setRscList(data.rscs);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [misc, auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadResources();
	}, [loadResources]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchResources = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const rscs = mongodb.db(dbName).collection('resources');

			for await (const change of rscs.watch()) {
				if (change.operationType === 'insert') {
					loadResources();
				}
			}
		};
		wchResources();
	}, [dbName, loadResources]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const setFunc = (func) => {
		setMenu({ type: menu.type, func: func });
	};

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Calendar Columns</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					{misc.defLocId && <Image className='icoCols' src={edit} title='Edit Resources' alt='Edit' onClick={() => setFunc('phyRscsEdt', '')} />}
				</div>
			</div>
			{rscList.length !== 0 && misc.defLocId && (
				<>
					{rscList.map((rsc) => (
						<div className='row mb-2 d-flex align-items-center' key={rsc.id}>
							<div className='col-10'>
								<div className='colDataText'>{rsc.name}</div>
							</div>
							<div className='col-2 d-flex justify-content-end'>
								<div className='colDataText'>{rsc.order}</div>
							</div>
						</div>
					))}
				</>
			)}
		</>
	);
}
