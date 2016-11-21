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

var PromisedTimeOut = (func, timeout) => {
	if (!func || !timeout) throw new Error('Defined func and timeout');
	func();
	return new Promise((resolve, reject) => {
		setTimeout(() => { resolve(); }, timeout);
	});
};

var $ = document.querySelector;
var $$ = document.querySelectorAll;