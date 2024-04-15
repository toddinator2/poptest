'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Draggable, Dropcontainer } from '@mobiscroll/react';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import PropTypes from 'prop-types';

const Appointment = (props) => {
	let hdrPt = '';
	const [draggable, setDraggable] = useState();

	const setDragElm = useCallback((elm) => {
		setDraggable(elm);
	}, []);

	const event = props.data;
	if (!event.photo) {
		const str = event.title;
		const matches = str.match(/\b(\w)/g);
		hdrPt = matches.join('');
	}

	return (
		<div>
			{!event.hide && (
				<div className='docs-appointment-task' ref={setDragElm} style={{ border: event.color }}>
					{event.photo ? <img className='hdrImg mx-2' src={event.photo} alt='img' /> : <div className='hdrInits mx-2'>{hdrPt}</div>}
					<Draggable dragData={event} element={draggable} />
				</div>
			)}
		</div>
	);
};

Appointment.propTypes = {
	data: PropTypes.object.isRequired,
};

export const Header = () => {
	const [appts, _setAppts] = useContext(ApptContext);
	const [office, _setOffice] = useContext(OfficeContext);
	const [ecomm, _setEcomm] = useContext(EcommContext);
	const [schPatients, _setSchPatients] = useContext(PatientContext);
	const [dropCont, setDropCont] = useState();
	const [_contBg, setContBg] = useState('');
	const [chkdToday, setChkdToday] = useState(false);
	const [apptsToday, setApptsToday] = useState([]);

	useEffect(() => {
		//set todays appointments
		if ((appts.todays.length !== 0 && apptsToday.length === 0 && !chkdToday) || apptsToday.length !== appts.todays.length) {
			let tmpArr = [];
			const defLoc = office.defLoc;
			for (let i = 0; i < appts.todays.length; i++) {
				const appt = appts.todays[i];
				if (appt.locationObjId === defLoc) {
					const cat = ecomm.cats.find((item) => item._id === appt.categoryObjId);
					const svc = ecomm.services.find((item) => item._id === appt.serviceObjId);
					const pt = schPatients.patients.find((item) => item._id === appt.patientObjId);
					const apptObj = {
						id: appt._id,
						title: appt.title,
						job: svc.name,
						color: cat.color,
						start: appt.start,
						end: appt.end,
						photo: pt.photo,
						unscheduled: false,
					};
					tmpArr.push(apptObj);
				}
			}
			setApptsToday(tmpArr);
			setChkdToday(true);
		}
	}, [appts, apptsToday, chkdToday, ecomm, office, schPatients]);

	const setDropElm = useCallback((elm) => {
		setDropCont(elm);
	}, []);

	const handleItemDrop = useCallback((args) => {
		if (args.data) {
			args.data.unscheduled = false;
			setApptsToday((prevAppointments) => [...prevAppointments, args.data]);
		}
		setContBg('');
	}, []);

	const handleItemDragEnter = useCallback((args) => {
		if (!(args.data && !args.data.unscheduled)) {
			setContBg('#d0e7d2');
		}
	}, []);

	const handleItemDragLeave = useCallback(() => {
		setContBg('');
	}, []);

	return (
		<div className='hdrContainer mbsc-col-sm-12 docs-appointment-cont' ref={setDropElm}>
			<Dropcontainer onItemDrop={handleItemDrop} onItemDragEnter={handleItemDragEnter} onItemDragLeave={handleItemDragLeave} element={dropCont}>
				<div className='hdrHdng mbsc-form-group-title'>Today&apos;s Appointments</div>
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-start align-items-center'>
						{apptsToday.length !== 0 ? (
							<>
								{apptsToday.map((appt) => (
									<Appointment key={appt.id} data={appt} />
								))}
							</>
						) : (
							<div className='errMsg ps-5'>No Appointments Today</div>
						)}
					</div>
				</div>
			</Dropcontainer>
		</div>
	);
};
