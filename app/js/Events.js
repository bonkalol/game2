(function mouseDown() {
	let queue = (node, e) => {
		if (node.closest(`[${Game.attr.getTruth}]`)) Game.getTruth();
		if (node.closest(`[${Game.attr.getAction}]`)) Game.getAction();
		if (node.closest(`[${Game.Sidebar.attr.button}]`)) Game.Sidebar.check();
	};
	document.addEventListener('mousedown', (e) => {
		queue(e.target, e);
	}, false);
})();