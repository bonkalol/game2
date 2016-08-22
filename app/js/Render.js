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
	modalPlayers() {
		let players = this.render(this.templates.players, Game.data);
		return players;
	}

	modalRubrics() {
		let rubrics = this.render(this.templates.rubrics, Game.data);
		return rubrics;
	}

	modalSettings() {
		let settings = this.render(this.templates.settings, Game.data);
		return settings;
	}

	modalRules() {
		let rules = this.render(this.templates.rules, Game.data);
		return rules;
	}

	modalContinue() {
		let gameContinue = this.render(this.templates.continue, Game.manager.Storage.get('Game'));
		return gameContinue;
	}

	GamePlayers() {
		let gamePlayers = this.render(this.templates.gamePlayers, Game.data);
		return gamePlayers;
	}

	/*
		Screens
	*/
	_screen0() {
		let view = this.modalContinue();
		this.views.modals.innerHTML = view;
	}

	_screen1() {
		let rendered = '',
			views = [
				this.modalPlayers(),
				this.modalRubrics(),
				this.modalSettings(),
				this.modalRules()
			];
		views.forEach((view) => {
			rendered += view;
		});
		// this.views.modals.innerHTML = rendered;
	}

}