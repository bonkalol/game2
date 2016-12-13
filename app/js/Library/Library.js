var random = function(min, max) {
	return Math.floor(Math.random()*(max + 1 - min)) + min;
};

var isFunc = function(func) {
	return typeof func === 'function';
};

var PromisedTimeOut = (func, timeout) => {
	if (!func || !timeout) throw new Error('Defined func and timeout');
	func();
	return new Promise((resolve, reject) => {
		setTimeout(() => { resolve(); }, timeout);
	});
};

var _ = {};

_.required = function (variables) {
	variables.forEach((variable) => {
		if (typeof variable === 'undefined') throw new Error('Define all required arguments');
	});
};

_.getByKeyValue = function(arrayOfObjects, key, value) {
	if (!Array.isArray(arrayOfObjects)) throw new Error('First argument should be an array of objects');
	let finded = false;
	arrayOfObjects.forEach(function(obj) {
		if (obj[key] && obj[key] === value) finded = obj;
	});
	return finded;
};

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
HTMLElement.prototype.$ = function (query) {
	return this.querySelector(query);
};