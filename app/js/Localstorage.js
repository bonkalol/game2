(function () {

	window.Storage.prototype.get = function(name, type) {
		if (this.getItem(name) !== null && typeof this.getItem(name) !== 'undefined') {
			if (type && type !== 'str') {
				return JSON.parse(this.getItem(name));
			} else {
				return this.getItem(name);
			}
		} else {
			return false;
		}
	};

	window.Storage.prototype.set = function(name, value) {
		this.setItem(name, value);
	};

})();