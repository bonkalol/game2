class Game {
	constructor() {
		this.check();
		this.attr = {
			self: 'data-game-view',
			container: 'data-game-container',
			stats: 'data-game-stats'
		};
		this.nodes = {
			self: $(`[${this.attr.self}]`),
			container: $(`[${this.attr.container}]`),
			stats: $(`[${this.attr.stats}]`)
		};
		this.classes = {
			hidden: 'js-hidden'
		};
	}
	check() {
		if (App.manager.Storage.get('Game') !== false) {
			// Show screen 0.
			this.load();
			App.manager.Render._screen0();
			App.manager.Preloader.hide();
		} else {
			// Show screen 1.
			App.manager.Render._screen1();
			App.manager.VersionController.check();
		}
	}
	start() {
		// Start game cycle.
		this.nodes.self.classList.remove(this.classes.hidden);
		this.init();
		this.render();
	}
	restart() {

	}
	continue() {

	}
	render() {
		this.nodes.stats.innerHTML = App.manager.Render.stats();
		this.nodes.container.innerHTML = App.manager.Render.game();
	}
	load() {
		let game = this.manager.Storage.get('Game');
		this.data = game;
	}
	save() {
		this.manager.Storage.set('Game', this.data);
	}
	init() {
		const settings = App.data.settings;

		App.manager.Content.init();
		if (settings.randomPlayers) {
			App.data.currentPlayer = App.manager.PlayerController.getRandom();
		} else {
			App.data.currentPlayer = App.manager.PlayerController.get(0);
		}
	}
}
