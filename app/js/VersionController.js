class VersionController {
	check() {
		this.version = App.manager.Storage.get('JV', String);
		if (this.version === false) {
			this.load();
			return;
		}
		if (App.online === true && JV === this.version) {
			// Don't update
			this.storage();
		} else if (App.online === true && JV !== this.version) {
			this.load();
		}
	}
	load(requestFailed = false) {
		let request = new XMLHttpRequest();
		App.isLoading = true;
		request.open('GET', 'data/response.json', true);
		request.send();
		request.onreadystatechange = () => {
			if (request.readyState !== 4) return;
			if (request.status === 200) {
				App.isUpdated = true;
				App.manager.Storage.set('JV', JV);
				App.manager.Storage.set('content', request.responseText);
				App.manager.Content.set(JSON.parse(request.responseText));
				if (App.manager.Preloader.getState() === App.manager.Preloader.STATES.PRELOADING) {
					App.manager.Preloader.hide();
					App.manager.Modals.hide();
					App.manager.Game.start();
				}
				// App.manager.Preloader.hide(); // Rework this on background loading
			} else if (this.version !== false && requestFailed === false) {
				this.storage(true);
			} else if (this.version === false && requestFailed === false) {
				App.manager.Alert.show('error', Language[App.language].badinternet, true);
			}
		};
	}
	storage(requestFailed = false) {
		let content = App.manager.Storage.get('content');
		if (content) {
			App.isUpdated = true;
			App.manager.Content.set(content);
			App.manager.Preloader.hide();
		} else {
			this.load(requestFailed);
		}
	}
}
