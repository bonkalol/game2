class Sidebar {
	constructor() {
		this.attr = {
			self: 'data-sidebar',
			button: 'data-open-sidebar'
		};
		this.enum = Object.freeze({
			closed: 'closed',
			opened: 'opened'
		});
		this.state = this.enum.closed;
	}
	check() {
		if (this.state === this.enum.closed) {
			this.state = this.enum.opened;
		} else {
			this.state = this.enum.closed;
		}
	}
	open() {

	}
	close() {

	}
}