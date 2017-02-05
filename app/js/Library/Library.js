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

if (!Object.assign) {
	Object.defineProperty(Object, 'assign', {
		enumerable: false,
		configurable: true,
		writable: true,
		value: function(target, firstSource) {
			'use strict';
			if (target === undefined || target === null) {
				throw new TypeError('Cannot convert first argument to object');
			}

			var to = Object(target);
			for (var i = 1; i < arguments.length; i++) {
				var nextSource = arguments[i];
				if (nextSource === undefined || nextSource === null) {
					continue;
				}

				var keysArray = Object.keys(Object(nextSource));
				for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
					var nextKey = keysArray[nextIndex];
					var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
					if (desc !== undefined && desc.enumerable) {
						to[nextKey] = nextSource[nextKey];
					}
				}
			}
			return to;
		}
	});
}

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

_.getRandom = function() {
	return parseInt(Math.random()*1e+10)+parseInt(Math.random()*1e+10)+String.fromCharCode(parseInt(Math.random()*(100-65)+65));
}

_.setProps = function(appendTo, object) {
	Object.keys(object).forEach(function (prop) {
		appendTo[prop] = object[prop];
	});
	return appendTo;
}

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
HTMLElement.prototype.$ = function (query) {
	return this.querySelector(query);
};
NodeList.prototype.array = function () {
	return [].slice.call(this);
};
