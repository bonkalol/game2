
(function () {
	window.addEventListener('load', (event) => {
			window.App = new App();
			App.manager.Game = new Game();
			App.manager.Preloader.hide();
	}, false);
})();
