(function mouseDown() {
	let queue = (node, e) => {
		if (node.closest(`[${App.attr.getTruth}]`)) App.getTruth();
		if (node.closest(`[${App.attr.getAction}]`)) App.getAction();
		if (node.closest(`[${App.manager.Sidebar.attr.button}]`)) App.manager.Sidebar.check();
	};
	document.addEventListener('mousedown', (e) => {
		queue(e.target, e);
	}, false);
	// Rewrite to events() in classes
})();