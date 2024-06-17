import React, { useContext, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Button from '@/components/global/forms/buttons/Button';
import Pagination from '@/components/global/pagination/Pagination';
import Spinner from '@/components/global/spinner/Spinner';
import PhysicianSearchCard from '../../components/PhysicianSearchCard';
import close from '@/assets/images/icoClose.png';

export default function PhysicianSearch() {
	const [auth] = useContext(AuthContext);
	const [misc, setMisc] = useContext(MiscContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [specialty, setSpecialty] = useState('');
	const [miles, setMiles] = useState('');
	const [phys, setPhys] = useState([]);
	const [chkdPhys, setChkdPhys] = useState(false);
	const [loading, setLoading] = useState(false);
	//pagination
	const [currentPage, setCurrentPage] = useState(1);
	const [recordsPerPage] = useState(5);
	const indexOfLastRecord = currentPage * recordsPerPage;
	const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
	const currentRecords = phys.slice(indexOfFirstRecord, indexOfLastRecord);
	const nPages = Math.ceil(phys.length / recordsPerPage);
	const pageNumbers = Array.from({ length: nPages }, (_, index) => index + 1);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// FORM FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setChkdPhys(false);
		setMenu({ type: menu.type, func: '', dets: '', vids: false, page: menu.page });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: {} });

		try {
			const response = await fetch(
				`${process.env.API_URL}/subscribers/get/physicians/forphysearch?spc=${specialty}&mls=${miles}&userId=${auth.user._id}`,
				{
					method: 'GET',
				}
			);
			const data = await response.json();

			if (data.status === 200) {
				setPhys(data.phys);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error('Network Error: Please try again');
		} finally {
			setChkdPhys(true);
			setLoading(false);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleClose = () => {
		setMenu({ type: '', func: '', dets: '', vids: false, page: menu.page });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: {} });
	};

	const handleChange = (props) => {
		setMenu({ type: menu.type, func: '', dets: '', vids: false, page: menu.page });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: {} });
		setTimeout(() => {
			handleMenu(props);
		}, 300);
	};

	const handleMenu = (props) => {
		setMenu({ type: menu.type, func: 'phySearchComponent', dets: 'phySearchDetails', vids: false, page: menu.page });
		setMisc({ defLocId: misc.defLocId, defLocName: misc.defLocName, editId: '', props: props });
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
			<div className='w-full py-2 font-semibold text-center text-xl border-b-4 border-b-drkred'>PHYSICIAN SEARCH</div>
			<div className='p-2'>
				<div className='mb-3 flex justify-end'>
					<Image className='w-5 h-5 cursor-pointer' src={close} alt='close' onClick={() => handleClose()} />
				</div>
				<form onSubmit={handleSubmit}>
					<label className='frmLabel'>Choose a Specialty</label>
					<div className='mb-2 ps-2'>
						<select className='inpBorder form-control' required={true} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='Allergy & Immunology'>Allergy & Immunology</option>
							<option value='Anatomical Pathology'>Anatomical Pathology</option>
							<option value='Bariatric Medicine'>Bariatric Medicine</option>
							<option value='Cardiology'>Cardiology</option>
							<option value='Cardiothoracic Surgery'>Cardiothoracic Surgery</option>
							<option value='Chiropractic'>Chiropractic</option>
							<option value='Colorectal Surgery'>Colorectal Surgery</option>
							<option value='Dermatology'>Dermatology</option>
							<option value='Emergency Room'>Emergency Room</option>
							<option value='Endocrinology'>Endocrinology</option>
							<option value='Family Medicine'>Family Medicine</option>
							<option value='Functional Medicine'>Functional Medicine</option>
							<option value='Gastroenterology'>Gastroenterology</option>
							<option value='General Surgery'>General Surgery</option>
							<option value='Gynecology'>Gynecology</option>
							<option value='Hematology & Oncology'>Hematology & Oncology</option>
							<option value='Infectious Disease'>Infectious Disease</option>
							<option value='Intensive Care'>Intensive Care</option>
							<option value='Internal Medicine'>Internal Medicine</option>
							<option value='Lifestyle Medicine'>Lifestyle Medicine</option>
							<option value='Medical Genetics'>Medical Genetics</option>
							<option value='Neonatology'>Neonatology</option>
							<option value='Nephrology'>Nephrology</option>
							<option value='Neuro Surgery'>Neuro Surgery</option>
							<option value='Neurology'>Neurology</option>
							<option value='Obstetrics & Gynecology'>Obstetrics & Gynecology</option>
							<option value='Occupational Care'>Occupational Care</option>
							<option value='Ophthalmology'>Ophthalmology</option>
							<option value='Optometry'>Optometry</option>
							<option value='Orthopedic'>Orthopedic</option>
							<option value='Orthopedic Surgery'>Orthopedic Surgery</option>
							<option value='Otorhinolaryngology'>Otorhinolaryngology</option>
							<option value='Pain Management'>Pain Management</option>
							<option value='Pathology'>Pathology</option>
							<option value='Pediatric Medicine'>Pediatric Medicine</option>
							<option value='Physical Therapy'>Physical Therapy</option>
							<option value='Plastic Surgery'>Plastic Surgery</option>
							<option value='Podiatry'>Podiatry</option>
							<option value='Preventative Care'>Preventative Care</option>
							<option value='Prevention Medicine'>Prevention Medicine</option>
							<option value='Psychiatry'>Psychiatry</option>
							<option value='Pulmonology'>Pulmonology</option>
							<option value='Radiology'>Radiology</option>
							<option value='Rheumatology'>Rheumatology</option>
							<option value='Spinal Cord Care'>Spinal Cord Care</option>
							<option value='Sport Care'>Sport Care</option>
							<option value='Urology'>Urology</option>
							<option value='Vascular Surgery'>Vascular Surgery</option>
							<option value='Well Medicine'>Well Medicine</option>
						</select>
					</div>
					<label className='frmLabel'>Choose a Distance</label>
					<div className='ps-2'>
						<select className='inpBorder form-control' required={true} value={miles} onChange={(e) => setMiles(e.target.value)}>
							<option value=''>Select One...</option>
							<option value='5'>Within 5 Miles</option>
							<option value='10'>Within 10 Miles</option>
							<option value='15'>Within 15 Miles</option>
							<option value='20'>Within 20 Miles</option>
							<option value='25'>Within 25 Miles</option>
							<option value='50'>Within 50 Miles</option>
						</select>
					</div>
					<div className='my-5 flex justify-center'>
						<Button type='submit' disabled={!specialty || !miles}>
							Start Search
						</Button>
					</div>
				</form>
				{currentRecords.length !== 0 ? (
					<>
						{currentRecords.map((phy) => (
							<PhysicianSearchCard phy={phy} key={phy._id} />
						))}
						{nPages >= 2 && (
							<div className='mt-4'>
								<div className='flex justify-center'>
									<Pagination prev={prevPage} pgNums={pageNumbers} curPage={currentPage} handler={setCurrentPage} next={nextPage} />
								</div>
							</div>
						)}
					</>
				) : (
					<>{chkdPhys && <div className='text-base font-semibold text-drkred text-center'>No Physicians Found</div>}</>
				)}
				{loading && <Spinner />}
			</div>
		</>
	);
}
