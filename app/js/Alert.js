class Alert {
	constructor() {
		this.attr = {
			self: 'data-alert',
			content: 'data-alert-content'
		};
		this.nodes = {
			self: document.querySelector(`[${this.attr.self}]`),
			content: document.querySelector(`[${this.attr.content}]`)
		};
		this.setTimeout = null;
		this.type = null;
		this.transition = 400;
		this.classes = ['js-visible'];
		this.events();
	}
	show(type, message,  constant = false, time = 3e3) {
		this.type = type;
		this.nodes.content.innerHTML = message;
		this.nodes.self.classList.add(this.type);
		this.nodes.self.classList.add(this.classes[0]);
		if (!constant) setTimeout(() => this.close(), time);
	}
	close() {
		new PromisedTimeOut(() => this.nodes.self.classList.remove(this.classes[0]), this.transition)
			.then(() => this.nodes.self.classList.remove(this.type));
	}
	events() {
		this.nodes.self.addEventListener('click', () => {
			this.close();
		});
	}
}