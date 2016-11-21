class Modals {
	constructor() {
		this.players = new PlayerModal();
		this.rubrics = new RubricsModal();
		this.settings = new SettingsModal();
		this.rules = new RulesModal();
		this.continue = new ContinueModal();
		this.language = new LanguageModal();
		this.enum = Object.freeze({
			players: 0,
			rubrics: 1,
			settings: 2,
			rules: 3,
			continue: 4,
		});
		this.current = null;
	}
	next() {

	}
	check() {

	}
	close() {

	}
}