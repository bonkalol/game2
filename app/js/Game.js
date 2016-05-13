class Game {

	constructor() {
		this.started = true;
		this.props = {
			rubribcs: []
		};
		this.settings = {
			repeatContent: false,
			alcohol: true,
			score: true,
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
		this.attr = {
			game: 'data-game',
			getTruth: 'data-game="truth"',
			getAction: 'data-game="action"',
			currentPlayer: 'data-currentplayer'
		};
		this.nodes = {
			currentPlayer: document.querySelector(`[${this.attr.currentPlayer}]`)
		};
		this.PlayerController = new PlayerController();
		this.Render = new Render();
		this.Storage = new Storage();
		this.Content = new Content();
		this.Sidebar = new Sidebar();
	}

	check() {
		if (this.Storage.get('Game') !== false) {
			this.load();
			// Show screen 0.
			this.Render._screen0();
		} else {
			// Show screen 1.
			this.Render._screen1();
		}
	}

	init() {
		// Start game cycle.
	}

	load() {
		let game = this.Storage.get('Game');
		this.started = game.started;
		this.props = game.props;
		this.settings = game.settings;
		this.PlayerController.players = game.PlayerController.players;
	}

	save() {
		this.Storage.set('Game', this);
	}

	getTruth() {

	}

	getAction() {

	}

}

