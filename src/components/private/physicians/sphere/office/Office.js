import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { MenuContext } from '@/utils/context/global/MenuContext';
import Image from 'next/image';
import edit from '@/assets/images/icoEdit.png';
import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';

export default function Office() {
	let chkRefresh = getFromLocalStorage('ofcRefresh');
	const [auth] = useContext(AuthContext);
	const [menu, setMenu] = useContext(MenuContext);
	const [ofcData, setOfcData] = useState({});
	const [refresh, setRefresh] = useState(null);

	const setFunc = (func, id) => {
		setMenu({ type: menu.type, func: func });

		if (id) {
			saveInLocalStorage('ofcId', id);
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
		if (Object.keys(ofcData).length === 0 || refresh === true) {
			const getData = async () => {
				const response = await fetch(`${process.env.API_URL}/private/physicians/office/data/get?id=${auth.user.ofcObjId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					setOfcData(data.office);
				}

				setRefresh(false);
				removeFromLocalStorage('ofcRefresh');
			};
			getData();
		}
	}, [ofcData, auth, refresh]);

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
			{Object.keys(ofcData).length !== 0 && ofcData.name ? (
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
							<div className='colDataText'>{ofcData.mainphone}</div>
						</div>
					</div>
				</>
			) : (
				<div className='row'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>Office not setup yet</div>
					</div>
				</div>
			)}
		</>
	);
}
