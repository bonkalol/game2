/*
	game.settings.gender
	0 - Игрок мужского пола может попасть только на игрока женского пола
	1 - Игрок мужского пола может попасть на игрока женского и мужского пола
*/

class Game {

	constructor() {
		this.props = {
			started: null,
			players: [],
			rubribcs: []
		};
		this.settings = {
			repeatContent: false,
			gender: 0,
			streak: 2
		};
	}

	check() {
		if (storage.get('Game') !== false) {
			// Show screen 0.
			render.renderContinue();
		} else {
			// Show screen 1.
			render.renderStart();
		}
	}

	init() {
		// Start game cycle.
	}

	load() {
		// Load game.
	}

	save() {
		storage.set('Game.props', this.props);
		storage.set('Game.settings', this.settings);
	}

}

window.game = new Game();

