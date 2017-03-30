class Card {
	constructor(options = {}) {
		this.default = {
			last: false,
			self: null, /* required */
			template: null /* required */

		};
		this.options = Object.assign(this.default, this.options);
		this.view = null;
		this.build();
	}
	build() {
		this.view = doT.template(template)(Object.assign(App.data, {isLast: this.options.last}));
	}
	getView() {
		return this.view;
	}
}
