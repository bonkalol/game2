class Modal {
	constructor(self) {
		required([
			self
		]);
		this.attr = {
			self: self,
			action: 'data-modal-action'
		};
		this.enum = Object.freeze({
			DURING: 0,
			FINISHED: 1
		});
		this.classes = ['js-disabled', 'js-finished', 'js-close'];
		this.status = this.enum.DURING;
		this.buttons = this.__buttons();
	}
	check() {
		return this.status === this.enum.FINISHED;
	}
	getView() {
		return $(`[${this.attr.self}]`);
	}
	next() {
		this.getView().classList.add(this.classes[1]);
	}
	prev() {
		this.getView().classList.remove(this.classes[1]);
	}
	close() {
		this.getView().classList.add(this.classes[2]);
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
		};
		this.__events();
	}
	check() {
		if (this.currnet.check()) this.current.buttons.enable();
		else this.current.buttons.disable();
	}
	paserAction(attr) {
		let parsed = attr.split(':');
		return parsed;
	}
	dispatcher(name, action) {
		this[name][action]();
	}
	__events() {
		Listener('mousedown', (event) => {
			let closest = node.closest(`[${this.attr.action}]`);
			if (closest) {
				let parsed = this.parseAction(closest.getAttribute(this.attr.action));
				this.dispatcher(parsed[0], parsed[1]);
			}
		});
	}
}