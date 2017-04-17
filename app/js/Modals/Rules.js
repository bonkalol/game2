class RulesModal extends Modal {
	constructor() {
		super('data-rules-modal');
	}
	start() {
		if (App.isUpdated) {
			App.manager.Modals.hide();
			App.manager.Game.start();
		} else {
			App.manager.Preloader.show();
		}
	}
}
