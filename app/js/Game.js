class Game {
	constructor() {
		this.check();
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
	}
	restart() {

	}
	continue() {
		
	}
	load() {
		let game = this.manager.Storage.get('Game');
		this.data = game;
	}
	save() {
		this.manager.Storage.set('Game', this.data);
	}
}