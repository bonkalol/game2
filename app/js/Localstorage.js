/*

	Wrapper for localStorage

*/
class Storage {

	get(name) {
		if (localStorage.getItem(name) !== null && typeof localStorage.getItem(name) !== 'undefined') {
				return JSON.parse(localStorage.getItem(name));
		} else {
			return false;
		}
	}

	set(name, value) {
		localStorage.setItem(name, JSON.stringify(value));
	}

}
