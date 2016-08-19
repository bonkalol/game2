
(function () {
	window.addEventListener('load', (event) => {
		window.Game = new Game();
		Game.check();
		Game.Content.check();
		Game.Render.views.gamePlayers.innerHTML = Game.Render.renderGamePlayers();
	}, false);
})();