class Render {

	constructor() {
		this.views = {
			modals: document.querySelector('[data-modals-view]'),
			main: null
		};
		this.templates = {
			players: document.querySelector('#modal_players'),
			rubrics: document.querySelector('#modal_rubrics'),
			settings: document.querySelector('#modal_settings')
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

	renderContinue() {

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
				this.renderSettings()
			];
		views.forEach((view) => {
			rendered += view;
		});
		this.views.modals.innerHTML = rendered;
	}

}

window.render = new Render();