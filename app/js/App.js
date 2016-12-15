class App {
	constructor() {
		this.data = this.getInitialState();
		this.attr = {
			game: 'data-game',
			getTruth: 'data-game="truth"',
			getAction: 'data-game="action"',
			currentPlayer: 'data-currentplayer'
		};
		this.nodes = {
			currentPlayer: document.querySelector(`[${this.attr.currentPlayer}]`),
			getTruth: document.querySelector(`[${this.attr.getTruth}]`),
			getAction: document.querySelector(`[${this.attr.getAction}]`),
			game: document.querySelector(`[${this.game}]`)
		};
		this.manager = {
			PlayerController: new PlayerController(),
			VersionController: new VersionController(),
			Preloader: new Preloader(),
			Storage: new Storage(),
			Content: new Content(),
			Overlay: new Overlay(),
			Sidebar: new Sidebar(),
			Render: new Render(),
			Alert: new Alert(),
			Modals: new Modals()
		};
		this.online = navigator.onLine;
		this.isUpdated = false; // Define is latest version of JSON loaded
		this.language = 'en';
	}

	getInitialState() {
		return {
			started: false,
			rubrics: [],
			players: [],
			settings: {
				repeatContent: false,
				alcohol: true,
				score: true,
				streak: 2,
				sex: 'hetero', // Possible 'hetero', 'homo', 'herma'
				smartPick: true,
				randomPlayers: true,
				cards: {
					gray: true,
					yellow: true,
					special: true
				}
			}
		};
	}
}