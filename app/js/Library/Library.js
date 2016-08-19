var random = function(min, max) {
	return Math.floor(Math.random()*(max + 1 - min)) + min;
};

var isFunc = function(func) {
	return typeof func === 'function';
};