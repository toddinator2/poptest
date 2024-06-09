export function AddMinutes(date, minutes) {
	const dateCopy = new Date(date);
	dateCopy.setMinutes(date.getMinutes() + minutes);

	return dateCopy;
}

export function EarliestStart(location) {
	let earliestStart = '06:00';
	if (location.starttime0 !== '' && location.starttime0 <= earliestStart) {
		earliestStart = location.starttime0;
	}
	if (location.starttime1 !== '' && location.starttime1 <= earliestStart) {
		earliestStart = location.starttime1;
	}
	if (location.starttime2 !== '' && location.starttime2 <= earliestStart) {
		earliestStart = location.starttime2;
	}
	if (location.starttime3 !== '' && location.starttime3 <= earliestStart) {
		earliestStart = location.starttime3;
	}
	if (location.starttime4 !== '' && location.starttime4 <= earliestStart) {
		earliestStart = location.starttime4;
	}
	if (location.starttime5 !== '' && location.starttime5 <= earliestStart) {
		earliestStart = location.starttime5;
	}
	if (location.starttime6 !== '' && location.starttime6 <= earliestStart) {
		earliestStart = location.starttime6;
	}

	return earliestStart;
}

export function LatestEnd(location) {
	let latestEnd = '19:00';
	if (location.endtime0 >= latestEnd) {
		latestEnd = location.endtime0;
	}
	if (location.endtime1 >= latestEnd) {
		latestEnd = location.endtime1;
	}
	if (location.endtime2 >= latestEnd) {
		latestEnd = location.endtime2;
	}
	if (location.endtime3 >= latestEnd) {
		latestEnd = location.endtime3;
	}
	if (location.endtime4 >= latestEnd) {
		latestEnd = location.endtime4;
	}
	if (location.endtime5 >= latestEnd) {
		latestEnd = location.endtime5;
	}
	if (location.endtime6 >= latestEnd) {
		latestEnd = location.endtime6;
	}

	return latestEnd;
}

export function SetInvalidTimes(location) {
	let invalid = [];
	//*** Sunday ***
	if (location.starttime0 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime0,
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
		});
		invalid.push({
			start: location.endtime0,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
		});
	}
	//*** Monday ***
	if (location.starttime1 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime1,
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
		});
		invalid.push({
			start: location.endtime1,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
		});
	}
	//*** Tuesday ***
	if (location.starttime2 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime2,
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
		});
		invalid.push({
			start: location.endtime2,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
		});
	}
	//*** Wednesday ***
	if (location.starttime3 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime3,
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
		});
		invalid.push({
			start: location.endtime3,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
		});
	}
	//*** Thursday ***
	if (location.starttime4 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime4,
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
		});
		invalid.push({
			start: location.endtime4,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
		});
	}
	//*** Friday ***
	if (location.starttime5 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime5,
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
		});
		invalid.push({
			start: location.endtime5,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
		});
	}
	//*** Saturday ***
	if (location.starttime6 !== '') {
		invalid.push({
			start: '00:00',
			end: location.starttime6,
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
		});
		invalid.push({
			start: location.endtime6,
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
		});
	} else {
		invalid.push({
			start: '00:00',
			end: '23:59',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
		});
	}

	return invalid;
}

export function SetColorOptions(location) {
	let options = [];
	//*** Sunday ***
	if (location.starttime0 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime0,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
		});
		options.push({
			start: location.startlunch0,
			end: location.endlunch0,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime0,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
		});
	} else {
		options.push({
			start: '00:00',
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SU',
			},
		});
	}
	//*** Monday ***
	if (location.starttime1 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime1,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
		});
		options.push({
			start: location.startlunch1,
			end: location.endlunch1,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime1,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
		});
	} else {
		options.push({
			start: location.endtime1,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'MO',
			},
		});
	}
	//*** Tuesday ***
	if (location.starttime2 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime2,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
		});
		options.push({
			start: location.startlunch2,
			end: location.endlunch2,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime2,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
		});
	} else {
		options.push({
			start: '00:00',
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TU',
			},
		});
	}
	//*** Wednesday ***
	if (location.starttime3 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime3,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
		});
		options.push({
			start: location.startlunch3,
			end: location.endlunch3,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime3,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
		});
	} else {
		options.push({
			start: '00:00',
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'WE',
			},
		});
	}
	//*** Thursday ***
	if (location.starttime4 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime4,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
		});
		options.push({
			start: location.startlunch4,
			end: location.endlunch4,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime4,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
		});
	} else {
		options.push({
			start: '00:00',
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'TH',
			},
		});
	}
	//*** Friday ***
	if (location.starttime5 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime5,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
		});
		options.push({
			start: location.startlunch5,
			end: location.endlunch5,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime5,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
		});
	} else {
		options.push({
			start: '00:00',
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'FR',
			},
		});
	}
	//*** Saturday ***
	if (location.starttime6 !== '') {
		options.push({
			start: '00:00',
			end: location.starttime6,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
		});
		options.push({
			start: location.startlunch6,
			end: location.endlunch6,
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
			title: 'Lunch',
		});
		options.push({
			start: location.endtime6,
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
		});
	} else {
		options.push({
			start: '00:00',
			end: '23:59',
			background: '#1c1c1c',
			recurring: {
				repeat: 'weekly',
				weekDays: 'SA',
			},
		});
	}

	return options;
}
