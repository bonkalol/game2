class App {
	constructor() {
		this.data = {
			started: false,
			rubribcs: [],
			players: [
					],
			settings: {
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
		this.manager = {
			PlayerController: new PlayerController(),
			Render: new Render(),
			Storage: new Storage(),
			Content: new Content(),
			Overlay: new Overlay(),
			Sidebar: new Sidebar(),
			VersionController: new VersionController(),
			Preloader: new Preloader()
		};
		this.online = navigator.onLine;
		/*
			Define is latest version of JSON loaded
		*/
		this.isUpdated = false;
	}

	check() {
		if (this.manager.Storage.get('Game') !== false) {
			// Show screen 0.
			this.load();
			this.manager.Render._screen0();
		} else {
			// Show screen 1.
			this.manager.Render._screen1();
			this.manager.VersionController.check();
		}
	}

	init() {
		// Start game cycle.
	}

	load() {
		let game = this.manager.Storage.get('Game');
		this.data = game;
	}

	save() {
		this.manager.Storage.set('Game', this.data);
	}

	getTruth() {

	}

	getAction() {

	}

}

