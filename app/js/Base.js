
(function () {

	window.addEventListener('load', function (event) {
		game.check();
		content.check();
		render.views.gamePlayers.innerHTML = render.renderGamePlayers();
	}, false);

	document.addEventListener('mousedown', function (event) {
		// eventRouter(event.target);
	});

})();