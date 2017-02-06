class Modal {
	constructor(self) {
		_.required([
			self
		]);
		this.attr = {
			self: self,
			action: 'data-modal-action',
			status: 'data-modal-status'
		};
		this.baseClasses = ['js-disabled', 'js-finished', 'js-close'];
		this.buttons = this.__buttons();
		if (this.__events) this.__events();
	}
	getStatus() {
		return JSON.parse(this.getView().getAttribute(this.attr.status));
	}
	getView() {
		return $(`[${this.attr.self}]`);
	}
	next() {
		if (typeof this.beforeNext === 'function') this.beforeNext();
		this.getView().classList.add(this.baseClasses[1]);
	}
	prev() {
		this.getView().previousSibling.classList.remove(this.baseClasses[1]);
	}
	close() {
		this.getView().classList.add(this.baseClasses[2]);
	}
	save() {
		/*
			@Custom for every popup
			@Defined in popups
		*/
	}
	__buttons() {
		return {
			enable: () => {
				this.getView().$(`[${this.attr.action}]`)[0].classList.remove(this.classes[0]);
			},
			disable: () => {
				this.getView().$(`[${this.attr.action}]`)[0].classList.add(this.classes[0]);
			}
		};
	}
}

class Modals {
	constructor() {
		this.language = new LanguageModal();
		this.players = new PlayerModal();
		this.rubrics = new RubricsModal();
		this.settings = new SettingsModal();
		this.rules = new RulesModal();
		this.continue = new ContinueModal();
		this.card = new CardModal();

		this.TOUCH_TYPES = ['touchstart', 'touchmove', 'touchend'];
		this.attr = {
			action: 'data-modal-action',
			self: 'data-modals-view',
			modals: 'data-modals-modal'
		};
		this.nodes = {
			self: $(`[${this.attr.self}]`)
		};
		this.classes = {
			hidden: 'js-hidden',
			transition: 'transition',
			finished: 'js-finished'
		};
		this.delta = {
			start: null,
			end: null,
			counter: 0
		};
		this.__events();
	}
	getCurrent() {
		return $(`[${this.attr.modals}]:not(.js-finished)`);
	}
	parseAction(attr) {
		let parsed = attr.split(':');
		return parsed;
	}
	dispatcher(name, action, event) {
		this[name][action](event);
	}
	hide() {
		this.nodes.self.classList.add(this.classes.hidden);
	}
	show() {
		this.nodes.self.classList.remove(this.classes.hidden);
	}
	handleTouch(event) {
		let current = this.getCurrent(),
			name = current.getAttribute(this.attr.modals);
		if (!current.nextSibling || !this[name].getStatus()) return;
		current.classList.remove(this.classes.transition);
		if (event.type === this.TOUCH_TYPES[0]) {
			this.delta.start = event.touches[0].clientX;
			this.nodes.self.classList.remove(this.classes.transition);
		}
		if (event.type === this.TOUCH_TYPES[1]) {
			if (this.delta.start - event.touches[0].clientX < 10) return;
			this.delta.counter = this.delta.start - event.touches[0].clientX;
			if (this.delta.counter > 0) {
				current.style.transform = `translate(calc(-50% - ${this.delta.counter}px), -50%)`;
			}
		}
		if (event.type === this.TOUCH_TYPES[2]) {
			this.delta.counter > 100 ? this.next(current) : this.back(current);
			this.delta.counter = 0;
		}
	}
	next(current) {
			current.classList.add(this.classes.transition);
			current.classList.add(this.classes.finished);
			this.reset(current);
	}
	back(current) {
		current.classList.add(this.classes.transition);
		current.style.transform = null;
	}
	reset(current) {
		current.style.transform = null;
	}
	__events() {
		document.addEventListener('mousedown', (event) => {
			let closest = event.target.closest(`[${this.attr.action}]`);
			if (closest) {
				let parsed = this.parseAction(closest.getAttribute(this.attr.action));
				this.dispatcher(parsed[0], parsed[1], event);
			}
		});
		this.TOUCH_TYPES.forEach((touch) => {
			this.nodes.self.addEventListener(touch, (event) => {
				this.handleTouch(event);
			});
		}, false);
	}
}
