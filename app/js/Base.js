
(function () {
	window.addEventListener('load', (event) => {
			window.App = new App();
			App.check();
			App.manager.Render.views.gamePlayers.innerHTML = App.manager.Render.GamePlayers();
			App.manager.Preloader.hide();
	}, false);
})();