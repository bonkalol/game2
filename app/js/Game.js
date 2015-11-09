class Game {

	constructor() {
		this.props = {
			started: false,
			players: [],
			rubribcs: []
		};
		this.settings = {
			repeatContent: false,
			heterosexuality: true,
			alcohol: false,
			scoreboard: true,
			streak: 2,
			cards: {
				gray: true,
				yellow: true,
				special: true
			}
		};
	}

	check() {
		if (storage.get('Game') !== false) {
			// Show screen 0.
			render._screen0();
		} else {
			// Show screen 1.
			render._screen1();
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

