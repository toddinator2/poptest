import { getFromLocalStorage, removeFromLocalStorage, saveInLocalStorage } from '@/utils/helpers/auth';

export function Today() {
	const today = new Date();
	const yyyy = today.getFullYear();
	let mm = today.getMonth() + 1; // Months start at 0!
	let dd = today.getDate();

	if (dd < 10) dd = '0' + dd;
	if (mm < 10) mm = '0' + mm;

	const formattedToday = mm + '/' + dd + '/' + yyyy;
	return formattedToday;
}

export function RandomStringMake(count) {
	const letter = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	let randomString = '';
	for (let i = 0; i < count; i++) {
		const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
		randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
	}
	return randomString;
}

export function IsValidEmail(email) {
	const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	return emailRegex.test(email);
}

export function IsNumeric(str) {
	if (!str) {
		return str;
	}
	const newString = str.replace(/[^\d]/g, '');
	return newString;
}

export function IsAlphanumeric(str) {
	if (!str) {
		return str;
	}
	const regex = /^[ A-Za-z0-9_-]*$/;
	return regex.test(str);
}

export function FormatDob(dobDate) {
	let newString = dobDate.split('/').join('');
	newString = newString.replace(/[^\d]/g, '');
	let month = '';
	let day = '';
	let year = '';

	if (newString.length <= 2) {
		month = newString.substring(0, 2);
		return month;
	}
	if (newString.length >= 3 && newString.length <= 4) {
		month = newString.substring(0, 2);
		day = newString.substring(2, 4);
		return month + '/' + day;
	}
	if (newString.length >= 5 && newString.length <= 8) {
		month = newString.substring(0, 2);
		day = newString.substring(2, 4);
		year = newString.substring(4);
		return month + '/' + day + '/' + year;
	}
	if (newString.length >= 8) {
		month = newString.substring(0, 2);
		day = newString.substring(2, 4);
		year = newString.substring(4, 8);
		return month + '/' + day + '/' + year;
	}
}

export function CalculateAge(date) {
	const dob = new Date(date);
	const month_diff = Date.now() - dob.getTime();
	const age_dt = new Date(month_diff);
	const year = age_dt.getUTCFullYear();
	const age = Math.abs(year - 1970);
	return age;
}

export function FormatPhoneNumber(value) {
	if (!value) return value;
	let phoneNumber = value.replace(/[^\d]/g, '');
	if (phoneNumber.charAt(0) === '1' || phoneNumber.charAt(0) === 1) {
		phoneNumber = '' + phoneNumber.slice(1);
	}
	const phoneNumberLength = phoneNumber.length;

	if (phoneNumberLength < 4) return phoneNumber;

	if (phoneNumberLength < 7) {
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
	}

	if (phoneNumberLength > 10) {
		phoneNumber = phoneNumber.substring(0, 10);
	}

	return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
}

export function FormatZip(value) {
	if (!value) return value;
	let newZip = value.replace(/[^\d]/g, '');
	if (newZip.length <= 5) {
		return newZip;
	} else {
		return newZip.slice(0, 5);
	}
}

export function FixVisitDate(date) {
	const [year, month, day] = date.split('-');
	const result = `${month}/${day}/${year}`;
	return result;
}

export function FixDob(dob) {
	const result = dob.split('/').join('');
	return result;
}

export function FixPhone(num) {
	let result = num.split('(').join('');
	result = result.split(')').join('');
	result = result.split(' ').join('');
	result = result.split('-').join('');
	return result;
}

export function FormatNumEmps(value) {
	if (!value) return value;
	let newEmps = value.replace(/[^\d]/g, '');
	if (newEmps.length <= 7) {
		return newEmps;
	} else {
		return newEmps.slice(0, 7);
	}
}

export function RandomNums(count) {
	const letter = '0123456789';
	let randomString = '';
	for (let i = 0; i < count; i++) {
		const randomStringNumber = Math.floor(1 + Math.random() * (letter.length - 1));
		randomString += letter.substring(randomStringNumber, randomStringNumber + 1);
	}
	return randomString;
}

export function CreateUsername(fname, lname) {
	let username = '';
	const fInit = fname.charAt(0).toLowerCase();
	const lInit = lname.slice(0, 3).toLowerCase();
	const end = RandomNums(4);
	username = fInit + lInit + end;
	return username;
}

export function CompareByName(a, b) {
	return a.name.localeCompare(b.name);
}

export function CompareByFName(a, b) {
	return a.fname.localeCompare(b.fname);
}

export function CompareByLabel(a, b) {
	return a.label.localeCompare(b.label);
}

export function FormatCurrency(value) {
	if (!value) return value;
	let strValue = value.toString();
	let tmpPrice = strValue.replace(/[^\d]/g, '');
	const tmpPriceLength = tmpPrice.length;

	if (tmpPriceLength < 3) return tmpPrice;

	if (tmpPriceLength >= 3) {
		let convertPrice = tmpPrice.toString();
		let cents = convertPrice.slice(-2);
		let dollars = convertPrice.slice(0, -2);
		return `${dollars}.${cents}`;
	}
}

export function CalcBFat(weight, feet, inches) {
	const w = parseInt(weight);
	const h = parseInt(feet) * 12 + parseInt(inches);
	return ((w / (h * h)) * 703).toFixed(2);
}

export function CreateS3xId(count) {
	const curYear = new Date().getFullYear();
	let letter = '';
	if (curYear === 2024 || curYear === 2050 || curYear === 2076) {
		letter = 'F';
	}
	if (curYear === 2025 || curYear === 2051 || curYear === 2077) {
		letter = 'G';
	}
	if (curYear === 2026 || curYear === 2052 || curYear === 2078) {
		letter = 'H';
	}
	if (curYear === 2027 || curYear === 2053 || curYear === 2079) {
		letter = 'I';
	}
	if (curYear === 2028 || curYear === 2054 || curYear === 2080) {
		letter = 'J';
	}
	if (curYear === 2029 || curYear === 2055 || curYear === 2081) {
		letter = 'K';
	}
	if (curYear === 2030 || curYear === 2056 || curYear === 2082) {
		letter = 'L';
	}
	if (curYear === 2031 || curYear === 2057 || curYear === 2083) {
		letter = 'M';
	}
	if (curYear === 2032 || curYear === 2058 || curYear === 2084) {
		letter = 'N';
	}
	if (curYear === 2033 || curYear === 2059 || curYear === 2085) {
		letter = 'O';
	}
	if (curYear === 2034 || curYear === 2060 || curYear === 2086) {
		letter = 'P';
	}
	if (curYear === 2035 || curYear === 2061 || curYear === 2087) {
		letter = 'Q';
	}
	if (curYear === 2036 || curYear === 2062 || curYear === 2088) {
		letter = 'R';
	}
	if (curYear === 2037 || curYear === 2063 || curYear === 2089) {
		letter = 'S';
	}
	if (curYear === 2038 || curYear === 2064 || curYear === 2090) {
		letter = 'T';
	}
	if (curYear === 2039 || curYear === 2065 || curYear === 2091) {
		letter = 'U';
	}
	if (curYear === 2040 || curYear === 2066 || curYear === 2092) {
		letter = 'V';
	}
	if (curYear === 2041 || curYear === 2067 || curYear === 2093) {
		letter = 'W';
	}
	if (curYear === 2042 || curYear === 2068 || curYear === 2094) {
		letter = 'X';
	}
	if (curYear === 2043 || curYear === 2069 || curYear === 2095) {
		letter = 'Y';
	}
	if (curYear === 2044 || curYear === 2070 || curYear === 2096) {
		letter = 'Z';
	}
	if (curYear === 2045 || curYear === 2071 || curYear === 2097) {
		letter = 'A';
	}
	if (curYear === 2046 || curYear === 2072 || curYear === 2098) {
		letter = 'B';
	}
	if (curYear === 2047 || curYear === 2073 || curYear === 2099) {
		letter = 'C';
	}
	if (curYear === 2048 || curYear === 2074 || curYear === 2100) {
		letter = 'D';
	}
	if (curYear === 2049 || curYear === 2075 || curYear === 2101) {
		letter = 'E';
	}
	const string = '012345678901234567890123456789012345678901234567890123456789';
	let randomString = letter;
	for (let i = 0; i < count; i++) {
		const randomStringNumber = Math.floor(1 + Math.random() * (string.length - 1));
		randomString = randomString + string.substring(randomStringNumber, randomStringNumber + 1);
	}
	return randomString;
}

export function CreateSponsorId(count) {
	const curYear = new Date().getFullYear();
	let letter = '';
	if (curYear === 2024 || curYear === 2050 || curYear === 2076) {
		letter = 'K';
	}
	if (curYear === 2025 || curYear === 2051 || curYear === 2077) {
		letter = 'L';
	}
	if (curYear === 2026 || curYear === 2052 || curYear === 2078) {
		letter = 'M';
	}
	if (curYear === 2027 || curYear === 2053 || curYear === 2079) {
		letter = 'N';
	}
	if (curYear === 2028 || curYear === 2054 || curYear === 2080) {
		letter = 'O';
	}
	if (curYear === 2029 || curYear === 2055 || curYear === 2081) {
		letter = 'P';
	}
	if (curYear === 2030 || curYear === 2056 || curYear === 2082) {
		letter = 'Q';
	}
	if (curYear === 2031 || curYear === 2057 || curYear === 2083) {
		letter = 'R';
	}
	if (curYear === 2032 || curYear === 2058 || curYear === 2084) {
		letter = 'S';
	}
	if (curYear === 2033 || curYear === 2059 || curYear === 2085) {
		letter = 'T';
	}
	if (curYear === 2034 || curYear === 2060 || curYear === 2086) {
		letter = 'U';
	}
	if (curYear === 2035 || curYear === 2061 || curYear === 2087) {
		letter = 'V';
	}
	if (curYear === 2036 || curYear === 2062 || curYear === 2088) {
		letter = 'W';
	}
	if (curYear === 2037 || curYear === 2063 || curYear === 2089) {
		letter = 'X';
	}
	if (curYear === 2038 || curYear === 2064 || curYear === 2090) {
		letter = 'Y';
	}
	if (curYear === 2039 || curYear === 2065 || curYear === 2091) {
		letter = 'Z';
	}
	if (curYear === 2040 || curYear === 2066 || curYear === 2092) {
		letter = 'A';
	}
	if (curYear === 2041 || curYear === 2067 || curYear === 2093) {
		letter = 'B';
	}
	if (curYear === 2042 || curYear === 2068 || curYear === 2094) {
		letter = 'C';
	}
	if (curYear === 2043 || curYear === 2069 || curYear === 2095) {
		letter = 'D';
	}
	if (curYear === 2044 || curYear === 2070 || curYear === 2096) {
		letter = 'E';
	}
	if (curYear === 2045 || curYear === 2071 || curYear === 2097) {
		letter = 'F';
	}
	if (curYear === 2046 || curYear === 2072 || curYear === 2098) {
		letter = 'G';
	}
	if (curYear === 2047 || curYear === 2073 || curYear === 2099) {
		letter = 'H';
	}
	if (curYear === 2048 || curYear === 2074 || curYear === 2100) {
		letter = 'I';
	}
	if (curYear === 2049 || curYear === 2075 || curYear === 2101) {
		letter = 'J';
	}
	const string = '012345678901234567890123456789012345678901234567890123456789';
	let randomString = letter;
	for (let i = 0; i < count; i++) {
		const randomStringNumber = Math.floor(1 + Math.random() * (string.length - 1));
		randomString = randomString + string.substring(randomStringNumber, randomStringNumber + 1);
	}
	return randomString;
}

export function CreateOfficeId(count) {
	const curYear = new Date().getFullYear();
	let letter = '';
	if (curYear === 2024 || curYear === 2050 || curYear === 2076) {
		letter = 'A';
	}
	if (curYear === 2025 || curYear === 2051 || curYear === 2077) {
		letter = 'B';
	}
	if (curYear === 2026 || curYear === 2052 || curYear === 2078) {
		letter = 'C';
	}
	if (curYear === 2027 || curYear === 2053 || curYear === 2079) {
		letter = 'D';
	}
	if (curYear === 2028 || curYear === 2054 || curYear === 2080) {
		letter = 'E';
	}
	if (curYear === 2029 || curYear === 2055 || curYear === 2081) {
		letter = 'F';
	}
	if (curYear === 2030 || curYear === 2056 || curYear === 2082) {
		letter = 'G';
	}
	if (curYear === 2031 || curYear === 2057 || curYear === 2083) {
		letter = 'H';
	}
	if (curYear === 2032 || curYear === 2058 || curYear === 2084) {
		letter = 'I';
	}
	if (curYear === 2033 || curYear === 2059 || curYear === 2085) {
		letter = 'J';
	}
	if (curYear === 2034 || curYear === 2060 || curYear === 2086) {
		letter = 'K';
	}
	if (curYear === 2035 || curYear === 2061 || curYear === 2087) {
		letter = 'L';
	}
	if (curYear === 2036 || curYear === 2062 || curYear === 2088) {
		letter = 'M';
	}
	if (curYear === 2037 || curYear === 2063 || curYear === 2089) {
		letter = 'N';
	}
	if (curYear === 2038 || curYear === 2064 || curYear === 2090) {
		letter = 'O';
	}
	if (curYear === 2039 || curYear === 2065 || curYear === 2091) {
		letter = 'P';
	}
	if (curYear === 2040 || curYear === 2066 || curYear === 2092) {
		letter = 'Q';
	}
	if (curYear === 2041 || curYear === 2067 || curYear === 2093) {
		letter = 'R';
	}
	if (curYear === 2042 || curYear === 2068 || curYear === 2094) {
		letter = 'S';
	}
	if (curYear === 2043 || curYear === 2069 || curYear === 2095) {
		letter = 'T';
	}
	if (curYear === 2044 || curYear === 2070 || curYear === 2096) {
		letter = 'U';
	}
	if (curYear === 2045 || curYear === 2071 || curYear === 2097) {
		letter = 'V';
	}
	if (curYear === 2046 || curYear === 2072 || curYear === 2098) {
		letter = 'W';
	}
	if (curYear === 2047 || curYear === 2073 || curYear === 2099) {
		letter = 'X';
	}
	if (curYear === 2048 || curYear === 2074 || curYear === 2100) {
		letter = 'Y';
	}
	if (curYear === 2049 || curYear === 2075 || curYear === 2101) {
		letter = 'Z';
	}
	const string = '012345678901234567890123456789012345678901234567890123456789';
	let randomString = letter;
	for (let i = 0; i < count; i++) {
		const randomStringNumber = Math.floor(1 + Math.random() * (string.length - 1));
		randomString = randomString + string.substring(randomStringNumber, randomStringNumber + 1);
	}
	return randomString;
}

export function GetAuthData(type) {
	if (type === 'patient') {
		const lsUserData = process.env.DATA_SUB;
		const lsRemUname = process.env.REM_SUB;
		const lsUsername = process.env.UNAME_SUB;
		const user = getFromLocalStorage(lsUserData);
		const remember = getFromLocalStorage(lsRemUname);
		const userUname = getFromLocalStorage(lsUsername);
		return { user: user, remember: remember, userUname: userUname };
	} else if (type === 'sponsor') {
		const lsUserData = process.env.DATA_SPN;
		const lsRemUname = process.env.REM_SPN;
		const lsUsername = process.env.UNAME_SPN;
		const user = getFromLocalStorage(lsUserData);
		const remember = getFromLocalStorage(lsRemUname);
		const userUname = getFromLocalStorage(lsUsername);
		return { user: user, remember: remember, userUname: userUname };
	} else if (type === 'physician') {
		const lsUserData = process.env.DATA_PHY;
		const lsOfficeData = process.env.DATA_OFC;
		const lsRemUname = process.env.REM_PHY;
		const lsUsername = process.env.UNAME_PHY;
		const lsOfficeId = process.env.OFC_ID;
		const user = getFromLocalStorage(lsUserData);
		const office = getFromLocalStorage(lsOfficeData);
		const remember = getFromLocalStorage(lsRemUname);
		const userUname = getFromLocalStorage(lsUsername);
		const officeid = getFromLocalStorage(lsOfficeId);
		return { user: user, office: office, remember: remember, userUname: userUname, officeid: officeid };
	} else if (type === 's3x') {
		const lsUserData = process.env.DATA_S3X;
		const lsRemUname = process.env.REM_S3X;
		const lsUsername = process.env.UNAME_S3X;
		const user = getFromLocalStorage(lsUserData);
		const remember = getFromLocalStorage(lsRemUname);
		const userUname = getFromLocalStorage(lsUsername);
		return { user: user, remember: remember, userUname: userUname };
	}
}

export function SaveAuthData(type, data) {
	if (type === 'patient') {
		const lsUserData = process.env.DATA_SUB;
		const lsRemUname = process.env.REM_SUB;
		const lsUsername = process.env.UNAME_SUB;
		saveInLocalStorage(lsUserData, JSON.stringify(data.userData));
		if (data.remember) {
			saveInLocalStorage(lsRemUname, data.remember);
			saveInLocalStorage(lsUsername, data.uname);
		} else {
			removeFromLocalStorage(lsRemUname);
			removeFromLocalStorage(lsUsername);
		}
		return;
	} else if (type === 'sponsor') {
		const lsUserData = process.env.DATA_SPN;
		const lsRemUname = process.env.REM_SPN;
		const lsUsername = process.env.UNAME_SPN;
		saveInLocalStorage(lsUserData, JSON.stringify(data.userData));
		if (data.remember) {
			saveInLocalStorage(lsRemUname, data.remember);
			saveInLocalStorage(lsUsername, data.uname);
		} else {
			removeFromLocalStorage(lsRemUname);
			removeFromLocalStorage(lsUsername);
		}
		return;
	} else if (type === 'physician') {
		const lsUserData = process.env.DATA_PHY;
		const lsOfficeData = process.env.DATA_OFC;
		const lsRemUname = process.env.REM_PHY;
		const lsUsername = process.env.UNAME_PHY;
		const lsOfficeId = process.env.OFC_ID;
		saveInLocalStorage(lsUserData, JSON.stringify(data.userData));
		saveInLocalStorage(lsOfficeData, JSON.stringify(data.ofcData));
		if (data.remember) {
			saveInLocalStorage(lsUsername, data.uname);
			saveInLocalStorage(lsOfficeId, data.ofcId);
			saveInLocalStorage(lsRemUname, data.remember);
		} else {
			removeFromLocalStorage(lsUsername);
			removeFromLocalStorage(lsOfficeId);
			removeFromLocalStorage(lsRemUname);
		}
		return;
	} else if (type === 's3x') {
		const lsUserData = process.env.DATA_S3X;
		const lsRemUname = process.env.REM_S3X;
		const lsUsername = process.env.UNAME_S3X;
		saveInLocalStorage(lsUserData, JSON.stringify(data.userData));
		if (data.remember) {
			saveInLocalStorage(lsRemUname, data.remember);
			saveInLocalStorage(lsUsername, data.uname);
		} else {
			removeFromLocalStorage(lsRemUname);
			removeFromLocalStorage(lsUsername);
		}
		return;
	}
}

export function FormatDate(date) {
	let newMonth = '';
	let newDay = '';
	let newHour = '';
	let newMinutes = '';
	const oldDate = new Date(date);
	let year = oldDate.getFullYear();
	let month = oldDate.getMonth() + 1;
	let day = oldDate.getDate();
	let hour = oldDate.getHours();
	let minutes = oldDate.getMinutes();

	if (month <= 9) {
		newMonth = ('0' + month).toString();
	} else {
		newMonth = month.toString();
	}
	if (day <= 9) {
		newDay = ('0' + day).toString();
	} else {
		newDay = day.toString();
	}
	if (hour <= 9) {
		newHour = ('0' + hour).toString();
	} else {
		newHour = hour.toString();
	}
	if (minutes <= 9) {
		newMinutes = ('0' + minutes).toString();
	} else {
		newMinutes = minutes.toString();
	}

	return `${year}-${newMonth}-${newDay}T${newHour}:${newMinutes}`;
}

export function FilterPtSearch(value, ptList) {
	let filteredData = [];
	const excludeColumns = ['_id', 'photo'];
	const lowercasedValue = value.toLowerCase().trim();
	if (lowercasedValue === '') {
		return filteredData;
	} else {
		filteredData = ptList.filter((item) => {
			return Object.keys(item).some((key) => (excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)));
		});
		return filteredData;
	}
}
