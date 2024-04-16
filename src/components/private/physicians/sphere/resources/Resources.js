'use client';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { getFromLocalStorage, removeFromLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import edit from '@/assets/images/icoEdit.png';

export default function Resources() {
	let chkRefresh = getFromLocalStorage('rscRefresh');
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [newLocId, setNewLocId] = useState('');
	const [curLocId, setCurLocId] = useState('');
	const [rscList, setRscList] = useState([]);
	const [refresh, setRefresh] = useState(null);

	const setFunc = (func) => {
		setMenu({ type: menu.type, func: func });

		//Get selected location from array and save in office context
		setOffice({
			locations: office.locations,
			selLoc: newLocId,
			locOptions: office.locOptions,
			defLoc: office.defLoc,
			users: office.users,
			selUser: {},
			resources: office.resources,
			selRscs: [],
			rscOptions: office.rscOptions,
		});
	};

	useEffect(() => {
		if (chkRefresh === null) {
			setRefresh(false);
		} else {
			setRefresh(chkRefresh);
		}
	}, [chkRefresh]);

	useEffect(() => {
		if (office.locOptions.length === 1) {
			setNewLocId(office.locOptions[0].value);
			setCurLocId(office.locOptions[0].value);
		}
	}, [office.locOptions]);

	useEffect(() => {
		if (newLocId !== curLocId || refresh) {
			//create new array of resources for new location
			const allRscs = office.resources;
			let tmpArr = [];
			for (let i = 0; i < allRscs.length; i++) {
				const rsc = allRscs[i];
				if (rsc.locationObjId === newLocId) {
					tmpArr.push(rsc);
				}
			}
			tmpArr.sort((a, b) => a.order - b.order);
			setRscList(tmpArr);
			setRefresh(false);
			removeFromLocalStorage('rscRefresh');
			setMenu({ type: menu.type, func: '' });
		}
		setCurLocId(newLocId);
	}, [newLocId, curLocId, menu, office, setMenu]);

	return (
		<>
			<div className='row mb-3 d-flex align-items-center'>
				<div className='col-10'>
					<div className='colHdng'>Calendar Columns</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					{newLocId && <Image className='icoCols' src={edit} title='Edit Resources' alt='Edit' onClick={() => setFunc('phyRscsEdt', '')} />}
				</div>
			</div>
			{office.locOptions.length > 1 && (
				<div className='row mb-4 d-flex justify-content-center'>
					<div className='col-8'>
						<label className='frmLabel'>Select Location</label>
					</div>
					<div className='col-8'>
						<select className='inpBorder form-control mb-2' value={curLocId} onChange={(e) => setNewLocId(e.target.value)}>
							<option value=''>Select One...</option>
							{office.locOptions.map((loc) => (
								<option value={loc.value} key={loc.value}>
									{loc.label}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
			{rscList.length === 0 && newLocId ? (
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No resources added yet</div>
					</div>
				</div>
			) : (
				<>
					{rscList.map((rsc) => (
						<div className='row mb-2 d-flex align-items-center' key={rsc._id}>
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
