
(function () {
	window.addEventListener('load', (event) => {
		Game.check();
		Game.Content.check();
		Game.Render.views.gamePlayers.innerHTML = Game.Render.renderGamePlayers();
	}, false);
})();