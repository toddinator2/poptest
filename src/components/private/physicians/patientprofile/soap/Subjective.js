'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import toast from 'react-hot-toast';

export default function Subjective(apptId) {
	const id = apptId.apptId;
	const [auth, _setAuth] = useContext(AuthContext);
	const [appts, setAppts] = useContext(ApptContext);
	const [noTemps, setNoTemps] = useState(false);
	const [closeTempSel, setCloseTempSel] = useState(false);
	const [tmpOptions, setTmpOptions] = useState([]);
	const [appt, setAppt] = useState({});
	const [stop, setStop] = useState(false);
	const [subj, setSubj] = useState('');

	const loadTemps = useCallback(async () => {
		try {
			const response = await fetch(`${process.env.API_URL}/private/physicians/templates/get/bysoap/subj?userid=${auth.user._id}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 400) {
				setNoTemps(true);
			}

			if (data.status === 200) {
				setNoTemps(false);
				const temps = data.temps;
				let tmpArr = [];
				for (let i = 0; i < temps.length; i++) {
					const tmp = temps[i];
					if (tmp.category === 'Subjective') {
						tmpArr.push(tmp);
					}
				}
				setTmpOptions(tmpArr);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, setTmpOptions]);

	useEffect(() => {
		loadTemps();
	}, [loadTemps]);

	useEffect(() => {
		//get initial appointment data
		if (Object.keys(appt).length === 0 && id !== '') {
			const getAppt = async () => {
				try {
					const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byid?id=${id}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						setAppt(data.appt);
					}
				} catch (error) {
					toast.error(data.msg);
					return;
				}
			};
			getAppt();
		}
	}, [appt, id, setAppt]);

	useEffect(() => {
		//get appointment data if another appointment is clicked on
		if (Object.keys(appt).length !== 0 && id !== appt._id) {
			const getAppt = async () => {
				try {
					const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byid?id=${id}`, {
						method: 'GET',
					});
					const data = await response.json();

					if (data.status === 200) {
						setAppt(data.appt);
						setStop(false);
					}
				} catch (error) {
					toast.error(data.msg);
					return;
				}
			};
			getAppt();
		}
	}, [appt, id, setAppt]);

	useEffect(() => {
		if (Object.keys(appt).length !== 0 && !stop && id === appt._id) {
			if (appt.subjective !== null && appt.subjective !== undefined) {
				setSubj(appt.subjective);
			} else {
				setSubj('');
			}
			setStop(true);
		}
	}, [appt, id, stop]);

	const submitSubj = async (e) => {
		e.preventDefault();
		//update subjective in database
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit/subjective`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				_id: id,
				subjective: subj,
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
				apptAll.subjective = subj;
			}
			if (idxApptTdy) {
				apptTdy.subjective = subj;
			}

			tmpApptsAll.splice(idxApptAll, 1, apptAll);
			if (idxApptTdy !== null && idxApptTdy !== undefined) {
				tmpApptsTdy.splice(idxApptTdy, 1, apptTdy);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });
		} else {
			toast.error('Subjective did not save, please try again');
			document.getElementById('subjective').focus();
			return;
		}
	};

	const handleSubjective = (e) => {
		e.preventDefault();
		const value = e.target.value;
		setCloseTempSel(true);
		setSubj(value);
	};

	const handleTempSubjective = (e) => {
		e.preventDefault();
		const value = [...e.target.selectedOptions];
		let tmpArr = [];
		let tmpSubj = '';

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
				if (tmpSubj) {
					tmpSubj = tmpSubj + '\n\n' + temp.body;
				} else {
					tmpSubj = temp.body;
				}
			}
		}

		setSubj(tmpSubj);
	};

	return (
		<div className='ppDivSoap mb-3 py-3'>
			{!noTemps ? (
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-center'>
						<div className='ppCompHdng'>SUBJECTIVE</div>
					</div>
				</div>
			) : (
				<>
					<div className='row'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='ppCompHdng'>SUBJECTIVE</div>
						</div>
					</div>
					<div className='row mb-3'>
						<div className='col-12 d-flex justify-content-center'>
							<div className='errMsg'>No Templates Found</div>
						</div>
					</div>
				</>
			)}
			{!noTemps && !closeTempSel && (
				<div className='row mb-3'>
					<div className='col-10 offset-1'>
						<div className='frmLabel'>Templates</div>
					</div>
					<div className='col-10 offset-1'>
						<select className='form-control inpBorder' multiple size='2' onChange={(e) => handleTempSubjective(e)}>
							{tmpOptions.map((tmp) => (
								<option value={tmp._id} key={tmp._id}>
									{tmp.name}
								</option>
							))}
						</select>
					</div>
				</div>
			)}
			{!appt.pasigned && !appt.prsigned && (
				<div className='row'>
					<div className='col-10 offset-1'>
						<textarea
							className='ppta inpBorder'
							id='subjective'
							rows='2'
							value={subj}
							onChange={(e) => handleSubjective(e)}
							onBlur={(e) => submitSubj(e)}
						/>
					</div>
				</div>
			)}
			{appt.prsigned && (
				<div className='row'>
					<div className='col-10 offset-1'>
						<textarea className='ppta inpBorder' rows='2' readOnly value={appt.subjective} />
					</div>
				</div>
			)}
		</div>
	);
}
