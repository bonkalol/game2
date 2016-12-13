class PlayerModal extends Modal {
	constructor() {
		super('data-player-modal');
		this.attr.input = 'data-player-input';
		this.attr.button = 'data-player-create';
		this.players = 'data-playerlist-player';
		this.classes = ['disabled'];
	}
	save() {
		
	}
	add() {
		let name = $(`[${this.attr.input}]`).value,
			gender = getGender().value,
			created = App.manager.PlayerController.create(name, gender);
		if (created) this.render();
	}
	render() {
		// this
		/*
			Закончил здесь
		*/
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