import secureLocalStorage from 'react-secure-storage';

export const getFromLocalStorage = (key) => {
	if (typeof window !== 'undefined') {
		const item = secureLocalStorage.getItem(key);
		if (item) {
			return item;
		}

		return null;
	}
};

export const saveInLocalStorage = (key, value) => {
	if (typeof window !== 'undefined') {
		secureLocalStorage.setItem(key, value);
	}
};

export const removeFromLocalStorage = (key) => {
	if (typeof window !== 'undefined') {
		const item = secureLocalStorage.getItem(key);
		if (item) {
			secureLocalStorage.removeItem(key);
		}
	}
};
