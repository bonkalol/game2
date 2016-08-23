class VersionController {
	constructor() {

	}
	check() {
		let version = Game.manager.Storage.get('JV', 'str');
		if (version === false) {
			this.load();
			return;
		}
		if (Game.onLine === true && JV === version) {
			// Don't update
			Game.isUpdated = true;
		} else if (Game.onLine === true && JV !== version) {
			this.load();
		}
	}
	load() {
		
	}
}