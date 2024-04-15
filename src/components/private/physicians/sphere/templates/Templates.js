import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';
import Image from 'next/image';
import Pagination from '@/components/global/pagination/Pagination';
import add from '@/assets/images/icoAdd.png';
import edit from '@/assets/images/icoEdit.png';
import del from '@/assets/images/icoDel.png';

export default function Templates() {
	let chkRefresh = getFromLocalStorage('tmpRefresh');
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [temps, setTemps] = useState([]);
	const [refresh, setRefresh] = useState(null);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(10);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = temps.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(temps.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });

		if (id) {
			saveInLocalStorage('tmpId', id);
		}
	};

	useEffect(() => {
		if (chkRefresh === null) {
			setRefresh(false);
		} else {
			setRefresh(chkRefresh);
		}
	}, [chkRefresh]);

	useEffect(() => {
		if (temps.length === 0 || refresh === true) {
			const getTemps = async () => {
				const response = await fetch(`${process.env.API_URL}/private/physicians/templates/get/byuser?userid=${auth.user._id}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					setTemps(data.temps);
				}

				setRefresh(false);
				removeFromLocalStorage('tmpRefresh');
			};
			getTemps();
		}
	});

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
			{currentRecords.length === 0 ? (
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
		</>
	);
}
