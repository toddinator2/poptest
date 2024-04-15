import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Today } from '@/components/global/functions/PageFunctions';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { AuthContext } from '@/utils/context/global/AuthContext';
import Image from 'next/image';
import add from '@/assets/images/icoAdd.png';

export default function Addendum(apptId) {
	const id = apptId.apptId;
	const today = Today();
	const [appts, setAppts] = useContext(ApptContext);
	const [auth, _setAuth] = useContext(AuthContext);
	const [appt, setAppt] = useState({});
	const [curId, setCurId] = useState('');
	const [newAdd, setNewAdd] = useState('');
	const [shwAddDiv, setShwAddDiv] = useState(false);

	const reLoadAppt = useCallback(() => {
		setAppt(appts.all.find((x) => x._id === id));
	}, [appts, id]);

	useEffect(() => {
		//get appointment from context
		if (Object.keys(appt).length === 0 || curId !== id) {
			setAppt(appts.all.find((x) => x._id === id));
			setCurId(id);
		}
	}, [appt, appts, curId, id]);

	const submitAdd = async (e) => {
		e.preventDefault();
		let updAdd = '';
		if (appt.addendum) {
			updAdd = auth.user.fname + ' ' + auth.user.lname + '\n' + today + '\n' + newAdd + '\n\n' + appt.addendum;
		} else {
			updAdd = auth.user.fname + ' ' + auth.user.lname + '\n' + today + '\n' + newAdd;
		}

		//update addendum in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/addendum`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				addendum: updAdd,
			}),
		});
		const data = await response.json();

		if (data.status === 200) {
			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			const idxApptAll = tmpApptsAll.findIndex((x) => x._id === id);
			const idxApptTdy = tmpApptsTdy.findIndex((x) => x._id === id);
			const apptAll = tmpApptsAll[idxApptAll];
			const apptTdy = tmpApptsTdy[idxApptTdy];
			if (apptAll) {
				apptAll.addendum = updAdd;
			}
			if (idxApptTdy) {
				apptTdy.addendum = updAdd;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
			setNewAdd('');
			setShwAddDiv(false);
			reLoadAppt();
		} else {
			toast.error('Addendum did not save, please try again');
			document.getElementById('taAdd').focus();
			return;
		}
	};

	const handleAddDiv = () => {
		setShwAddDiv(!shwAddDiv);
	};

	return (
		<div className='ppDivRest mb-3 py-3'>
			<div className='row mb-2 d-flex align-items-center'>
				{!appt.pasigned && !appt.prsigned ? (
					<div className='col-12 d-flex justify-content-center'>
						<div className='ppCompHdng'>ADDENDUM</div>
					</div>
				) : (
					<>
						<div className='col-9 offset-1'>
							<div className='ppCompHdng'>ADDENDUM</div>
						</div>
						<div className='col-2 d-flex justify-content-center'>
							<Image className='sphSideMenuIcon' src={add} title='Add Addendum' alt='Add' onClick={() => handleAddDiv()} />
						</div>
					</>
				)}
			</div>
			{appt.prsigned && (
				<>
					<div className='row'>
						<div className='col-10 offset-1'>
							<textarea className='form-control inpBorder' rows={2} readOnly defaultValue={appt.addendum} />
						</div>
					</div>
					{shwAddDiv && (
						<div className='row mt-2'>
							<div className='col-10 offset-1'>
								<textarea
									className='form-control inpBorder'
									id='taAdd'
									rows={2}
									placeholder='Add New Addendum Here'
									value={newAdd}
									onChange={(e) => setNewAdd(e.target.value)}
									onBlur={submitAdd}
								/>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
