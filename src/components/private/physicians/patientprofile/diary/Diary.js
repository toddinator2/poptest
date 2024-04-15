'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { Today } from '@/components/global/functions/PageFunctions';
import Image from 'next/image';
import toast from 'react-hot-toast';
import add from '@/assets/images/icoAdd.png';

export default function Diary(patientId) {
	const newPtId = patientId.patientId;
	const today = Today();
	const [auth, _setAuth] = useContext(AuthContext);
	const [dryId, setDryId] = useState('');
	const [newNotes, setNewNotes] = useState('');
	const [curNotes, setCurNotes] = useState('');
	const [curPtId, setCurPtId] = useState('');
	const [shwAddDiv, setShwAddDiv] = useState(false);

	const reLoadDiary = useCallback(async () => {
		const response = await fetch(`${process.env.API_URL}/private/physicians/diary/get?ptid=${newPtId}&userid=${auth.user._id}`, {
			method: 'GET',
		});
		const data = await response.json();

		if (data.status === 200) {
			setDryId(data.diary._id);
			setCurNotes(data.diary.note);
		}
	}, [newPtId, auth]);

	useEffect(() => {
		if (curPtId !== newPtId) {
			setCurNotes('');
			//get any current notes
			const getNotes = async () => {
				try {
					const response = await fetch(`${process.env.API_URL}/private/physicians/diary/get?ptid=${newPtId}&userid=${auth.user._id}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						setDryId(data.diary._id);
						setCurNotes(data.diary.note);
					}
				} catch (error) {
					toast.error(data.msg);
					return;
				}
				setCurPtId(newPtId);
			};
			getNotes();
		}
	}, [curPtId, newPtId, auth]);

	const submitAdd = async (e) => {
		e.preventDefault();
		let updAdd = '';
		if (curNotes) {
			updAdd = today + '\n' + newNotes + '\n\n' + curNotes;
		} else {
			updAdd = today + '\n' + newNotes;
		}

		//update diary in database
		let response;
		if (dryId) {
			response = await fetch(`${process.env.API_URL}/private/physicians/diary/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: dryId,
					note: updAdd,
				}),
			});
		} else {
			response = await fetch(`${process.env.API_URL}/private/physicians/diary/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					note: updAdd,
					userid: auth.user._id,
					ptid: newPtId,
				}),
			});
		}
		const data = await response.json();

		if (data.status === 200) {
			setCurNotes(updAdd);
			setNewNotes('');
			setShwAddDiv(false);
			toast.success(data.msg);
			reLoadDiary();
		} else {
			toast.error('Diary notes did not save, please try again');
			document.getElementById('taAdd').focus();
			return;
		}
	};

	const handleAddDiv = () => {
		setShwAddDiv(!shwAddDiv);
	};

	return (
		<div className='ppDivRest mb-3 py-3'>
			<div className='row mb-2'>
				<div className='col-9 offset-1'>
					<div className='ppCompHdng'>DIARY</div>
				</div>
				<div className='col-2 d-flex justify-content-center'>
					<Image className='sphSideMenuIcon' src={add} title='Add Notes' alt='Add' onClick={() => handleAddDiv()} />
				</div>
			</div>
			{curNotes && (
				<div className='row'>
					<div className='col-10 offset-1'>
						<textarea className='form-control inpBorder' rows={2} readOnly value={curNotes} />
					</div>
				</div>
			)}
			{shwAddDiv && (
				<div className='row mt-2'>
					<div className='col-10 offset-1'>
						<textarea
							className='form-control inpBorder'
							id='taAdd'
							rows={2}
							placeholder='Add New Notes Here'
							value={newNotes}
							onChange={(e) => setNewNotes(e.target.value)}
							onBlur={submitAdd}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
