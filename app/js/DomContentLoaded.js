
(function () {
	document.addEventListener('DOMContentLoaded', () => {
		// Build classes
		window.render      = new Render();
		window.eventRouter = new EventRouter();
		window.storage     = new Storage();
		window.game        = new Game();
	}, false);
})();