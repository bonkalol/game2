class Game {

	constructor() {
		this.started = false;
		this.props = {
			players: [{name: 'Mihail', gender: 'm'}, {name: 'Elena', gender: 'f'}],
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
		let game = storage.get('Game');
		this.started = game.started;
		this.props = game.props;
		this.settings = game.settings;
	}

	save() {
		storage.set('Game', this);
	}

}

window.game = new Game();

