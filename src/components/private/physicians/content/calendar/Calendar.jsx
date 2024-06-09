import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './Calendar.css';
import {
	Button,
	CalendarNav,
	CalendarNext,
	CalendarPrev,
	CalendarToday,
	Eventcalendar,
	Popup,
	Segmented,
	SegmentedGroup,
	Select,
	setOptions,
} from '@mobiscroll/react';
import { MiscContext } from '@/utils/context/global/MiscContext';
import { PatientPopupContext } from '@/utils/context/physicians/PatientPopupContext';
import { FormatDate } from '@/components/global/functions/Functions';
import { EarliestStart, LatestEnd, SetColorOptions, SetInvalidTimes } from './functions/CalFunctions';
import { Header } from './components/header/Header';
import { CustomResource } from './components/resource/CustomResource';
import toast from 'react-hot-toast';
import PatientSearch from '../../sidebars/modules/patientsearch/PatientSearch';
import Spinner from '@/components/global/spinner/Spinner';

import * as Realm from 'realm-web';
const app = new Realm.App({ id: process.env.REALM_ID });

const newEventData = (args) => {
	return {
		title: '',
		start: args.start,
		end: new Date(+args.start + 30 * 60 * 1000),
		unscheduled: false,
	};
};

setOptions({
	theme: 'ios',
	themeVariant: 'dark',
});

//set unix times and offset
const now = new Date();
const diffTZ = now.getTimezoneOffset();
const offset = diffTZ * 60;
let today = new Date().toLocaleDateString();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

export default function Schedule() {
	//Necessary app state
	const dbName = process.env.REALM_DB;
	const [misc] = useContext(MiscContext);
	const [popPatients, setPopPatients] = useContext(PatientPopupContext);
	const [view, setView] = useState('week');
	const [calView, setCalView] = useState({});
	const [loading, setLoading] = useState(false);
	//Default calendar state needed from MBSC
	const [myEvents, setMyEvents] = useState([]);
	const [tempEvent, setTempEvent] = useState(null);
	const [isOpen, setOpen] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [anchor, setAnchor] = useState(null);
	//My state for app and calendar
	const [appts, setAppts] = useState([]);
	const [catId, setCatId] = useState('');
	const [doctors, setDoctors] = useState([]);
	const [rscOptions, setRscOptions] = useState([]);
	const [catOptions, setCatOptions] = useState([]);
	const [svcOptions, setSvcOptions] = useState([]);
	const [location, setLocation] = useState({});
	const [chkdEarly, setChkdEarly] = useState(false);
	const [earliestTime, setEarliestTime] = useState('');
	const [chkdLate, setChkdLate] = useState(false);
	const [latestTime, setLatestTime] = useState('');
	const [catColor, setCatColor] = useState('');
	const [edtId, setEdtId] = useState('');
	//Calendar Popup
	const [title, setTitle] = useState('');
	const [ptSelId, setPtSelId] = useState('');
	const [description, setDescription] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [catName, setCatName] = useState('');
	const [svcId, setSvcId] = useState('');
	const [rscsSelected, setRscsSelected] = useState(null);
	const [popupEventAllDay, setAllDay] = useState(false);
	const [popupEventDate, setDate] = useState([]);
	const [popupEventStatus, setStatus] = useState('busy');
	const [reason, setReason] = useState('');
	const [comment, setComment] = useState('');
	const [_mySelectedDate, setSelectedDate] = useState(now);
	const [_selectedColor, setSelectedColor] = useState('');

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA LOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadAppointments = useCallback(async () => {
		//all appointments
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/get/forloc?locid=${misc.defLocId}&offset=${offset}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				let tmpArr = [];
				setAppts(data.appts);
				//set myEvents
				for (let i = 0; i < data.appts.length; i++) {
					const ev = data.appts[i];
					const evObj = {
						id: ev._id,
						start: ev.start,
						end: ev.end,
						resource: ev.resource,
						title: ev.title,
						job: ev.description,
						color: ev.color,
					};
					tmpArr.push(evObj);
				}
				setMyEvents(tmpArr);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	const loadDoctors = useCallback(async () => {
		//resources for header
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/office/resources/get/forcalhdr?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				let tmpArr = [];
				for (let i = 0; i < data.rscs.length; i++) {
					const rsc = data.rscs[i];
					const rscObj = {
						id: rsc._id,
						name: rsc.name,
						description: rsc.description,
						photo: rsc.photo,
					};
					tmpArr.push(rscObj);
				}
				setDoctors(tmpArr);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	const loadRscOpts = useCallback(async () => {
		//resources for select
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/office/resources/get/forselect?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setRscOptions(data.rscs);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(err);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	const loadCatOpts = useCallback(async () => {
		//categories for select
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/office/ecomm/category/get/forloc?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setCatOptions(data.cats);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	const loadSvcOpts = useCallback(async () => {
		//services for select by category id
		if (catId) {
			try {
				setLoading(true);
				const response = await fetch(`${process.env.API_URL}/physicians/office/ecomm/service/get/forcat?catid=${catId}`, {
					method: 'GET',
				});
				const data = await response.json();

				if (data.status === 200) {
					setSvcOptions(data.svcs);
				}
			} catch (err) {
				toast.error(err);
			} finally {
				setLoading(false);
			}
		} else {
			setSvcOptions([]);
		}
	}, [catId]);

	const loadLocation = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(`${process.env.API_URL}/physicians/office/locations/get/byid?locid=${misc.defLocId}`, {
				method: 'GET',
			});
			const data = await response.json();

			if (data.status === 200) {
				setLocation(data.loc);
			} else {
				toast.error(data.msg);
			}
		} catch (err) {
			toast.error(data.msg);
		} finally {
			setLoading(false);
		}
	}, [misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOAD DATA
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		if (misc.defLocId) {
			loadAppointments();
		}
	}, [misc, loadAppointments]);

	useEffect(() => {
		if (misc.defLocId) {
			loadDoctors();
		}
	}, [misc, loadDoctors]);

	useEffect(() => {
		if (misc.defLocId) {
			loadRscOpts();
		}
	}, [misc, loadRscOpts]);

	useEffect(() => {
		if (misc.defLocId) {
			loadCatOpts();
		}
	}, [misc, loadCatOpts]);

	useEffect(() => {
		if (catId) {
			loadSvcOpts();
		}
	}, [catId, loadSvcOpts]);

	useEffect(() => {
		if (misc.defLocId) {
			loadLocation();
		}
	}, [misc, loadLocation]);

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
					loadAppointments();
				}
			}
		};
		wchAppts();
	}, [dbName, loadAppointments]);

	useEffect(() => {
		const wchDocs = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const rscs = mongodb.db(dbName).collection('resources');

			for await (const change of rscs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadDoctors();
					loadRscOpts();
				}
			}
		};
		wchDocs();
	}, [dbName, loadDoctors, loadRscOpts]);

	useEffect(() => {
		const wchCats = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const cats = mongodb.db(dbName).collection('categories');

			for await (const change of cats.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadCatOpts();
				}
			}
		};
		wchCats();
	}, [dbName, loadCatOpts]);

	useEffect(() => {
		const wchSvcs = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const svcs = mongodb.db(dbName).collection('services');

			for await (const change of svcs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadSvcOpts();
				}
			}
		};
		wchSvcs();
	}, [dbName, loadSvcOpts]);

	useEffect(() => {
		const wchLocs = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const locs = mongodb.db(dbName).collection('officelocations');

			for await (const change of locs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadLocation();
				}
			}
		};
		wchLocs();
	}, [dbName, loadLocation]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// LOCATION SPECIFIC VARIABLES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		//set earliest start time for location
		if ((!earliestTime && !chkdEarly && Object.keys(location).length !== 0) || location._id !== misc.defLocId) {
			const start = EarliestStart(location);
			setEarliestTime(start);
			setChkdEarly(true);
		}
	}, [earliestTime, chkdEarly, location, misc]);

	useEffect(() => {
		//set latest end time for location
		if ((!latestTime && !chkdLate && Object.keys(location).length !== 0) || location._id !== misc.defLocId) {
			const end = LatestEnd(location);
			setLatestTime(end);
			setChkdLate(true);
		}
	}, [latestTime, chkdLate, location, misc]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CALENDAR VIEW OPTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const invalid = useMemo(() => SetInvalidTimes(location), [location]);
	const colorOptions = useMemo(() => SetColorOptions(location), [location]);
	useEffect(() => {
		if (earliestTime && latestTime && Object.keys(calView).length === 0 && Object.keys(location).length !== 0) {
			setCalView({
				schedule: {
					type: 'week',
					allDay: false,
					startDay: location.startday,
					endDay: location.endday,
					startTime: earliestTime,
					endTime: latestTime,
				},
			});
		}
	}, [earliestTime, latestTime, calView, location]);

	const changeView = useCallback(
		(event) => {
			const value = event.target.value;
			setView(event.target.value);
			if (value === 'week' && earliestTime && latestTime) {
				setCalView({
					schedule: {
						type: 'week',
						allDay: false,
						startDay: location.startday,
						endDay: location.endday,
						startTime: earliestTime,
						endTime: latestTime,
					},
				});
			}
			if (value === 'day' && earliestTime && latestTime) {
				setCalView({
					schedule: {
						type: 'day',
						allDay: false,
						startDay: location.startday,
						endDay: location.endday,
						startTime: earliestTime,
						endTime: latestTime,
					},
				});
			}
		},
		[earliestTime, latestTime, location]
	);

	const customWithNavButtons = useCallback(
		() => (
			<div className='w-full flex flex-col sm:flex-row sm:items-center'>
				<div className='w-full sm:w-1/3 flex justify-center sm:justify-start'>
					<CalendarNav className='cal-header-nav' />
				</div>
				<div className='w-1/3 flex justify-center'>
					<div className='cal-header-picker'>
						<SegmentedGroup value={view} onChange={changeView}>
							<Segmented value='week'>Week</Segmented>
							<Segmented value='day'>Day</Segmented>
						</SegmentedGroup>
					</div>
				</div>
				<div className='w-1/3 flex justify-end'>
					<CalendarPrev className='cal-header-prev' />
					<CalendarToday className='cal-header-today' />
					<CalendarNext className='cal-header-next' />
				</div>
			</div>
		),
		[changeView, view]
	);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// POPUP VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		//set title and patient id in popup
		if (popPatients.selected && !title) {
			const selPtId = popPatients.selected;
			const pts = popPatients.patients;
			for (let i = 0; i < pts.length; i++) {
				const pt = pts[i];
				if (pt._id === selPtId) {
					setTitle(pt.fname + ' ' + pt.lname);
					setPtSelId(pt._id);
					break;
				}
			}
		}
	}, [popPatients, title]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SAVE AND DELETE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const saveEvent = async () => {
		const date = start.slice(0, 10);
		const unixstart = parseInt((new Date(start).getTime() / 1000).toFixed(0));
		const unixend = parseInt((new Date(end).getTime() / 1000).toFixed(0));

		const newEvent = {
			id: tempEvent.id,
			title: title,
			description: description,
			start: start,
			end: end,
			allDay: popupEventAllDay,
			status: popupEventStatus,
			color: catColor,
			resource: rscsSelected,
		};

		if (isEdit) {
			// update the event in the list
			const index = myEvents.findIndex((x) => x.id === tempEvent.id);
			let newEventList = [...myEvents];
			newEventList.splice(index, 1, newEvent);
			setMyEvents(newEventList);

			//update the appointment in the database
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/edit`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: edtId,
					date,
					description,
					start,
					end,
					color: catColor,
					comment,
					reason,
					unixstart,
					unixend,
					rscsSelected,
					categoryObjId: catId,
					serviceObjId: svcId,
					locationObjId: misc.defLocId,
					officeObjId: location.officeObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		} else {
			// add the new event to the list
			setMyEvents([...myEvents, newEvent]);
			// add new appointment to database
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/add`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					date,
					title,
					description,
					start,
					end,
					color: catColor,
					comment,
					reason,
					unixstart,
					unixend,
					rscsSelected,
					categoryObjId: catId,
					serviceObjId: svcId,
					patientObjId: ptSelId,
					locationObjId: misc.defLocId,
					officeObjId: location.officeObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		}
		setSelectedDate(popupEventDate[0]);

		// close the popup and set all variables back to empty
		setPopPatients({ patients: popPatients.patients, selected: '', filtered: [] });
		setTitle('');
		setCatId('');
		setCatName('');
		setSvcOptions([]);
		setSvcId('');
		setDescription('');
		setRscsSelected([]);
		setStart('');
		setEnd('');
		setReason('');
		setComment('');
		setOpen(false);
	};

	const deleteEvent = useCallback(
		async (event) => {
			setMyEvents(myEvents.filter((item) => item.id !== event.id));
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/delete?id=${event.id}`, {
				method: 'DELETE',
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		},
		[myEvents]
	);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SINGLE EVENT PRE-ACTION FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPopupForm = useCallback((event) => {
		setTitle(event.title);
		setDescription(event.description);
		setDate([event.start, event.end]);
		setAllDay(event.allDay || false);
		setStatus(event.status || 'busy');
		setSelectedColor(event.color || '');
	}, []);

	const handleEventCreate = (args) => {
		setTempEvent(args.event);
		loadPopupForm(args.event);
		//set the resource the event was clicked in
		if (rscOptions.length !== 0) {
			const evRsc = args.event.resource;
			const tmpArr = [];
			for (let i = 0; i < rscOptions.length; i++) {
				const rsc = rscOptions[i];
				if (rsc.value === evRsc) {
					tmpArr.push(rsc.value);
					break;
				}
			}
			setRscsSelected(tmpArr);
		}
		//set start and end times
		setStart(FormatDate(args.event.start));
		setEnd(FormatDate(args.event.end));
		setAnchor(args.domEvent.target);

		//open the popup
		setOpen(true);
	};

	const onEventClick = (args) => {
		const curTime = Math.floor(Date.now() / 1000);
		const event = appts.find((item) => item._id === args.event.id);
		if (event.unixstart >= curTime - 1800) {
			setEdit(true);
			setTempEvent({ ...args.event });
			setAnchor(args.domEvent.target);
			// set all data for popup form and load it
			setEdtId(event._id);
			setTitle(event.title);
			setCatName('');
			setDescription('');
			setCatId(event.categoryObjId);
			setSvcId(event.serviceObjId);
			setRscsSelected(event.resource);
			setStart(event.start);
			setEnd(event.end);
			setReason(event.reason);
			setComment(event.comment);
			loadSvcOpts();
			loadPopupForm(event);
			setOpen(true);
		} else {
			toast.error('Cannot make changes to past appointments');
			return;
		}
	};

	const onDeleteClick = useCallback(() => {
		deleteEvent(tempEvent);
		setOpen(false);
	}, [deleteEvent, tempEvent]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SINGLE EVENT POST-ACTION FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const onEventDragEnd = async (args) => {
		const newStart = FormatDate(args.event.start);
		const newEnd = FormatDate(args.event.end);
		const newUnixstart = parseInt((new Date(newStart).getTime() / 1000).toFixed(0));
		const newUnixend = parseInt((new Date(newEnd).getTime() / 1000).toFixed(0));
		let event = args.event;

		if (event.ptId) {
			//this was dragged from header so a new appointment
			setTitle(event.title);
			setPtSelId(event.ptId);
			handleEventCreate(args);
		} else {
			//this was dragged to change times or day
			//update event in list
			const updEvent = {
				id: args.event.id,
				title: event.title,
				description: event.description,
				start: newStart,
				end: newEnd,
				color: event.color,
				resource: args.event.resource,
			};
			const index = myEvents.findIndex((x) => x.id === args.event.id);
			let newEventList = [...myEvents];
			newEventList.splice(index, 1, updEvent);
			setMyEvents(newEventList);

			//*** update event in database ***
			const response = await fetch(`${process.env.API_URL}/physicians/appointments/edit/ondrag`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					_id: args.event.id,
					date: newStart.slice(0, 10),
					description: event.description,
					start: newStart,
					end: newEnd,
					color: event.color,
					comment: event.comment,
					reason: event.reason,
					unixstart: newUnixstart,
					unixend: newUnixend,
					pasignreqId: event.pasignreqId,
					pasignreqname: event.pasignreqname,
					prsignreqId: event.prsignreqId,
					prsignreqname: event.prsignreqname,
					resource: args.event.resource,
					categoryObjId: event.categoryObjId,
					serviceObjId: event.serviceObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				toast.success(data.msg);
			} else {
				toast.error(data.msg);
			}
		}
	};

	const onEventUpdated = useCallback(() => {
		// here you can update the event in your storage as well, after drag & drop or resize
		// ...
	}, []);

	const onEventDeleted = useCallback(
		(args) => {
			deleteEvent(args.event);
		},
		[deleteEvent]
	);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// POPUP FORM CHANGES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleCategory = (e) => {
		const value = e.target.value;
		setCatId(value);
		//set category color
		for (let i = 0; i < catOptions.length; i++) {
			const cat = catOptions[i];
			if (cat._id === value) {
				setCatColor(cat.color);
				break;
			}
		}
		loadSvcOpts();
	};

	const handleService = (e) => {
		const value = e.target.value;
		setSvcId(value);
		for (let i = 0; i < svcOptions.length; i++) {
			const svc = svcOptions[i];
			if (svc._id === value) {
				setDescription(svc.name);
				break;
			}
		}
	};

	const handleRscSelected = (args) => {
		setRscsSelected(args.value);
	};

	const onClose = useCallback(() => {
		setPopPatients({ patients: popPatients.patients, selected: '', filtered: [] });
		if (!isEdit) {
			// refresh the list, if add popup was canceled, to remove the temporary event
			setMyEvents([...myEvents]);
		}
		//set all variables back to original values
		setTitle('');
		setCatId('');
		setCatName('');
		setSvcOptions([]);
		setSvcId('');
		setDescription('');
		setRscsSelected([]);
		setStart('');
		setEnd('');
		setReason('');
		setComment('');
		setOpen(false);
	}, [isEdit, myEvents, popPatients, setPopPatients]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// POPUP OPTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const headerText = useMemo(() => (isEdit ? 'Edit Appointment' : 'New Appointment'), [isEdit]);
	const popupButtons = useMemo(() => {
		if (isEdit) {
			return [
				'cancel',
				{
					handler: () => {
						saveEvent();
					},
					keyCode: 'enter',
					text: 'Save',
					cssClass: 'mbsc-popup-button-primary',
				},
			];
		} else {
			return [
				'cancel',
				{
					handler: () => {
						saveEvent();
					},
					keyCode: 'enter',
					text: 'Add',
					cssClass: 'mbsc-popup-button-primary',
				},
			];
		}
	}, [isEdit, saveEvent]);

	const popupResponsive = useMemo(
		() => ({
			medium: {
				display: 'anchored',
				width: 400,
				fullScreen: false,
				touchUi: false,
			},
		}),
		[]
	);

	return (
		<>
			{misc.defLocId !== '' && (
				<div className='mbsc-grid mbsc-no-padding'>
					<div className='mbsc-row'>
						<Header />
					</div>
					<div className='mbsc-row'>
						<div className='mbsc-col-sm-12 docs-appointment-calendar'>
							{doctors.length >= 2 ? (
								<Eventcalendar
									data={myEvents}
									view={calView}
									dragToMove={true}
									dragToCreate={true}
									dragToResize={true}
									dragTimeStep={15}
									eventOverlap={true}
									externalDrop={true}
									externalDrag={true}
									resources={doctors}
									renderHeader={customWithNavButtons}
									renderResource={CustomResource}
									clickToCreate='double'
									invalid={invalid}
									colors={colorOptions}
									onEventCreate={handleEventCreate}
									onEventClick={onEventClick}
									onEventDragEnd={onEventDragEnd}
									extendDefaultEvent={newEventData}
								/>
							) : (
								<Eventcalendar
									data={myEvents}
									view={calView}
									dragToMove={true}
									dragToCreate={true}
									dragToResize={true}
									dragTimeStep={15}
									eventOverlap={true}
									externalDrop={true}
									externalDrag={true}
									resources={doctors}
									renderHeader={customWithNavButtons}
									clickToCreate='double'
									invalid={invalid}
									colors={colorOptions}
									onEventCreate={handleEventCreate}
									onEventClick={onEventClick}
									onEventDragEnd={onEventDragEnd}
									extendDefaultEvent={newEventData}
								/>
							)}
							<Popup
								display='anchored'
								fullScreen={true}
								contentPadding={false}
								headerText={headerText}
								buttons={popupButtons}
								isOpen={isOpen}
								onClose={onClose}
								responsive={popupResponsive}
								animation='slide-down'
								anchor={anchor}
							>
								<div className='w-full p-3'>
									{!title ? (
										<>
											<label className='frmLabel'>Patient:</label>
											<PatientSearch type='popup' />
										</>
									) : (
										<div className='flex flex-row items-center'>
											<div className='w-1/3'>
												<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
													Patient:
												</label>
											</div>
											<div className='w-2/3'>
												<div className='text-sm'>{title}</div>
											</div>
										</div>
									)}
									{/*}
									<div className='row pt-3 pb-2 d-flex align-items-center'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												Category:
											</label>
										</div>
										<div className='col-9 ps-3'>
											{!catName || !description ? (
												<>
													{catOptions.length === 0 ? (
														<select className='form-control inpBorder' style={{ width: '80%', height: '36px' }}>
															<option value='' key={0}>
																no categories found
															</option>
														</select>
													) : (
														<select
															className='form-control inpBorder'
															value={catId}
															onChange={(e) => handleCategory(e)}
															style={{ width: '80%', height: '36px' }}
														>
															<option value='select...' key={0}>
																select...
															</option>
															{catOptions.map((cat) => (
																<option value={cat._id} key={cat._id}>
																	{cat.name}
																</option>
															))}
														</select>
													)}
												</>
											) : (
												<div>{catName}</div>
											)}
										</div>
									</div>
									<div className='row pb-3 d-flex align-items-center'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												Service:
											</label>
										</div>
										<div className='col-9 ps-3'>
											{!catName || !description ? (
												<>
													{svcOptions.length === 0 ? (
														<select className='form-control' id='service' style={{ width: '80%', height: '36px' }}>
															<option value='' key={0}>
																select a category
															</option>
														</select>
													) : (
														<select
															className='form-control'
															id='service'
															value={svcId}
															onChange={(e) => handleService(e)}
															style={{ width: '80%', height: '36px' }}
														>
															<option value='' key={0}>
																select...
															</option>
															{svcOptions.map((svc) => (
																<option value={svc._id} key={svc._id}>
																	{svc.name}
																</option>
															))}
														</select>
													)}
												</>
											) : (
												<div>{description}</div>
											)}
										</div>
									</div>
									<div className='row py-3'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												Resources:
											</label>
										</div>
										<div className='col-9 ps-3'>
											<Select
												selectMultiple={true}
												data={rscOptions}
												display='anchored'
												touchUi={false}
												value={rscsSelected}
												onChange={handleRscSelected}
											/>
										</div>
									</div>
									<div className='row pt-3 pb-2 d-flex align-items-center'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												Start:
											</label>
										</div>
										<div className='col-9 ps-3'>
											<input
												className='inpBorder form-control'
												type='datetime-local'
												name='stDate'
												id='stDate'
												value={start}
												onChange={(e) => setStart(e.target.value)}
												style={{ width: '80%', height: '36px' }}
											/>
										</div>
									</div>
									<div className='row pb-3 d-flex align-items-center'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												End:
											</label>
										</div>
										<div className='col-9 ps-3'>
											<input
												className='inpBorder form-control'
												type='datetime-local'
												name='endDate'
												id='endDate'
												value={end}
												onChange={(e) => setEnd(e.target.value)}
												style={{ width: '80%', height: '36px' }}
											/>
										</div>
									</div>
									<div className='row pt-3 pb-2'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												Reason:
											</label>
										</div>
										<div className='col-9 ps-3'>
											<input
												className='inpBorder form-control'
												name='reason'
												id='reason'
												value={reason}
												onChange={(e) => setReason(e.target.value)}
												style={{ width: '80%', height: '36px' }}
											/>
										</div>
									</div>
									<div className='row pb-3'>
										<div className='col-3 d-flex justify-content-end'>
											<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
												Comment:
											</label>
										</div>
										<div className='col-9 ps-3'>
											<textarea
												className='inpBorder form-control'
												name='comment'
												id='comment'
												rows='2'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
												style={{ width: '80%' }}
											/>
										</div>
									</div>
									{isEdit ? (
										<div className='mbsc-button-group'>
											<Button className='mbsc-button-block' color='danger' variant='outline' onClick={onDeleteClick}>
												Delete event
											</Button>
										</div>
									) : null}
								{*/}
								</div>
							</Popup>
						</div>
					</div>
				</div>
			)}
			{loading && <Spinner />}
		</>
	);
}
