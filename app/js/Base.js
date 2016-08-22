
(function () {
	window.addEventListener('load', (event) => {
		window.Game = new Game();
		Game.check();
		Game.manager.Content.check();
		Game.manager.Render.views.gamePlayers.innerHTML = Game.manager.Render.GamePlayers();
	}, false);
})();