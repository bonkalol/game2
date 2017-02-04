class Modal {
	constructor(self) {
		_.required([
			self
		]);
		this.attr = {
			self: self,
			action: 'data-modal-action'
		};
		this.baseClasses = ['js-disabled', 'js-finished', 'js-close'];
		this.buttons = this.__buttons();
		if (this.__events) this.__events();
	}
	check() {
		/*
			@Custom for every popup
			@Defined in popups
		*/
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
		this.attr = {
			action: 'data-modal-action',
			self: 'data-modals-view'
		};
		this.nodes = {
			self: $(`[${this.attr.self}]`)
		};
		this.classes = {
			hidden: 'js-hidden'
		}
		this.__events();
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
	__events() {
		document.addEventListener('mousedown', (event) => {
			let closest = event.target.closest(`[${this.attr.action}]`);
			if (closest) {
				let parsed = this.parseAction(closest.getAttribute(this.attr.action));
				this.dispatcher(parsed[0], parsed[1], event);
			}
		});
	}
}