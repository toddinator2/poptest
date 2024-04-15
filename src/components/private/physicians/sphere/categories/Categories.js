'use client';
import React, { useContext, useEffect, useState } from 'react';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { CompareByName } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import Pagination from '@/components/global/pagination/Pagination';
import add from '@/assets/images/icoAdd.png';
import edit from '@/assets/images/icoEdit.png';
import del from '@/assets/images/icoDel.png';

export default function Categories() {
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [newLocId, setNewLocId] = useState('');
	const [curLocId, setCurLocId] = useState('');
	const [catList, setCatList] = useState([]);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(15);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = catList.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(catList.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });

		//Get selected location from array and save in office context
		setOffice({
			locations: office.locations,
			selLoc: newLocId,
			locOptions: office.locOptions,
			defLoc: office.defLoc,
			users: office.users,
			resources: office.resources,
			rscOptions: office.rscOptions,
		});

		//Get selected category from array and save in ecomm context
		const selCat = ecomm.cats.find((item) => item._id === id);
		setEcomm({ cats: ecomm.cats, selCat: selCat, services: ecomm.services, selSvc: {} });
	};

	useEffect(() => {
		if (office.locOptions.length === 1) {
			setNewLocId(office.locOptions[0].value);
			setCurLocId(office.locOptions[0].value);
		}
	}, [office.locOptions]);

	useEffect(() => {
		if (newLocId !== curLocId || menu.refresh) {
			//create new array of resources for new location
			const allCats = ecomm.cats;
			let tmpArr = [];
			for (let i = 0; i < allCats.length; i++) {
				const cat = allCats[i];
				if (cat.locationObjId === newLocId) {
					tmpArr.push(cat);
				}
			}
			tmpArr.sort(CompareByName);
			setCatList(tmpArr);
			if (menu.refresh) {
				setMenu({ type: menu.type, func: '', refresh: false });
			}
		}
		setCurLocId(newLocId);
	}, [newLocId, curLocId, menu, ecomm, setMenu]);

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
					<div className='colHdng'>Categories</div>
				</div>
				<div className='col-2 d-flex justify-content-end'>
					{newLocId && <Image className='icoCols' src={add} title='Add Category' alt='Add' onClick={() => setFunc('phyCategoryAdd', '')} />}
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
			{currentRecords.length === 0 ? (
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No categories found</div>
					</div>
				</div>
			) : (
				<>
					{currentRecords.map((cat) => (
						<div className='row mb-2 d-flex align-items-center' key={cat._id}>
							<div className='col-10'>
								<div className='colDataText'>{cat.name}</div>
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={edit} title='Edit' alt='Edit' onClick={() => setFunc('phyCategoryEdt', cat._id)} />
							</div>
							<div className='col-1 d-flex justify-content-end'>
								<Image className='icoCols' src={del} title='Delete' alt='Del' onClick={() => setFunc('phyCategoryDel', cat._id)} />
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
