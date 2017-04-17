/*

	Wrapper for localStorage

*/
class Storage {
	get(name, type) {
		if (localStorage.getItem(name) !== null && typeof localStorage.getItem(name) !== 'undefined') {
				if (type === String) return localStorage.getItem(name);
				return JSON.parse(localStorage.getItem(name));
		} else {
			return false;
		}
	}
	set(name, value) {
		localStorage.setItem(name, value);
	}
}
