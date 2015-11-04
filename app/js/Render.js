class Render {

	constructor() {
		this.views = {
			modals: document.querySelector('[data-modals-view]'),
			main: null
		};
		this.templates = {
			players: document.querySelector('#modal_players')
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
		let rendered = '',
			players = this.render(this.templates.players, game.props);

		return players;
	}

	renderContinue() {

	}

	/*
		Screens
	*/
	_screen0() {
		let rendered = '';
			view = this.renderContinue();
		this.views.modals.innerHTML = view;
	}

	_screen1() {
		let rendered = '';
			views = [this.renderPlayers()];
		views.forEach((view) => {
			rendered += view;
		});
		this.views.modals.innerHTML = rendered;
	}

}

window.render = new Render();