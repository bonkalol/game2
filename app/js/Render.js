class Render {

	constructor() {
		this.views = {
			modals: document.querySelector('[data-modals-view]'),
			main: null
		};
		this.templates = {
			players:  document.querySelector('#modal_players'),
			rubrics:  document.querySelector('#modal_rubrics'),
			settings: document.querySelector('#modal_settings'),
			rules:    document.querySelector('#modal_rules'),
			continue: document.querySelector('#modal_continue')
		};
	}

	render(template, object) {
		let view = template.innerHTML;
			view = doT.template(view);
			view = view(object);
		return view;
	}

	/*
		Parts
	*/
	renderPlayers() {
		let players = this.render(this.templates.players, game);
		return players;
	}

	renderRubrics() {
		let rubrics = this.render(this.templates.rubrics, game);
		return rubrics;
	}

	renderSettings() {
		let settings = this.render(this.templates.settings, game);
		return settings;
	}

	renderRules() {
		let rules = this.render(this.templates.rules, game);
		return rules;
	}

	renderContinue() {
		let gameContinue = this.render(this.templates.continue, storage.get('Game'));
		return gameContinue;
	}

	/*
		Screens
	*/
	_screen0() {
		let view = this.renderContinue();
		this.views.modals.innerHTML = view;
	}

	_screen1() {
		let rendered = '',
			views = [
				this.renderPlayers(),
				this.renderRubrics(),
				this.renderSettings(),
				this.renderRules()
			];
		views.forEach((view) => {
			rendered += view;
		});
		this.views.modals.innerHTML = rendered;
	}

}

window.render = new Render();