var random = function(min, max) {
	return Math.floor(Math.random()*(max + 1 - min)) + min;
};

var isFunc = function(func) {
	return typeof func === 'function';
};

var Listener = document.addEventListener;

Node.prototype.listener = function(type, callback) {
	this.addEventListener(type, callback);
};