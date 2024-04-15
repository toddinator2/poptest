import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import './Calendar.css';
import { Button, CalendarNav, CalendarToday, Draggable, Eventcalendar, Popup, SegmentedGroup, SegmentedItem, setOptions } from '@mobiscroll/react';
import { AuthContext } from '@/utils/context/global/AuthContext';
import { PatientContext } from '@/utils/context/physicians/PatientsContext';
import { AddMinutes, FormatDate, SetColorOptions, SetInvalidTimes } from '@/components/global/functions/PageFunctions';
import toast from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';
import Select from 'react-select';
import imgNoPhoto from '@/assets/images/noProfile.png';

import * as Realm from 'realm-web';
import PatientSearch from '../global/patientsearch/PatientSearch';
const appId = process.env.REALM_ID;
const app = new Realm.App({ id: appId });

const newEventData = (args) => {
	return {
		title: '',
		start: args.start,
		end: new Date(+args.start + 15 * 60 * 1000),
	};
};

setOptions({
	theme: 'ios',
	themeVariant: 'light',
});

function DdPatients(props) {
	const pt = props.data;
	const [draggable, setDraggable] = useState();

	const setDragElm = useCallback((elm) => {
		setDraggable(elm);
	}, []);

	return (
		<div className='col-auto' key={pt.ptId} id='hdrPtImg'>
			<Link to={`/patientidredirect/${pt.ptId}`} title={`${pt.ptFname} ${pt.ptLname}`}>
				<div ref={setDragElm}>
					{pt.ptImg !== '' && pt.ptImg !== undefined && pt.ptImg !== null && <img className='ptImg' src={pt.ptImg} alt='' />}
					{(pt.ptImg === '' || pt.ptImg === undefined || pt.ptImg === null) && <div className='ptInits'>{`${pt.ptFinit}${pt.ptLinit}`}</div>}
				</div>
			</Link>
			<Draggable dragData={props.data} element={draggable} />
		</div>
	);
}

const today = new Date().toLocaleDateString();

const responsivePopup = {
	medium: {
		display: 'anchored',
		width: 450,
		fullScreen: false,
		touchUi: true,
	},
};

export default function Schedule() {
	const dbName = process.env.REACT_APP_DB_NAME;
	const { auth } = useContext(AuthContext);
	const [setFiltered] = useState([]);
	//Appointment
	const [appts, setAppts] = useState([]);
	const [myEvents, setMyEvents] = useState(appts);
	const [apptType, setApptType] = useState('none');
	const [edtApptId, setEdtApptId] = useState('');
	//Patient
	const [ctxPatients, setCtxPatients] = useContext(PatientContext);
	const [ptSearchText, setPtSearchText] = useState('');
	const [ptFiltered, setPtFiltered] = useState([]);
	const [patientObjId, setPatientObjId] = useState('');
	const [ptsToday, setPtsToday] = useState([]);
	//Category
	const [categories, setCategories] = useState([]);
	const [categoryObjId, setCategoryObjId] = useState('');
	//Service
	const [services, setServices] = useState([]);
	const [curSvcs] = useState([]);
	const [serviceObjId, setServiceObjId] = useState('');
	//Resources
	const [dbResources, setDbResources] = useState([]);
	const [resources, setResources] = useState([]);
	const [selectedResources, setSelectedResources] = useState([]);
	const [oldResource, setOldResource] = useState([]);
	const [oldSelectedResources, setOldSelectedResources] = useState([]);
	const [resourceOptions] = useState([]);
	//Calendar Popup
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [color, setColor] = useState('');
	const [start, setStart] = useState(null);
	const [end, setEnd] = useState(null);
	const [chief, setChief] = useState('');
	const [comment, setComment] = useState('');
	const [tempEvent, setTempEvent] = useState(null);
	const [isOpen, setOpen] = useState(false);
	const [isEdit, setIsEdit] = useState(false);
	const [anchor, setAnchor] = useState(null);
	//Other Variables
	const [paId, setPaId] = useState(null);
	const [paName, setPaName] = useState('');
	const [prId] = useState([]);

	const excludeColumns = [
		'_id',
		'mname',
		'email',
		'username',
		'password',
		'active',
		'photo',
		'address',
		'address2',
		'city',
		'state',
		'zip',
		'notes',
		'sex',
		'marital',
		'referredby',
		'hearabout',
		'visitreason',
		'pcpname',
		'pcpphone',
		'employer',
		'employerphone',
		'employermemberid',
		'subscriptionid',
		'poppcid',
		'patientcloverId',
		'emergencycontact',
		'emergencyphone',
		'emergencyrelation',
		'resetpwrd',
		'resetcode',
		'permission',
		'intakeprogress',
		'intakedone',
		'weightloss',
		'mainproviderObjId',
		'offices',
		'updatedAt',
		'createdAt',
		'__v',
	];

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// EVENT CALENDAR CODE
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE VIEW FUNCTIONALITY
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	let earliestStart = '23:00';
	let latestEnd = '';
	if (auth.location.starttime0 !== '' && auth.location.starttime0 <= earliestStart) {
		earliestStart = auth.location.starttime0;
	}
	if (auth.location.starttime1 !== '' && auth.location.starttime1 <= earliestStart) {
		earliestStart = auth.location.starttime1;
	}
	if (auth.location.starttime2 !== '' && auth.location.starttime2 <= earliestStart) {
		earliestStart = auth.location.starttime2;
	}
	if (auth.location.starttime3 !== '' && auth.location.starttime3 <= earliestStart) {
		earliestStart = auth.location.starttime3;
	}
	if (auth.location.starttime4 !== '' && auth.location.starttime4 <= earliestStart) {
		earliestStart = auth.location.starttime4;
	}
	if (auth.location.starttime5 !== '' && auth.location.starttime5 <= earliestStart) {
		earliestStart = auth.location.starttime5;
	}
	if (auth.location.starttime6 !== '' && auth.location.starttime6 <= earliestStart) {
		earliestStart = auth.location.starttime6;
	}
	if (auth.location.endtime0 >= latestEnd) {
		latestEnd = auth.location.endtime0;
	}
	if (auth.location.endtime1 >= latestEnd) {
		latestEnd = auth.location.endtime1;
	}
	if (auth.location.endtime2 >= latestEnd) {
		latestEnd = auth.location.endtime2;
	}
	if (auth.location.endtime3 >= latestEnd) {
		latestEnd = auth.location.endtime3;
	}
	if (auth.location.endtime4 >= latestEnd) {
		latestEnd = auth.location.endtime4;
	}
	if (auth.location.endtime5 >= latestEnd) {
		latestEnd = auth.location.endtime5;
	}
	if (auth.location.endtime6 >= latestEnd) {
		latestEnd = auth.location.endtime6;
	}
	const [view, setView] = useState('week');
	const [calView, setCalView] = useState({
		schedule: {
			type: 'week',
			allDay: false,
			startDay: auth.location.startday,
			endDay: auth.location.endday,
			startTime: earliestStart,
			endTime: latestEnd,
			timeCellStep: 30,
			timeLabelStep: 30,
		},
	});

	const changeView = (event) => {
		let calView = {};

		switch (event.target.value) {
			case 'year':
				calView = {
					calendar: { type: 'year', allDay: false },
				};
				break;
			case 'calendar':
				calView = {
					calendar: { labels: true, allDay: false },
				};
				break;
			case 'schedule':
				calView = {
					schedule: {
						type: 'week',
						allDay: false,
						startDay: auth.location.startday,
						endDay: auth.location.endday,
						startTime: earliestStart,
						endTime: latestEnd,
						timeCellStep: 30,
						timeLabelStep: 30,
					},
				};
				break;
			case 'day':
				calView = {
					schedule: {
						type: 'day',
						allDay: false,
						startDay: auth.location.startday,
						endDay: auth.location.endday,
						startTime: auth.location.starttime,
						endTime: auth.location.endtime,
					},
				};
				break;
			case 'agenda':
				calView = {
					calendar: { type: 'week', allDay: false },
					agenda: { type: 'day' },
				};
				break;
			default:
				calView = {
					calendar: { labels: true, allDay: false },
				};
				break;
		}

		setView(event.target.value);
		setCalView(calView);
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// END CHANGE VIEW FUNCTIONALITY
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// INDIVIDUAL START AND END DATES & TIMES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const invalid = useMemo(() => SetInvalidTimes(auth.location), [auth.location]);
	const colorOptions = useMemo(() => SetColorOptions(auth.location), [auth.location]);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// END INDIVIDUAL START AND END DATES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// NAVIGATION HEADER FUNCTIONALITY
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const [currentDate, setCurrentDate] = useState(new Date());
	const onSelectedDateChange = useCallback(
		(event) => {
			setCurrentDate(event.date);
		},
		[setCurrentDate]
	);
	const getPrevNextDay = useCallback((d, prev) => {
		let diff;
		if (prev) {
			diff = d.getDate() - 1;
		} else {
			diff = d.getDate() + 1;
		}
		return new Date(d.setDate(diff));
	}, []);
	const getFirstDayOfWeek = useCallback((d, prev) => {
		const day = d.getDay();
		const diff = d.getDate() - day + (prev ? -7 : 7);
		return new Date(d.setDate(diff));
	}, []);
	const navigatePage = useCallback(
		(prev) => {
			if (view === 'calendar') {
				const prevNextPage = new Date(currentDate.getFullYear(), currentDate.getMonth() + (prev ? -1 : 1), 1);
				setCurrentDate(prevNextPage);
			} else if (view === 'day') {
				const prevNextDay = getPrevNextDay(currentDate, prev);
				setCurrentDate(prevNextDay);
			} else {
				const prevNextSunday = getFirstDayOfWeek(currentDate, prev);
				setCurrentDate(prevNextSunday);
			}
		},
		[view, currentDate, getPrevNextDay, getFirstDayOfWeek]
	);

	const customWithNavButtons = () => {
		return (
			<div className='d-flex align-items-center'>
				<React.Fragment>
					<CalendarNav className='md-custom-header-nav' />
					<div className='md-custom-header-controls'>
						<Button onClick={() => navigatePage(true)} icon='material-arrow-back' variant='flat' className='md-custom-header-button'></Button>
						<CalendarToday className='md-custom-header-today' />
						<Button onClick={() => navigatePage(false)} icon='material-arrow-forward' variant='flat' className='md-custom-header-button'></Button>
					</div>
					<div className='md-custom-header-view'>
						<SegmentedGroup value={view} onChange={changeView}>
							<SegmentedItem value='calendar' icon='calendar' title='Month' />
							<SegmentedItem value='schedule' icon='line-calendar' />
							<SegmentedItem value='day' icon='material-format-list-numbered' />
						</SegmentedGroup>
					</div>
					{/*}
					{ptsToday.length !== 0 && (
						<div>
							<div className='row pb-1 d-flex align-items-center justify-content-center'>
								{ptsToday.map((pt, i) => (
									<DdPatients key={i} data={pt} />
								))}
							</div>
						</div>
					)}
                                {*/}
				</React.Fragment>
			</div>
		);
	};

	const renderCustomResource = (resource) => {
		return (
			<div className='resource-template-content'>
				<div className='resource-name'>{resource.name}</div>
				<div className='resource-description'>{resource.description}</div>
				{resource.photo !== 'No Photo' && <img className='resource-avatar' src={resource.photo} alt='' />}
				{resource.photo === 'No Photo' && <img className='resource-avatar' src={imgNoPhoto} alt='' />}
			</div>
		);
	};
	const getSelectedResources = async (rscId) => {
		const { data } = await axios.get(`getResource/${rscId}`);
		selectedResources.push({ label: data.name, value: data._id });
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// END NAVIGATION HEADER FUNCTIONALITY
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DATA & DATABASE CODE
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadAppointments = useCallback(async () => {
		try {
			const { data } = await axios.get(`/getOfficeAppointments/${auth.office._id}/${auth.location._id}`);
			if (data.length !== 0) {
				setAppts(data);
				setMyEvents(data);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, setAppts, setMyEvents]);
	const loadPatients = useCallback(async () => {
		try {
			const { data } = await axios.get(`/getOfficePatients/${auth.office._id}`);
			if (data.patients.length !== 0) {
				setCtxPatients({ patients: data.patients, selected: {}, filtered: [] });
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, setCtxPatients]);
	const loadCategories = useCallback(async () => {
		try {
			const { data } = await axios.get(`/getOfficeCategories/${auth.office._id}`);
			if (data.length !== 0) {
				setCategories(data);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, setCategories]);
	const loadServices = useCallback(async () => {
		try {
			const { data } = await axios.get(`/getOfficeServices/${auth.office._id}`);
			if (data.length !== 0) {
				setServices(data);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, setServices]);
	const loadResources = useCallback(async () => {
		try {
			const { data } = await axios.get(`/getOfficeResources/${auth.office._id}/${auth.location._id}`);
			if (data.length !== 0) {
				setResources(data);
				setDbResources(data);
				if (resourceOptions.length === 0) {
					data.forEach((rsc) => resourceOptions.push({ label: rsc.name, value: rsc._id }));
				}
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, resourceOptions]);
	const loadCurSvcs = useCallback(
		(catId) => {
			curSvcs.length = 0;
			services.forEach((svc) => {
				if (svc.catObjId === catId) {
					curSvcs.push({ id: svc._id, name: svc.name, price: svc.price });
				}
			});
		},
		[curSvcs, services]
	);
	const loadToday = useCallback(async () => {
		try {
			const dt = new Date();
			const diffTZ = dt.getTimezoneOffset();
			const offset = diffTZ * 60;
			const { data } = await axios.get(`/getApptsToday/${auth.office._id}/${auth.location._id}/${offset}`);
			if (data.length !== 0) {
				let tmpPts = [];
				setPtsToday([]);
				data.forEach(async (vst) => {
					const pt = await axios.get(`/getSinglePatient/${vst.patientObjId}`);
					const ptId = pt.data._id;
					const isInTmp = tmpPts.includes(ptId);
					if (!isInTmp) {
						tmpPts.push({
							ptId: ptId,
							ptFname: pt.data.fname,
							ptLname: pt.data.lname,
							ptFinit: pt.data.fname.charAt(0).toUpperCase(),
							ptLinit: pt.data.lname.charAt(0).toUpperCase(),
							ptImg: pt.data.photo,
						});
					}
					if (tmpPts.length === data.length) {
						setPtsToday(tmpPts);
					}
				});
			} else {
				setPtsToday([]);
			}
		} catch (err) {
			toast.error(err);
		}
	}, [auth, setPtsToday]);

	useEffect(() => {
		setFiltered(ctxPatients.filtered);
	}, [setFiltered, ctxPatients.filtered]);
	useEffect(() => {
		loadAppointments();
	}, [loadAppointments]);
	useEffect(() => {
		loadPatients();
	}, [loadPatients]);
	useEffect(() => {
		loadCategories();
	}, [loadCategories]);
	useEffect(() => {
		loadServices();
	}, [loadServices]);
	useEffect(() => {
		loadResources();
	}, [loadResources]);
	useEffect(() => {
		setStart(FormatDate(start));
	}, [setStart, start]);
	useEffect(() => {
		setEnd(FormatDate(end));
	}, [setEnd, end]);
	useEffect(() => {
		loadToday();
	}, [loadToday]);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// CHANGE STREAM WATCHES
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	useEffect(() => {
		const wchAppointments = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const appts = mongodb.db(dbName).collection('appointments');

			for await (const change of appts.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadAppointments();
					loadToday();
				}
			}
		};
		wchAppointments();
	}, [dbName, loadAppointments, loadToday]);
	useEffect(() => {
		const wchPatients = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const offices = mongodb.db(dbName).collection('offices');

			for await (const change of offices.watch({
				filter: {
					operationType: 'update',
					'fullDocument.signinId': auth.office.signinId,
				},
			})) {
				const { fullDocument } = change;
				if (fullDocument.signinId === auth.office.signinId) {
					loadPatients();
				}
			}
		};
		wchPatients();
	}, [dbName, loadPatients, auth]);
	useEffect(() => {
		const wchCategories = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const cats = mongodb.db(dbName).collection('categories');

			for await (const change of cats.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadCategories();
				}
			}
		};
		wchCategories();
	}, [dbName, loadCategories]);
	useEffect(() => {
		const wchServices = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const svcs = mongodb.db(dbName).collection('services');

			for await (const change of svcs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadServices();
				}
			}
		};
		wchServices();
	}, [dbName, loadServices]);
	useEffect(() => {
		const wchResources = async () => {
			await app.logIn(Realm.Credentials.anonymous());

			// Connect to the database
			const mongodb = app.currentUser.mongoClient('mongodb-atlas');
			const rscs = mongodb.db(dbName).collection('resources');

			for await (const change of rscs.watch()) {
				if (change.operationType === 'insert' || change.operationType === 'update' || change.operationType === 'delete') {
					loadResources();
				}
			}
		};
		wchResources();
	}, [dbName, loadResources]);

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE EVENT SAVE AND DELETE FUNCTIONS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SAVE EVENT
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const saveEvent = useCallback(async () => {
		const date = start.substring(0, start.indexOf('T'));
		const unixAppt = parseInt((new Date(start).getTime() / 1000).toFixed(0));
		const unixEnd = parseInt((new Date(end).getTime() / 1000).toFixed(0));
		resources.length = 0;
		if (selectedResources.length !== 0) {
			selectedResources.forEach(async (rsc) => {
				let id = rsc.value;
				resources.push(id);
			});
		}

		const newEvent = {
			id: tempEvent.id,
			title: title,
			description: description,
			resource: resources,
			start: start,
			end: end,
			comment: comment,
			chief: chief,
			status: 'free',
			color: color,
		};

		if (edtApptId || apptType === 'same') {
			// update the event in the list
			const index = myEvents.findIndex((x) => x.id === tempEvent.id);
			const newEventList = [...myEvents];
			newEventList.splice(index, 1, newEvent);
			setMyEvents(newEventList);

			// update in database
			if (apptType === 'same') {
				const { data } = await axios.put(`/updAppointment/${edtApptId}`, {
					date,
					title,
					description,
					start,
					end,
					color,
					comment,
					chiefcomplaint: chief,
					rescheduled: true,
					unixdate: unixAppt,
					unixend: unixEnd,
					pasignreqId: paId,
					pasignreqname: paName,
					prsignreqId: prId,
					resource: resources,
					ddresources: selectedResources,
					categoryObjId: tempEvent.categoryObjId,
					serviceObjId: tempEvent.serviceObjId,
					locationObjId: auth.location._id,
					patientObjId: tempEvent.patientObjId,
				});

				if (data.error) {
					toast.error(data.error);
					return;
				} else {
					toast.success('Appointment updated successfully');
				}
			} else {
				const { data } = await axios.put(`/updAppointment/${edtApptId}`, {
					date,
					title,
					description,
					start,
					end,
					color,
					comment,
					chiefcomplaint: chief,
					unixdate: unixAppt,
					unixend: unixEnd,
					pasignreqId: paId,
					pasignreqname: paName,
					prsignreqId: prId,
					resource: resources,
					ddresources: selectedResources,
					categoryObjId: tempEvent.categoryObjId,
					serviceObjId: tempEvent.serviceObjId,
					locationObjId: auth.location._id,
					patientObjId: tempEvent.patientObjId,
				});

				if (data.error) {
					toast.error(data.error);
					return;
				} else {
					toast.success('Appointment updated successfully');
				}
			}
		} else {
			const unixToday = parseInt((new Date(today).getTime() / 1000).toFixed(0));
			if (unixAppt >= unixToday) {
				// add the new event to the list
				setMyEvents((myEvents) => [...myEvents, newEvent]);
				// add to database
				try {
					const { data } = await axios.post(`/addAppointment`, {
						date,
						title,
						description,
						start,
						end,
						status: 'free',
						color,
						journey: "Hasn't Arrived",
						weight: '',
						feet: '',
						inches: '',
						pulse: '',
						respiration: '',
						bloodpressure: '',
						temperature: '',
						heartrate: '',
						oxygen: '',
						neck: '',
						waist: '',
						bfat: '',
						comment,
						chiefcomplaint: chief,
						addendum: '',
						noshow: false,
						cancelled: false,
						rescheduled: false,
						unixdate: unixAppt,
						unixend: unixEnd,
						pasignreqId: paId,
						pasignreqname: paName,
						pasigned: false,
						pasignedby: '',
						pasignedbyId: null,
						pasigneddate: '',
						prsignreqId: prId,
						prsigned: false,
						prsignedby: '',
						prsignedbyId: null,
						prsigneddate: '',
						resource: resources,
						ddresources: [],
						categoryObjId,
						serviceObjId,
						patientObjId,
						locationObjId: auth.location._id,
						officeObjId: auth.office._id,
					});
					if (data.error) {
						toast.error(data.error);
						return;
					} else {
						const newId = data._id;
						selectedResources.map(async (rsc) => {
							await axios.put(`updApptSelectedResource/${newId}`, { rsc });
						});
						toast.success('Appointment added successfully');
					}
				} catch (err) {
					toast.error('Appointment did not add successfully, please try again');
				}
			} else {
				setTempEvent(null);
				loadAppointments();
				toast.error('Cannot add an appointment in the past');
			}
		}
		setTitle('');
		setDescription('');
		setCategoryObjId('');
		setServiceObjId('');
		setResources([]);
		setSelectedResources([]);
		setStart('');
		setEnd('');
		setComment('');
		setChief('');
		setColor('');
		setApptType('none');
		setPaId(null);
		setPaName('');
		prId.length = 0;
		setIsEdit(false);
		setEdtApptId('');
		// close the popup
		setOpen(false);
	}, [
		apptType,
		auth,
		categoryObjId,
		color,
		comment,
		chief,
		description,
		end,
		myEvents,
		paId,
		paName,
		patientObjId,
		prId,
		resources,
		selectedResources,
		serviceObjId,
		start,
		tempEvent,
		title,
		edtApptId,
		loadAppointments,
	]);

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// DELETE EVENT
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const deleteEvent = async (event) => {
		setMyEvents(myEvents.filter((item) => item.id !== event.id));
		//Delete from database
		await axios.delete(`/delAppointment/${event._id}`);
		toast.success('Appointment deleted successfully');
	};

	const onDeleteClick = () => {
		deleteEvent(tempEvent);
		setOpen(false);
	};

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// POPUP CODE
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// POPUP OPTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const headerText = useMemo(() => (isEdit || apptType === 'same' ? 'Edit Appointment' : 'New Appointment'), [isEdit, apptType]);
	const popupButtons = useMemo(() => {
		if (isEdit || apptType === 'same') {
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
	}, [isEdit, saveEvent, apptType]);
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE POPUP LOAD/UNLOAD FUNCTIONS
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const loadPopupForm = useCallback((event) => {
		if (event.ptId) {
			setStart(event.start);
			setEnd(event.end);
		} else if (event._id) {
			setTitle(event.title);
			setDescription(event.description);
			setStart(event.start);
			setEnd(event.end);
		} else {
			const newEnd = AddMinutes(event.start, 15);
			setTitle(event.title);
			setDescription(event.description);
			setStart(event.start);
			setEnd(newEnd);
		}
	}, []);
	const onClose = () => {
		if (!isEdit) {
			// refresh the list, if add popup was canceled, to remove the temporary event
			setMyEvents([...myEvents]);
			// set all popup values to null
			setTitle('');
			setDescription('');
			setCategoryObjId('');
			setServiceObjId('');
			setResources([]);
			setSelectedResources([]);
			setStart('');
			setEnd('');
			setComment('');
			setChief('');
			setColor('');
			setApptType('none');
			setPaId(null);
			setPaName('');
			prId.length = 0;
			setIsEdit(false);
		}
		setOpen(false);
	};
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// HANDLE POPUP FORM CHANGES
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const handleApptType = (e) => {
		const value = e.target.value;
		setApptType(value);
	};
	const handlePtSearch = (e) => {
		const value = e.target.value;
		setTitle('');
		value === '' ? setPtSearchText('') : setPtSearchText(value);
		filterPtData(value);
	};
	const filterPtData = (value) => {
		const lowercasedValue = value.toLowerCase().trim();
		if (lowercasedValue === '') {
			setCtxPatients({ patients: ctxPatients.patients, selected: {}, filtered: [] });
			setPtSearchText('');
		} else {
			const filteredData = ctxPatients.patients.filter((item) => {
				return Object.keys(item).some((key) => (excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)));
			});
			setPtFiltered(filteredData);
		}
	};
	function handlePatient(patient) {
		const pt = patient.pt;
		setCtxPatients({ patients: ctxPatients.patients, selected: { pt }, filtered: [] });
		setTitle(pt.fname + ' ' + pt.lname);
		setPatientObjId(pt._id);
		setPtSearchText('');
		setPtFiltered([]);
	}
	function handleExternalPatient(patient) {
		const pt = patient.event;
		setCtxPatients({ patients: ctxPatients.patients, selected: { pt }, filtered: [] });
		setTitle(pt.ptFname + ' ' + pt.ptLname);
		setPatientObjId(pt.ptId);
		setPtSearchText('');
		setPtFiltered([]);
	}
	const handleCategory = (e) => {
		const value = e.target.value;
		setCategoryObjId(value);
		setServiceObjId('');
		setDescription('');
		categories.forEach((cat) => {
			if (cat._id === value) {
				setColor(cat.color);
			}
		});
		curSvcs.length = 0;
		services.forEach((svc) => {
			if (svc.catObjId === value) {
				curSvcs.push({ id: svc._id, name: svc.name, price: svc.price });
			}
		});
	};
	function handleService(e) {
		const value = e.target.value;
		const el = document.getElementById('service');
		setServiceObjId(value);
		setDescription(el.options[el.selectedIndex].text);
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	// SINGLE EVENT CODE
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	const onEventCreate = async (args) => {
		if (args.action === 'externalDrop') {
			setIsEdit(false);
			setTempEvent({ ...args.event });
			handleExternalPatient(args);
			await getSelectedResources(args.event.resource);
			setOpen(true);
			loadPopupForm(args.event);
			setAnchor(args.domEvent.target);
		} else {
			setIsEdit(false);
			setTempEvent({ ...args.event });
			// fill popup form with event data
			setTitle('');
			setDescription('');
			await getSelectedResources(args.event.resource);
			setOpen(true);
			loadPopupForm(args.event);
			setAnchor(args.domEvent.target);
		}
	};
	const onEventClick = (args) => {
		setIsEdit(true);
		setTempEvent({ ...args.event });
		// fill popup form with event data
		loadPopupForm(args.event);
		setEdtApptId(args.event._id);
		loadCurSvcs(args.event.categoryObjId);
		setResources(args.event.resource);
		setSelectedResources(args.event.ddresources);
		setCategoryObjId(args.event.categoryObjId);
		setServiceObjId(args.event.serviceObjId);
		setChief(args.event.chiefcomplaint);
		setComment(args.event.comment);
		setColor(args.event.color);
		setAnchor(args.domEvent.target);
		setOpen(true);
	};
	const onEventDragStart = async (args) => {
		setOldResource(args.event.resource);
		setOldSelectedResources(args.event.ddresources);
		args.event.resource = [];
		args.event.ddresources = [];
	};
	const onEventDragEnd = async (args) => {
		if (!args.event.ptId) {
			//This is NOT an external drag and drop
			let type = '';
			const newResource = args.event.resource;
			const newDate = FormatDate(args.event.start);
			const date = newDate.substring(0, newDate.indexOf('T'));
			const unixAppt = parseInt((new Date(args.event.start).getTime() / 1000).toFixed(0));
			resources.length = 0;
			selectedResources.length = 0;
			if (oldResource.includes(newResource) || newResource.length === 0) {
				oldResource.forEach((rsc) => {
					resources.push(rsc);
					type = 'same';
				});
			} else {
				resources.push(newResource);
				type = 'new';
			}
			if (oldSelectedResources.some((e) => e.value === newResource) || newResource.length === 0) {
				setSelectedResources(oldSelectedResources);
			} else {
				getSelectedResources(newResource);
			}

			if (args.event.date === date && type === 'same') {
				//This is if just dragging and dropping to change time
				const { data } = await axios.put(`/updAppointment/${args.event._id}`, {
					date,
					start: FormatDate(args.event.start),
					end: FormatDate(args.event.end),
					unixdate: unixAppt,
				});
				if (data.error) {
					toast.error(data.error);
					return;
				} else {
					toast.success('Appointment updated successfully');
				}
			} else {
				//This is if dragging and dropping entire appointment
				setTempEvent({ ...args.event, key: args.event._id });
				loadPopupForm(args.event);
				setApptType('');
				loadCurSvcs(args.event.categoryObjId);
				setCategoryObjId(args.event.categoryObjId);
				setServiceObjId(args.event.serviceObjId);
				setPatientObjId(args.event.patientObjId);
				setComment(args.event.comment);
				setColor(args.event.color);
				setAnchor(args.domEvent.target);
				setEdtApptId(args.event._id);
				setOpen(true);
			}
		}
	};

	return (
		<div className='mbsc-grid mbsc-no-padding'>
			<div className='mbsc-row'>
				<div className='mbsc-col-sm-12'>
					<Eventcalendar
						onSelectedDateChange={onSelectedDateChange}
						selectedDate={currentDate}
						renderHeader={customWithNavButtons}
						renderResource={renderCustomResource}
						groupBy='resource'
						resources={dbResources}
						data={myEvents}
						view={calView}
						clickToCreate='double'
						onEventCreate={onEventCreate}
						dragToCreate={true}
						dragToMove={true}
						dragToResize={true}
						dragTimeStep={15}
						externalDrop={true}
						touchUi={true}
						eventDelete={true}
						onEventClick={onEventClick}
						onEventDragStart={onEventDragStart}
						onEventDragEnd={onEventDragEnd}
						extendDefaultEvent={newEventData}
						height='100vh'
						invalidateEvent='start-end'
						colors={colorOptions}
						invalid={invalid}
					/>
					<Popup
						display='bottom'
						fullScreen={true}
						contentPadding={true}
						headerText={headerText}
						anchor={anchor}
						buttons={popupButtons}
						isOpen={isOpen}
						onClose={onClose}
						responsive={responsivePopup}
					>
						{apptType !== 'none' && (
							<div className='row mb-3'>
								<div className='col-6 d-flex justify-content-center align-items-center'>
									<input type='radio' id='new' name='apptType' value='new' onClick={(e) => handleApptType(e)} />
									&nbsp;&nbsp;
									<label className='frmLabel' htmlFor='new'>
										New Appointment
									</label>
								</div>
								<div className='col-6 d-flex justify-content-center align-items-center'>
									<input type='radio' id='same' name='apptType' value='same' onClick={(e) => handleApptType(e)} />
									&nbsp;&nbsp;
									<label className='frmLabel' htmlFor='same'>
										Same Appointment
									</label>
								</div>
							</div>
						)}
						<div className='row mb-1 d-flex align-items-center'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Patient
								</label>
							</div>
							<div className='col-10'>
								<input
									className='form-control'
									type='text'
									name='ptSearch'
									id='ptSearch'
									autoComplete='off'
									value={title === '' ? ptSearchText : title}
									onChange={handlePtSearch}
								/>
							</div>
						</div>
						{ptFiltered !== undefined && (
							<div className='row d-flex align-items-center'>
								<div className='col-2'></div>
								<div className='col-10'>
									<PatientSearch filteredData={ptFiltered} funcCall={handlePatient} />
								</div>
							</div>
						)}
						<div className='row mb-1 d-flex align-items-center'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Category
								</label>
							</div>
							<div className='col-10'>
								<select className='form-control' value={categoryObjId} onChange={(e) => handleCategory(e)}>
									<option value='' key={0}>
										Select Category...
									</option>
									{categories.map((cat) => (
										<option value={cat._id} key={cat._id}>
											{cat.category}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='row mb-1 d-flex align-items-center'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Service
								</label>
							</div>
							<div className='col-10'>
								<select className='form-control' id='service' value={serviceObjId} onChange={(e) => handleService(e)}>
									<option value='' key={0}>
										Select Service...
									</option>
									{curSvcs.map((svc) => (
										<option value={svc.id} key={svc.id}>
											{svc.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className='row mb-1 d-flex align-items-center'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Resources
								</label>
							</div>
							<div className='col-10'>
								<Select
									isMulti={true}
									value={selectedResources}
									options={resourceOptions}
									onChange={setSelectedResources}
									styles={{
										control: (baseStyles) => ({
											...baseStyles,
											backgroundColor: 'transparent',
											border: '1px solid #c9c9c9',
											borderRadius: '7px',
										}),
									}}
								/>
							</div>
						</div>
						<div className='row mb-1 d-flex align-items-center'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Start
								</label>
							</div>
							<div className='col-10'>
								<input className='form-control' type='datetime-local' name='stDate' id='stDate' value={start} onChange={(e) => setStart(e.target.value)} />
							</div>
						</div>
						<div className='row mb-1 d-flex align-items-center'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									End
								</label>
							</div>
							<div className='col-10'>
								<input className='form-control' type='datetime-local' name='endDate' id='endDate' value={end} onChange={(e) => setEnd(e.target.value)} />
							</div>
						</div>
						<div className='row mb-1'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Main Complaint
								</label>
							</div>
							<div className='col-10'>
								<input className='form-control' name='chief' id='chief' value={chief} onChange={(e) => setChief(e.target.value)} />
							</div>
						</div>
						<div className='row mb-1'>
							<div className='col-2'>
								<label className='frmLabel' style={{ margin: '0px', padding: '0px' }}>
									Comment
								</label>
							</div>
							<div className='col-10'>
								<textarea className='form-control' name='comment' id='comment' rows='3' value={comment} onChange={(e) => setComment(e.target.value)} />
							</div>
						</div>
						{isEdit ? (
							<div className='mbsc-button-group'>
								<Button className='mbsc-button-block' color='danger' variant='outline' onClick={onDeleteClick}>
									Delete event
								</Button>
							</div>
						) : null}
					</Popup>
				</div>
			</div>
		</div>
	);
}
