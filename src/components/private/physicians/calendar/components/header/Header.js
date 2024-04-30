'use client';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Draggable, Dropcontainer } from '@mobiscroll/react';
import { MiscContext } from '@/utils/context/physicians/MiscContext';
import Image from 'next/image';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

const Appointment = (props) => {
	let hdrInits = '';
	const [draggable, setDraggable] = useState();

	const setDragElm = useCallback((elm) => {
		setDraggable(elm);
	}, []);

	const patient = props.data;
	const dragData = {
		title: patient.fname + ' ' + patient.lname,
		ptId: patient._id,
	};

	if (!patient.photo || patient.photo === null) {
		const str = patient.fname + ' ' + patient.lname;
		const matches = str.match(/\b(\w)/g);
		hdrInits = matches.join('');
	}

	return (
		<div>
			{!patient.hide && (
				<div className='docs-appointment-task' ref={setDragElm}>
					{patient.photo ? (
						<Image className='hdrImg mx-2' src={patient.photo} width={50} height={50} alt='img' />
					) : (
						<div className='hdrInits mx-2'>{hdrInits}</div>
					)}
					<Draggable dragData={dragData} element={draggable} />
				</div>
			)}
		</div>
	);
};

Appointment.propTypes = {
	data: PropTypes.object.isRequired,
};

export const Header = () => {
	const dbName = process.env.REALM_DB;
	const [misc] = useContext(MiscContext);
	const [dropCont, setDropCont] = useState();
	const [_contBg, setContBg] = useState('');
	const [apptsToday, setApptsToday] = useState([]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPtsToday = useCallback(async () => {
		//set current machine timezone offset
		const dt = new Date();
		const diffTZ = dt.getTimezoneOffset();
		const offset = diffTZ * 60;

		try {
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/get/todays?locid=${misc.defLocId}&offset=${offset}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setApptsToday(data.todays);
			}
		} catch (err) {
			toast.error(data.msg);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		loadPtsToday();
	}, [loadPtsToday]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchAppts = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const appts = mongodb.db(dbName).collection('appointments');

			for await (const change of appts.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadPtsToday();
				}
			}
		};
		wchAppts();
	}, [dbName, loadPtsToday]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// PAGE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
		<div className='hdrContainer pt-2 mbsc-col-sm-12 docs-appointment-cont' ref={setDropElm}>
			<Dropcontainer onItemDrop={handleItemDrop} onItemDragEnter={handleItemDragEnter} onItemDragLeave={handleItemDragLeave} element={dropCont}>
				<div className='hdrHdng mbsc-form-group-title'>Today&apos;s Appointments</div>
				<div className='row mb-3'>
					<div className='col-12 d-flex justify-content-start align-items-center'>
						{apptsToday.length !== 0 ? (
							<>
								{apptsToday.map((appt) => (
									<Appointment key={appt._id} data={appt} />
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
