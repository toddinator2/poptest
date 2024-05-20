import React, { useContext, useEffect, useState } from 'react';
import { MiscContext } from '@/utils/context/global/MiscContext';
import toast from 'react-hot-toast';
import { FormatCurrency } from '@/components/global/functions/Functions';
import Button from '@/components/global/forms/buttons/Button';
import Pagination from '@/components/global/pagination/Pagination';

const mems = [
	{
		_id: 1,
		name: 'Membership 1',
		desc: 'This is the description for Membership 1. Includes damn near everything you need to live forever.',
		price: 10999,
	},
	{
		_id: 2,
		name: 'Membership 2',
		desc: 'This is the description for Membership 2. Includes about everything you need to live around 90.',
		price: 9999,
	},
	{
		_id: 3,
		name: 'Membership 3',
		desc: "This is the description for Membership 3. You'll be dead by 40.",
		price: 3099,
	},
];

export default function OfficeDetails() {
	//const [misc] = useContext(MiscContext);
	//	const [mems, setMems] = useState([]);
	const [chkdMems, setChkdMems] = useState(false);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(4);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = mems.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(mems.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	/*
	const loadMemberships = async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/physicians/ecomm/services/get/memberships?locid=${misc.props.locId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setMems(data.mems);
			}
			setChkdMems(true);
		} catch (err) {
			toast.error('Network Error: Please try again');
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (mems.length === 0 && !chkdMems) {
			loadMemberships();
		}
	}, [mems, chkdMems, loadMemberships]);
*/

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
			<div className='sphContHdrDiv ppl'>Memberships</div>
			<div className='sphSubContainer pt-2'>
				{currentRecords.length !== 0 ? (
					<>
						{currentRecords.map((mem) => (
							<div key={mem._id}>
								<div className='row d-flex align-items-center'>
									<div className='col-1 pt-1'>
										<input type='radio' />
									</div>
									<div className='col-11'>
										<div className='ocTextSm blu'>{mem.name}</div>
									</div>
								</div>
								<div className='row'>
									<div className='col-10 offset-1'>
										<div className='ocTextSm red'>${FormatCurrency(mem.price)}/mo</div>
									</div>
								</div>
								<div className='row mb-3'>
									<div className='col-10 offset-1'>
										<div className='ocTextSm'>{mem.desc}</div>
									</div>
								</div>
							</div>
						))}
						{nPages >= 2 && (
							<div className='row mt-4'>
								<div className='col-12 px-2 d-flex justify-content-center'>
									<Pagination prev={prevPage} pgNums={pageNumbers} curPage={currentPage} handler={setCurrentPage} next={nextPage} />
								</div>
							</div>
						)}
						<div className='row mt-4'>
							<div className='col-12 d-flex justify-content-center'>
								<Button type='button' border='555555'>
									Request to Join
								</Button>
							</div>
						</div>
					</>
				) : (
					<>
						{chkdMems && (
							<div className='row'>
								<div className='col-12 d-flex justify-content-center'>
									<div className='errMsg'>No Memberships Found</div>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}
