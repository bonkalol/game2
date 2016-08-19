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
		this.self = document.querySelector(`[${this.attr.self}]`);
		this.state = this.enum.closed;
	}

	check() {
		if (this.state === this.enum.closed) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		this.state = this.enum.opened;
		Game.manager.Overlay.show(null, this.close.bind(this));
		this.self.classList.add(this.enum.opened);
	}

	close() {
		this.state = this.enum.closed;
		this.self.classList.remove(this.enum.opened);
	}
}