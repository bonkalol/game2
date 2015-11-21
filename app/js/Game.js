class Game {

	constructor() {
		this.started = true;
		this.props = {
			players: [
				{name: 'Mihail', gender: 'm', score: 0},
				{name: 'Elena', gender: 'f', score: 1},
				{name: 'Timur', gender: 'm', score: -1}
			],
			rubribcs: [],
			currentPlayer: {} // current player should be picked form this var
		};
		this.settings = {
			repeatContent: false,
			alcohol: true,
			scoreboard: true,
			streak: 2,
			sex: 'hetero', // possible 'hetero', 'homo', 'herma'
			smartPick: true,
			randomPlayers: true,
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

