class VersionController {
	check() {
		let version = App.manager.Storage.get('JV' , 'str');
		if (version === false) {
			this.load();
			return;
		}
		if (App.onLine === true && JV === version) {
			// Don't update
			this.storage();
		} else if (App.onLine === true && JV !== version) {
			this.load();
		}
	}
	load() {
		let request = new XMLHttpRequest();
		request.open('GET', 'data/response.json', true);
		request.send();
		request.onreadystatechange = () => {
			if (request.readyState !== 4) return;
			if (request.status === 200) {
				App.isUpdated = true;
				App.manager.Storage.set('JV', JV);
				App.manager.Storage.set('content', request.responseText);
				App.manager.Content.set(JSON.parse(request.responseText));
				App.manager.Preloader.hide();
			}
		};
	}
	storage() {
		App.isUpdated = true;
		let content = App.manager.Storage.get('content');
		if (content) {
			App.manager.Content.set(content);
		} else {
			this.load();
		}
	}
}