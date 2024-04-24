'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import toast from 'react-hot-toast';

export default function Objective({ props }) {
	const newApptId = props._id;
	const [auth] = useContext(AuthContext);
	const [curApptId, setCurApptId] = useState('');
	const [id, setId] = useState('');
	const [obj, setObj] = useState('');
	const [pasigned, setPaSigned] = useState(false);
	const [prsigned, setPrSigned] = useState(false);
	const [closeTempSel, setCloseTempSel] = useState(false);
	const [tmpOptions, setTmpOptions] = useState([]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadTemps = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/templates/get/bysoap/obj?userid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 400) {
				setTmpOptions([]);
			}

			if (data.status === 200) {
				setTmpOptions(data.temps);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadTemps();
	}, [loadTemps]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SET STATE VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (curApptId !== newApptId) {
			setId(props._id);
			setObj(props.obj);
			setPaSigned(props.pa);
			setPrSigned(props.pr);
			setCurApptId(newApptId);

			if (props.pr) {
				setCloseTempSel(true);
			}
		}
	}, [props, curApptId, newApptId]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE QUICK SAVE
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const submitObj = async (e) => {
		e.preventDefault();
		//update objective in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/objective`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				objective: obj,
			}),
		});
		const data = await response.json();

		if (data.status !== 200) {
			toast.error('Objective did not save, please try again');
			document.getElementById('objective').focus();
			return;
		}
	};

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleObjective = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setCloseTempSel(true);
		setObj(value);
	};

	const handleTempObjective = (e) => {
		e.preventDefault();
		const value = [...e.target.selectedOptions];
		let tmpArr = [];
		let tmpObj = '';

		for (let i = 0; i < value.length; i++) {
			const selId = value[i].value;
			for (let t = 0; t < tmpOptions.length; t++) {
				const temp = tmpOptions[t];
				if (temp._id.toString() === selId.toString()) {
					tmpArr.push({ _id: temp._id, body: temp.body });
					break;
				}
			}
		}

		if (tmpArr.length !== 0) {
			for (let i = 0; i < tmpArr.length; i++) {
				const temp = tmpArr[i];
				if (tmpObj) {
					tmpObj = tmpObj + '\n\n' + temp.body;
				} else {
					tmpObj = temp.body;
				}
			}
		}

		setObj(tmpObj);
	};

	return (
		<div className='ppDivSoap mb-3 py-3'>
			<div className='row mb-1'>
				<div className='col-12 d-flex justify-content-center'>
					<div className='ppCompHdng'>OBJECTIVE</div>
				</div>
			</div>
			{tmpOptions.length === 0 && !closeTempSel && (
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='errMsg'>No Templates Found</div>
					</div>
				</div>
			)}
			{tmpOptions.length !== 0 && !closeTempSel && (
				<div className='row mb-3'>
					<div className='col-10 offset-1'>
						<div className='frmLabel'>Templates</div>
					</div>
					<div className='col-10 offset-1'>
						<select className='form-control inpBorder' multiple size='2' onChange={(e) => handleTempObjective(e)}>
							{tmpOptions.map((tmp) => (
								<option value={tmp._id} key={tmp._id}>
									{tmp.name}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
			{!pasigned && !prsigned && (
				<div className='row'>
					<div className='col-10 offset-1'>
						<textarea
							className='ppta inpBorder'
							id='objective'
							rows='2'
							value={obj}
							onChange={(e) => handleObjective(e)}
							onBlur={(e) => submitObj(e)}
						/>
					</div>
				</div>
			)}
			{prsigned && (
				<div className='row'>
					<div className='col-10 offset-1'>
						<textarea className='ppta inpBorder' rows='2' readOnly value={props.obj} />
					</div>
				</div>
			)}
		</div>
	);
}
