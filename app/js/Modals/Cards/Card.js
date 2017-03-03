class Card {
	constructor(options = {}) {
		this.default = {
			last: false,
			self: null
		};
		this.options = Object.assign(this.default, this.options);
	}
}
