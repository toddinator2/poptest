import React, { useContext, useState } from 'react';
import '../../../Sidebar.css';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import OfficeData from '../officedata/OfficeData';
import search from '@/assets/images/icoSearch.png';

export default function PhyButton() {
	const [auth] = useContext(AuthContext);
	const [_menu, setMenu] = useContext(MenuContext);
	const [hideOfcDiv, setHideOfcDiv] = useState(true);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const hideOffice = () => {
		setHideOfcDiv(!hideOfcDiv);
	};

	const handleMenu = () => {
		setMenu({ type: 'phySearch', func: '' });
	};

	return (
		<>
			{hideOfcDiv ? (
				<div className='sbButton' onClick={() => hideOffice()}>
					PHYSICIANS
				</div>
			) : (
				<>
					<div className='sbButton active' onClick={() => hideOffice()}>
						PHYSICIANS
					</div>
					<div className='row mb-4'>
						<div className='sbBox col-10 offset-1 p-3'>
							<div className='row mb-2'>
								<div className='col-12 d-flex justify-content-end'>
									<Image className='sbIcoSearch' src={search} width={27} height={25} alt='Search' onClick={() => handleMenu()} />
								</div>
							</div>
							{auth.user.offices.length === 0 ? (
								<>
									<div className='errMsg d-flex justify-content-center'>No Physicians Found</div>
								</>
							) : (
								<OfficeData />
							)}
						</div>
					</div>
				</>
			)}
		</>
	);
}
