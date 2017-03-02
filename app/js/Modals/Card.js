class CardModal {
	constructor() {
		this.attr = {

		};
		this.__events();
	}
	setType() {

	}
	__events() {

	}
}

class Card {
	constructor(options = {}) {
		this.default = {
			last: false
		};
		this.options = Object.assign(this.default, this.options);
	}
}
