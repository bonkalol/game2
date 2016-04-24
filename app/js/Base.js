
(function () {

	window.addEventListener('load', (event) => {
		game.check();
		content.check();
		render.views.gamePlayers.innerHTML = render.renderGamePlayers();
	}, false);

	document.addEventListener('mousedown', (event) => {
		// eventRouter(event.target);
	});

})();