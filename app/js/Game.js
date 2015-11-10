class Game {

	constructor() {
		this.started = false;
		this.props = {
			players: [],
			rubribcs: []
		};
		this.settings = {
			repeatContent: false,
			alcohol: true,
			scoreboard: true,
			streak: 2,
			sex: 'hetero', // possible 'hetero', 'homo', 'herma'
			smartPick: true,
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
		storage.set('Game', this);
	}

}

window.game = new Game();

