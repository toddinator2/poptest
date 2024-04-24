import React, { useContext, useEffect, useState } from 'react';
import { Today } from '@/components/global/functions/PageFunctions';
import { AuthContext } from '@/utils/context/global/AuthContext';
import Image from 'next/image';
import icoAdd from '@/assets/images/icoAdd.png';

export default function Addendum({ props }) {
	const newApptId = props._id;
	const today = Today();
	const [auth] = useContext(AuthContext);
	const [curApptId, setCurApptId] = useState('');
	const [id, setId] = useState('');
	const [add, setAdd] = useState('');
	const [pasigned, setPaSigned] = useState(false);
	const [prsigned, setPrSigned] = useState(false);

	const [newAdd, setNewAdd] = useState('');
	const [shwAddDiv, setShwAddDiv] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (curApptId !== newApptId) {
			setId(props._id);
			setAdd(props.add);
			setPaSigned(props.pa);
			setPrSigned(props.pr);
			setCurApptId(newApptId);
		}
	}, [props, curApptId, newApptId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE QUICK SAVE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const submitAdd = async (e) => {
		e.preventDefault();
		let updAdd = '';
		if (add) {
			updAdd = auth.user.fname + ' ' + auth.user.lname + '\n' + today + '\n' + newAdd + '\n\n' + add;
		} else {
			updAdd = auth.user.fname + ' ' + auth.user.lname + '\n' + today + '\n' + newAdd;
		}

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

		if (data.status !== 200) {
			toast.error('Addendum did not save, please try again');
			document.getElementById('taAdd').focus();
			return;
		} else {
			setAdd(updAdd);
			setNewAdd('');
			setShwAddDiv(false);
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleAddDiv = () => {
		setShwAddDiv(!shwAddDiv);
	};

	return (
		<div className='ppDivRest mb-3 py-3'>
			<div className='row mb-2 d-flex align-items-center'>
				{!pasigned && !prsigned ? (
					<div className='col-12 d-flex justify-content-center'>
						<div className='ppCompHdng'>ADDENDUM</div>
					</div>
				) : (
					<>
						<div className='col-9 offset-1'>
							<div className='ppCompHdng'>ADDENDUM</div>
						</div>
						<div className='col-2 d-flex justify-content-center'>
							<Image className='sphSideMenuIcon' src={icoAdd} title='Add Addendum' alt='Add' onClick={() => handleAddDiv()} />
						</div>
					</>
				)}
			</div>
			{prsigned && (
				<>
					<div className='row'>
						<div className='col-10 offset-1'>
							<textarea className='form-control inpBorder' rows={2} readOnly defaultValue={add} />
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
