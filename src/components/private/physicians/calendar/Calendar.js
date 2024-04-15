import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './Calendar.css';
import { Button, Eventcalendar, Popup, Select, setOptions, Toast } from '@mobiscroll/react';
import { FormatDate } from '@/components/global/functions/PageFunctions';
import { EarliestStart, LatestEnd, SetColorOptions, SetInvalidTimes } from './functions/PageFunctions';
import { Header } from './components/header/Header';
import { CustomResource } from './components/resource/CustomResource';
import { OfficeContext } from '@/utils/context/physicians/OfficeContext';
import { ApptContext } from '@/utils/context/physicians/Appointments';
import { EcommContext } from '@/utils/context/physicians/EcommContext';
import { PtPopContext } from '@/utils/context/physicians/PtsPopContext';
import toast from 'react-hot-toast';
import PatientSearch from '../sidebars/shared/patientsearch/PatientSearch';

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
const dt = new Date();
const diffTZ = dt.getTimezoneOffset();
const offset = diffTZ * 60;
let today = new Date().toLocaleDateString();
let tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);
const unixToday = parseInt((new Date(today).getTime() / 1000 + parseInt(offset)).toFixed(0));
const unixTomorrow = parseInt((new Date(tomorrow).getTime() / 1000 + parseInt(offset)).toFixed(0));

export default function Schedule() {
	//Necessary app state
	const [office, setOffice] = useContext(OfficeContext);
	const [appts, setAppts] = useContext(ApptContext);
	const [ecomm, setEcomm] = useContext(EcommContext);
	const [popPatients, setPopPatients] = useContext(PtPopContext);
	//Default calendar state needed from MBSC
	const [myEvents, setMyEvents] = useState([]);
	const [tempEvent, setTempEvent] = useState(null);
	const [undoEvent, setUndoEvent] = useState(null);
	const [isOpen, setOpen] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const [anchor, setAnchor] = useState(null);
	//My state for app and calendar
	const [edtId, setEdtId] = useState('');
	const [location, setLocation] = useState({});
	const [locId, setLocId] = useState('');
	const [chkdLocId, setChkdLocId] = useState(false);
	const [doctors, setDoctors] = useState([]);
	const [chkdDoctors, setChkdDoctors] = useState(false);
	const [chkdMyEvents, setChkdMyEvents] = useState(false);
	const [catOptions, setCatOptions] = useState([]);
	const [chkdCats, setChkdCats] = useState(false);
	const [svcOptions, setSvcOptions] = useState([]);
	const [chkdSvcs, setChkdSvcs] = useState(false);
	const [rscOptions, setRscOptions] = useState([]);
	const [chkdRscs, setChkdRscs] = useState(false);
	const [earliestTime, setEarliestTime] = useState('');
	const [chkdEarly, setChkdEarly] = useState(false);
	const [latestTime, setLatestTime] = useState('');
	const [chkdLate, setChkdLate] = useState(false);
	const [toastMessage, setToastMessage] = useState('');
	const [isToastOpen, setToastOpen] = useState(false);
	//Calendar Popup
	const [title, setTitle] = useState('');
	const [ptSelId, setPtSelId] = useState('');
	const [apptCalType, setApptCalType] = useState('');
	const [apptType, setApptType] = useState('');
	const [start, setStart] = useState('');
	const [end, setEnd] = useState('');
	const [catId, setCatId] = useState('');
	const [catName, setCatName] = useState('');
	const [catColor, setCatColor] = useState('');
	const [svcId, setSvcId] = useState('');
	const [description, setDescription] = useState('');
	const [rscsSelected, setRscsSelected] = useState(null);
	const [popupEventAllDay, setAllDay] = useState(true);
	const [popupEventDate, setDate] = useState([]);
	const [popupEventStatus, setStatus] = useState('busy');
	const [reason, setReason] = useState('');
	const [comment, setComment] = useState('');
	const [mySelectedDate, setSelectedDate] = useState(now);
	const [colorPickerOpen, setColorPickerOpen] = useState(false);
	const [colorAnchor, setColorAnchor] = useState(null);
	const [selectedColor, setSelectedColor] = useState('');
	const [tempColor, setTempColor] = useState('');
	const [isSnackbarOpen, setSnackbarOpen] = useState(false);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// RELOAD DATA FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadSvcsArray = useCallback(
		(value) => {
			let tmpArr = [];
			const svcs = ecomm.services;
			for (let i = 0; i < svcs.length; i++) {
				const svc = svcs[i];
				if (svc.catObjId === value) {
					tmpArr.push(svc);
				}
			}
			if (tmpArr.length === 0) {
				setSvcOptions([]);
				setChkdSvcs(true);
				setCatId('');
				toast.error('No services found for this category, please choose another category');
			} else {
				setSvcOptions(tmpArr);
			}
		},
		[ecomm]
	);

	const loadApptsContext = useCallback(
		async (title, starttime) => {
			let tmpArrAll = appts.all;
			let tmpArrTdy = appts.todays;
			//get new appointment to add to context
			const apptResponse = await fetch(`${process.env.API_URL}/private/physicians/appointments/get/byunixtitle?title=${title}&unixstart=${starttime}`, {
				method: 'GET',
			});
			const apptData = await apptResponse.json();

			if (apptData.status === 200) {
				tmpArrAll.push(apptData.appt);
				if (apptData.appt.unixstart > unixToday && apptData.appt.unixend < unixTomorrow) {
					tmpArrTdy.push(apptData.appt);
				}

				//update contexts
				setAppts({ all: tmpArrAll, todays: tmpArrTdy, prev: [], selected: {} });
			} else {
				return;
			}
		},
		[appts, setAppts]
	);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INITIAL LOAD DATA FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		//set location data
		if (locId !== office.defLoc) {
			const curLocs = office.locations;
			const ofcLoc = office.defLoc;
			for (let i = 0; i < curLocs.length; i++) {
				const loc = curLocs[i];
				if (loc._id === ofcLoc) {
					setLocation(loc);
					setChkdLocId(true);
					break;
				}
			}
		}
	}, [locId, office]);

	useEffect(() => {
		//set myEvents
		if ((myEvents.length === 0 && !chkdMyEvents) || locId !== office.defLoc) {
			let tmpArr = [];
			const ofcLoc = office.defLoc;
			for (let i = 0; i < appts.all.length; i++) {
				const ev = appts.all[i];
				if (ev.locationObjId === ofcLoc) {
					const cat = ecomm.cats.find((item) => item._id === ev.categoryObjId);
					const svc = ecomm.services.find((item) => item._id === ev.serviceObjId);
					const evObj = {
						id: ev._id,
						start: ev.start,
						end: ev.end,
						resource: ev.resource,
						title: ev.title,
						job: svc.name,
						color: cat.color,
					};
					tmpArr.push(evObj);
				}
			}
			setMyEvents(tmpArr);
			setChkdMyEvents(true);
		}
	}, [myEvents, chkdMyEvents, locId, office, appts, ecomm]);

	useEffect(() => {
		//set doctors for header
		if ((doctors.length === 0 && !chkdDoctors) || locId !== office.defLoc) {
			let tmpArr = [];
			const ofcLoc = office.defLoc;
			const allRscs = office.resources;
			for (let i = 0; i < allRscs.length; i++) {
				const rsc = allRscs[i];
				if (rsc.locationObjId === ofcLoc) {
					const rscObj = {
						id: rsc._id,
						name: rsc.name,
						description: rsc.description,
						photo: rsc.photo,
					};
					tmpArr.push(rscObj);
				}
			}
			setDoctors(tmpArr);
			setChkdDoctors(true);
		}
	}, [doctors, chkdDoctors, locId, office]);

	useEffect(() => {
		//set categories for this location
		if ((ecomm.cats.length !== 0 && !chkdCats) || locId !== office.defLoc) {
			let tmpArr = [];
			const ofcLoc = office.defLoc;
			const allCats = ecomm.cats;
			for (let i = 0; i < allCats.length; i++) {
				const cat = allCats[i];
				if (cat.locationObjId === ofcLoc) {
					const catObj = {
						id: cat._id,
						name: cat.name,
						color: cat.color,
					};
					tmpArr.push(catObj);
				}
			}
			setCatOptions(tmpArr);
			setChkdCats(true);
		}
	}, [ecomm, chkdCats, locId, office]);

	useEffect(() => {
		//set resources for dropdown
		if ((rscOptions.length === 0 && !chkdRscs) || locId !== office.defLoc) {
			let tmpArr = [];
			const ofcLoc = office.defLoc;
			const allRscs = office.resources;
			for (let i = 0; i < allRscs.length; i++) {
				const rsc = allRscs[i];
				if (rsc.locationObjId === ofcLoc) {
					const rscObj = {
						value: rsc._id,
						text: rsc.name,
					};
					tmpArr.push(rscObj);
				}
			}
			setRscOptions(tmpArr);
			setChkdRscs(true);
		}
	}, [rscOptions, chkdRscs, locId, office]);

	useEffect(() => {
		//set earliest start time for location
		if ((!earliestTime && !chkdEarly && Object.keys(location).length !== 0) || locId !== office.defLoc) {
			const start = EarliestStart(location);
			setEarliestTime(start);
			setChkdEarly(true);
		}
	}, [earliestTime, chkdEarly, location, locId, office]);

	useEffect(() => {
		//set latest end time for location
		if ((!latestTime && !chkdLate && Object.keys(location).length !== 0) || locId !== office.defLoc) {
			const end = LatestEnd(location);
			setLatestTime(end);
			setChkdLate(true);
		}
	}, [latestTime, chkdLate, location, locId, office]);

	useEffect(() => {
		//set locId to default location id
		if (chkdLocId && chkdMyEvents && chkdDoctors && chkdEarly && chkdLate) {
			setLocId(office.defLoc);
		}
	}, [chkdLocId, chkdMyEvents, chkdDoctors, chkdEarly, chkdLate, office]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// POPUP VALUES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

	const viewOption = {
		schedule: {
			type: 'week',
			allDay: false,
			startDay: location.startday,
			endDay: location.endday,
			startTime: earliestTime,
			endTime: latestTime,
		},
	};

	const invalid = useMemo(() => SetInvalidTimes(location), [location]);
	const colorOptions = useMemo(() => SetColorOptions(location), [location]);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// EVERYTHING ABOVE HERE IS GOOD
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SAVE AND DELETE FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const saveEvent = async () => {
		const date = start.slice(0, 10);
		let paId = '';
		let paName = '';
		let prId = '';
		let prName = '';
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

		//set people who need to sign visit
		const users = office.users;
		const resources = office.resources;
		for (let i = 0; i < rscsSelected.length; i++) {
			const rsc = rscsSelected[i];
			for (let r = 0; r < resources.length; r++) {
				const resource = resources[r];
				if (resource._id === rsc) {
					for (let u = 0; u < users.length; u++) {
						const user = users[u];
						if (user._id === resource.officeuserObjId) {
							if (user.permission === 'provider') {
								prId = user._id;
								prName = user.fname + ' ' + user.lname;
							} else if (user.permission === 'pa') {
								paId = user._id;
								paName = user.fname + ' ' + user.lname;
								if (!prId) {
									prId = user.supervisor;
									for (let s = 0; s < office.users.length; s++) {
										const prv = office.users[s];
										if (prv._id === prId) {
											prName = prv.fname + ' ' + prv.lname;
										}
									}
								}
							} else {
								if (!prId && i === rscsSelected.length - 1) {
									prId = user.supervisor;
									for (let s = 0; s < office.users.length; s++) {
										const prv = office.users[s];
										if (prv._id === prId) {
											prName = prv.fname + ' ' + prv.lname;
										}
									}
								}
							}
							break;
						}
					}
					break;
				}
			}
		}

		if (isEdit) {
			// update the event in the list
			const index = myEvents.findIndex((x) => x.id === tempEvent.id);
			let newEventList = [...myEvents];
			newEventList.splice(index, 1, newEvent);
			setMyEvents(newEventList);

			//update the appointments context
			let tmpApptsAll = appts.all;
			let tmpApptsTdy = appts.todays;
			let evIdxTdy = null;
			const evIdxAll = tmpApptsAll.findIndex((x) => x._id === edtId);
			if (unixstart > unixToday && unixend < unixTomorrow) {
				evIdxTdy = tmpApptsTdy.findIndex((x) => x._id === edtId);
			}
			const evObj = {
				_id: edtId,
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
				pasignreqId: paId,
				pasignreqname: paName,
				prsignreqId: prId,
				prsignreqname: prName,
				resource: rscsSelected,
				categoryObjId: catId,
				serviceObjId: svcId,
				patientObjId: ptSelId,
				locationObjId: locId,
				officeObjId: location.officeObjId,
			};
			tmpApptsAll.splice(evIdxAll, 1, evObj);
			if (evIdxTdy !== null) {
				tmpApptsTdy.splice(evIdxTdy, 1, evObj);
			}
			setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });

			//update the appointment in the database
			const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit`, {
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
					pasignreqId: paId,
					pasignreqname: paName,
					prsignreqId: prId,
					prsignreqname: prName,
					resource: rscsSelected,
					categoryObjId: catId,
					serviceObjId: svcId,
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
			// add new appointment to database first to get new _id
			const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/add`, {
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
					pasignreqId: paId,
					pasignreqname: paName,
					prsignreqId: prId,
					prsignreqname: prName,
					resource: rscsSelected,
					categoryObjId: catId,
					serviceObjId: svcId,
					patientObjId: ptSelId,
					locationObjId: locId,
					officeObjId: location.officeObjId,
				}),
			});
			const data = await response.json();

			if (data.status === 200) {
				//update context
				await loadApptsContext(title, unixstart);
				toast.success('Appointment created successfully');
			}
		}
		setSelectedDate(popupEventDate[0]);

		// close the popup and set all variables back to empty
		setPopPatients({ patients: popPatients.patients, selected: '', filtered: [] });
		setEcomm({ cats: ecomm.cats, selCat: {}, services: ecomm.services, selSvc: {} });
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
		(event) => {
			setMyEvents(myEvents.filter((item) => item.id !== event.id));
			setUndoEvent(event);
			setTimeout(() => {
				setSnackbarOpen(true);
			});
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
		const event = appts.all.find((item) => item._id === args.event.id);
		if (event.unixstart >= curTime - 1800) {
			setEdit(true);
			setTempEvent({ ...args.event });
			setAnchor(args.domEvent.target);
			// set all data for popup form and load it
			loadSvcsArray(event.categoryObjId);
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
		let event = appts.all.find((item) => item._id === args.event.id);

		//*** update the event in the list ***
		const updEvent = {
			id: args.event.id,
			title: event.title,
			description: event.description,
			start: newStart,
			end: newEnd,
			allDay: null,
			status: null,
			color: event.color,
			resource: args.event.resource,
		};
		const index = myEvents.findIndex((x) => x.id === args.event.id);
		let newEventList = [...myEvents];
		newEventList.splice(index, 1, updEvent);
		setMyEvents(newEventList);

		//*** update the event in context ***
		event['date'] = newStart.slice(0, 10);
		event['start'] = newStart;
		event['end'] = newEnd;
		event['unixstart'] = newUnixstart;
		event['unixend'] = newUnixend;
		event['resource'] = args.event.resource;
		let tmpApptsAll = appts.all;
		let tmpApptsTdy = appts.todays;
		let evIdxTdy = null;
		const evIdxAll = tmpApptsAll.findIndex((x) => x._id === args.event.id);
		if (newUnixstart > unixToday && newUnixend < unixTomorrow) {
			evIdxTdy = tmpApptsTdy.findIndex((x) => x._id === args.event.id);
		}

		tmpApptsAll.splice(evIdxAll, 1, event);
		if (evIdxTdy !== null) {
			tmpApptsTdy.splice(evIdxTdy, 1, event);
		}
		setAppts({ all: tmpApptsAll, todays: tmpApptsTdy, prev: [], selected: {} });

		//*** update event in database ***
		const response = await fetch(`${process.env.API_URL}/private/physicians/appointments/edit`, {
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
		for (let i = 0; i < catOptions.length; i++) {
			const cat = catOptions[i];
			if (cat.id === value) {
				setCatName(cat.name);
				setCatColor(cat.color);
				break;
			}
		}
		loadSvcsArray(value);
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
		setOffice({
			locations: office.locations,
			selLoc: office.selLoc,
			locOptions: office.locOptions,
			defLoc: office.defLoc,
			users: office.users,
			selUser: office.selUser,
			resources: office.resources,
			selRscs: args.value,
			rscOptions: office.rscOptions,
		});
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
	const headerText = useMemo(() => (isEdit || apptType === 'same' ? 'Edit Appointment' : 'New Appointment'), [isEdit, apptType]);
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

	const handleCloseToast = useCallback(() => {
		setToastOpen(false);
	}, []);

	return (
		<>
			{office?.defLoc !== '' && (
				<div className='mbsc-grid mbsc-no-padding'>
					<div className='mbsc-row'>
						<Header />
					</div>
					<div className='mbsc-row'>
						<div className='mbsc-col-sm-12 docs-appointment-calendar'>
							<Eventcalendar
								data={myEvents}
								view={viewOption}
								dragToMove={true}
								dragToCreate={true}
								dragToResize={true}
								dragTimeStep={15}
								eventOverlap={true}
								externalDrop={true}
								externalDrag={true}
								resources={doctors}
								renderResource={CustomResource}
								clickToCreate='double'
								invalid={invalid}
								colors={colorOptions}
								onEventCreate={handleEventCreate}
								onEventClick={onEventClick}
								onEventDragEnd={onEventDragEnd}
								extendDefaultEvent={newEventData}
							/>
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
								<div className='popupContainer'>
									{!title ? (
										<div className='row py-3'>
											<div className='col-3 d-flex justify-content-end'>
												<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
													Patient:
												</label>
											</div>
											<div className='col-9 ps-3'>
												<PatientSearch type='popup' />
											</div>
										</div>
									) : (
										<div className='row py-3 d-flex align-items-center'>
											<div className='col-3 d-flex justify-content-end'>
												<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
													Patient:
												</label>
											</div>
											<div className='col-9 ps-3'>
												<div>{title}</div>
											</div>
										</div>
									)}
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
																<option value={cat.id} key={cat.id}>
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
												rows='3'
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
								</div>
							</Popup>
							<Toast isOpen={isToastOpen} message={toastMessage} onClose={handleCloseToast} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}
