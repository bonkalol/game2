/*

	Wrapper for localStorage

*/
class Storage {

	get(name, type) {
		if (localStorage.getItem(name) !== null && typeof localStorage.getItem(name) !== 'undefined') {
			if (type && type !== 'str') {
				return JSON.parse(localStorage.getItem(name));
			} else {
				return localStorage.getItem(name);
			}
		} else {
			return false;
		}
	}

	set(name, value) {
		localStorage.setItem(name, value);
	}

}

window.storage = new Storage();