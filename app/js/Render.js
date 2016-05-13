class Render {

	constructor() {
		this.views = {
			modals:      document.querySelector('[data-modals-view]'),
			gamePlayers: document.querySelector('[data-game-players]'),
			main: null
		};
		this.templates = {
			players:     document.querySelector('#modal_players'),
			rubrics:     document.querySelector('#modal_rubrics'),
			settings:    document.querySelector('#modal_settings'),
			rules:       document.querySelector('#modal_rules'),
			continue:    document.querySelector('#modal_continue'),
			gamePlayers: document.querySelector('#game_players')
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
		let players = this.render(this.templates.players, Game);
		return players;
	}

	renderRubrics() {
		let rubrics = this.render(this.templates.rubrics, Game);
		return rubrics;
	}

	renderSettings() {
		let settings = this.render(this.templates.settings, Game);
		return settings;
	}

	renderRules() {
		let rules = this.render(this.templates.rules, Game);
		return rules;
	}

	renderContinue() {
		let gameContinue = this.render(this.templates.continue, Game.Storage.get('Game'));
		return gameContinue;
	}

	renderGamePlayers() {
		let gamePlayers = this.render(this.templates.gamePlayers, Game);
		return gamePlayers;
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
		// this.views.modals.innerHTML = rendered;
	}

}