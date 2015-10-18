
(function () {

	var Game = function () {
		this.props = {
			started: null,
			players: [],
			content: [],
			truth: [],
			action: [],
			json: {}
		};
		this.settings = {
			rubribcs: [],
			repeatContent: false
		};
	};

	Game.prototype.check = function() {
		if (localStorage.get('Game') !== false) {
			// Show screen 0.
		} else {
			// Show screen 1.
		}
	};

	Game.prototype.init = function() {
		// Start game cycle.
	};

	Game.prototype.load = function() {
		// Load game.
	};

	Game.prototype.save = function() {
		// Save game state.
		Storage.set('Game', Game);
	};

	window.Game = new Game();

})();