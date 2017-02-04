class RulesModal extends Modal {
	constructor() {
		super('data-rules-modal');
	}
	start() {
		App.manager.Modals.hide();
		App.manager.Game.start();
	}
}