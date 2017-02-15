class Render {

	constructor() {
		this.views = {
			modals:      $('[data-modals-view]'),
			gamePlayers: $('[data-game-players]'),
			main: null
		};
		this.templates = {
			players:     	$('#modal_players'),
			rubrics:     	$('#modal_rubrics'),
			rubrics_footer: $('#modal_rubrics_footer'),
			settings:    	$('#modal_settings'),
			rules:       	$('#modal_rules'),
			continue:    	$('#modal_continue'),
			card:        	$('#modal_card'),
			gamePlayers: 	$('#game_players'),
			game:			$('#game')
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
		let players = this.render(this.templates.players, App.data);
		return players;
	}

	modalRubrics() {
		let rubrics = this.render(this.templates.rubrics, App.data);
		return rubrics;
	}

	modalSettings() {
		let settings = this.render(this.templates.settings, App.data);
		return settings;
	}

	modalRules() {
		let rules = this.render(this.templates.rules, App.data);
		return rules;
	}

	modalContinue() {
		let gameContinue = this.render(this.templates.continue, App.manager.Storage.get('Game'));
		return gameContinue;
	}

	rubrics_footer() {
		let rubrics_footer = this.render(this.templates.rubrics_footer, App.data);
		return rubrics_footer;
	}

	GamePlayers() {
		let gamePlayers = this.render(this.templates.gamePlayers, App.data);
		return gamePlayers;
	}

	game() {
		return this.render(this.templates.game, App.data);
	}

	/*
		Screens
	*/
	_screen0() {
		this.views.modals.innerHTML = this.modalContinue();
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
		this.views.modals.innerHTML = rendered;
	}

}
