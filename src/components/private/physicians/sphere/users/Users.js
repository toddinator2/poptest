'use client';
import React, { useContext, useState } from 'react';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import Pagination from '@/components/global/pagination/Pagination';
import add from '@/assets/images/icoAdd.png';
import edit from '@/assets/images/icoEdit.png';
import del from '@/assets/images/icoDel.png';

export default function Users() {
	const [menu, setMenu] = useContext(MenuContext);
	const [office, setOffice] = useContext(OfficeContext);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(10);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = office.users.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(office.users.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });

		if (id) {
			//Get selected user from array and save in office context
			const edtUser = office.users.find((item) => item._id === id);
			setOffice({
				locations: office.locations,
				locOptions: office.locOptions,
				defLoc: office.defLoc,
				users: office.users,
				selUser: edtUser,
				resources: office.resources,
				rscOptions: office.rscOptions,
			});
		}
	};

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
			{currentRecords.length === 0 ? (
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No users found</div>
					</div>
				</div>
			) : (
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
