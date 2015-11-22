/*

	Wrapper for localStorage

*/
class Storage {

	get(name, type) {
		if (localStorage.getItem(name) !== null && typeof localStorage.getItem(name) !== 'undefined') {
			if (type && type !== 'str') {
				return localStorage.getItem(name);
			} else {
				return JSON.parse(localStorage.getItem(name));
			}
		} else {
			return false;
		}
	}

	set(name, value) {
		localStorage.setItem(name, JSON.stringify(value));
	}

}
