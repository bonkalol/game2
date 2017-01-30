class PlayerModal extends Modal {
	constructor() {
		super('data-player-modal');
		this.selfAttributes = {
			input: 'data-player-input',
			button: 'data-player-create'
		};
		this.attr = Object.assign(this.attr, this.selfAttributes);
		this.players = 'data-playerlist-player';
		this.classes = ['disabled'];
	}
	add(event) {
		event.preventDefault();
		let name = $(`[${this.attr.input}]`).value,
			gender = this.getGender().value,
			player = null;
		if (App.manager.PlayerController.exist(name)) {
			App.manager.Alert.show('error', Language[App.language].players.exist);
			return false;
		}
		App.manager.PlayerController.create(name, gender);
		this.render();
	}
	render() {
		$(`[${this.attr.self}]`).outerHTML = App.manager.Render.modalPlayers();
	}
	eventCondition(node) {
		return node.hasAttribute('data-player-input') &&
			node.value.length > 0 &&
			this.getGender();
	}
	checkButton(event) {
			let input = $(`[${this.attr.input}]`);
			if (this.eventCondition(input))
				$(`[${this.attr.button}]`).classList.remove(this.classes[0]);
			else
				$(`[${this.attr.button}]`).classList.add(this.classes[0]);
	}
	getGender() {
		return $('[name="players_gender"]:checked');
	}
	__events() {
		['keyup', 'mousedown', 'change'].forEach((e) => {
			document.addEventListener(e, (event) => {
				this.checkButton();
			});
		});
	}
}
