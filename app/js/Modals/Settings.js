class SettingsModal extends Modal {
	constructor() {
		super('data-settings-modal');
		this.selfAttributes = {
			binded: 'data-bind',
			type: 'type'
		};
		this.INPUT_TYPES = Object.freeze({
			CHECKBOX: 'checkbox'
		});
		this.attr = Object.assign(this.attr, this.selfAttributes);
		this.__events();
	}
	handleBind(binded) {
		let parsed = this.parse(binded.getAttribute(this.attr.binded)),
			value = null;
		try {
			value = JSON.parse(binded.value);
		} catch(e) {
			value = binded.value;
		}
		if (Array.isArray(parsed)) {
			App.data.settings[parsed[0]][parsed[1]] = value;
		} else {
			App.data.settings[parsed] = value;
		}
	}
	parse(attr) {
		let splited = attr.split('-');
		return splited.length === 1 ? splited[0] : splited;
	}
	setSettings() {
		let binded = $$(`
			[${this.attr.binded}]:checked,
			[${this.attr.binded}][${this.attr.type}="${this.INPUT_TYPES.CHECKBOX}"]
		`).array();
		binded.forEach(bind => {
			this.handleBind(bind);
		});
	}
	setValue(node) {
		node.value = node.checked;
	}
	render() {
		this.getView().outerHTML = App.manager.Render.modalSettings();
	}
	__events() {
		document.addEventListener('change', (event) => {
			let target = event.target;
			if (target.hasAttribute(this.attr.binded)) {
				if (target.getAttribute(this.attr.type) === this.INPUT_TYPES.CHECKBOX) this.setValue(target);
				this.setSettings();
			}
		}, false);
	}
}
